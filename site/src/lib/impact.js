// Shared helpers for classifying and formatting CO2e figures.

// Yearly per-person CO2e budget compatible with 1.5-2°C pathways is commonly
// cited around 2 t; used as a relatable denominator, not a hard target.
export const YEARLY_BUDGET_KG = 2000

// Rough equivalences for making kg CO2e tangible
export const KG_PER_MILE_DRIVEN = 0.4 // average US gasoline car, EPA
export const KG_PER_TREE_YEAR = 21 // one mature tree's yearly absorption

export function impactLevel(kgPerKg) {
  if (kgPerKg >= 20) return 'high'
  if (kgPerKg >= 5) return 'medium'
  return 'low'
}

export const IMPACT_LABEL = {
  low: 'Low impact',
  medium: 'Medium impact',
  high: 'High impact',
}

const GRAMS_PER_UNIT = {
  g: 1,
  grm: 1,
  gm: 1,
  mg: 0.001,
  kg: 1000,
  oz: 28.35,
  onz: 28.35,
  // treat liquids as ~1 g/ml (close enough for milk, creamer, juice)
  ml: 1,
  mlt: 1,
}

export function servingGrams(item) {
  if (!item.servingSize || !item.servingSizeUnit) return null
  const factor = GRAMS_PER_UNIT[item.servingSizeUnit.trim().toLowerCase()]
  return factor ? item.servingSize * factor : null
}

export function perServingKg(item) {
  const grams = servingGrams(item)
  return grams ? (item.kgCO2e * grams) / 1000 : null
}

export function fmt(n, digits = 1) {
  if (n === null || n === undefined || Number.isNaN(n)) return '—'
  if (n !== 0 && Math.abs(n) < 0.05) return n.toFixed(2)
  return n.toLocaleString('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: digits,
  })
}

export function fmtPct(fraction) {
  if (fraction === null || fraction === undefined) return '—'
  const pct = fraction * 100
  if (pct !== 0 && Math.abs(pct) < 0.1) return pct.toFixed(2) + '%'
  return pct.toFixed(1).replace(/\.0$/, '') + '%'
}
