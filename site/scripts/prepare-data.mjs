// Converts the repo's CSV data into the trimmed JSON the site imports.
// Run from site/: `npm run prepare-data`
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const dataDir = join(here, '..', '..', 'data')
const outDir = join(here, '..', 'src', 'data')
mkdirSync(outDir, { recursive: true })

function parseCsv(text) {
  const rows = []
  let row = []
  let field = ''
  let inQuotes = false
  const src = text.replace(/^﻿/, '')
  for (let i = 0; i < src.length; i++) {
    const ch = src[i]
    if (inQuotes) {
      if (ch === '"') {
        if (src[i + 1] === '"') {
          field += '"'
          i++
        } else {
          inQuotes = false
        }
      } else {
        field += ch
      }
    } else if (ch === '"') {
      inQuotes = true
    } else if (ch === ',') {
      row.push(field)
      field = ''
    } else if (ch === '\n' || ch === '\r') {
      if (ch === '\r' && src[i + 1] === '\n') i++
      row.push(field)
      field = ''
      if (row.length > 1 || row[0] !== '') rows.push(row)
      row = []
    } else {
      field += ch
    }
  }
  if (field !== '' || row.length) {
    row.push(field)
    rows.push(row)
  }
  const [header, ...body] = rows
  return body.map((r) => Object.fromEntries(header.map((h, i) => [h, r[i] ?? ''])))
}

const num = (v) => {
  const n = parseFloat(v)
  return Number.isFinite(n) ? n : null
}

const enriched = parseCsv(readFileSync(join(dataDir, 'df_final_clean_enriched.csv'), 'utf8'))
const items = enriched
  .map((r) => ({
    fdcId: r.fdcId,
    name: r.description,
    foodItem: r.foodItem,
    kgCO2e: num(r.kgCO2e),
    source: r.sourceCO2e,
    packageWeight: r.packageWeight,
    packageGrams: num(r.packageGrams),
    co2PerPackage: num(r.CO2eqPerPackage),
    brandOwner: r.brandOwner,
    brandName: r.brandName,
    servingSize: num(r.servingSize),
    servingSizeUnit: r.servingSizeUnit,
    category: r.brandedFoodCategory,
  }))
  .filter((r) => r.kgCO2e !== null)
  .sort((a, b) => a.foodItem.localeCompare(b.foodItem))
writeFileSync(join(outDir, 'items.json'), JSON.stringify(items, null, 2))

const poore = parseCsv(readFileSync(join(dataDir, 'ghg-per-kg-poore.csv'), 'utf8'))
  .map((r) => ({
    entity: r.Entity,
    kgCO2ePerKg: num(r['GHG emissions per kilogram (Poore & Nemecek, 2018)']),
  }))
  .filter((r) => r.kgCO2ePerKg !== null)
  .sort((a, b) => b.kgCO2ePerKg - a.kgCO2ePerKg)
writeFileSync(join(outDir, 'poore.json'), JSON.stringify(poore, null, 2))

const stageCols = {
  landUse: 'food_emissions_land_use',
  farm: 'food_emissions_farm',
  animalFeed: 'food_emissions_animal_feed',
  processing: 'food_emissions_processing',
  transport: 'food_emissions_transport',
  retail: 'food_emissions_retail',
  packaging: 'food_emissions_packaging',
  losses: 'food_emissions_losses',
}
const supply = parseCsv(readFileSync(join(dataDir, 'food-emissions-supply-chain.csv'), 'utf8'))
  .map((r) => {
    const stages = Object.fromEntries(
      Object.entries(stageCols).map(([k, col]) => [k, num(r[col]) ?? 0]),
    )
    return {
      entity: r.Entity,
      stages,
      total: Object.values(stages).reduce((a, b) => a + b, 0),
    }
  })
  .sort((a, b) => b.total - a.total)
writeFileSync(join(outDir, 'supplychain.json'), JSON.stringify(supply, null, 2))

console.log(`items: ${items.length}, poore: ${poore.length}, supply chain: ${supply.length}`)
