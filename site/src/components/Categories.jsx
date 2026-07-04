import { useState } from 'react'
import poore from '../data/poore.json'
import supply from '../data/supplychain.json'
import { impactLevel, fmt } from '../lib/impact.js'

const LEVEL_COLOR = {
  low: 'var(--green)',
  medium: 'var(--amber)',
  high: 'var(--red)',
}

const STAGES = [
  ['landUse', 'Land use', '#a9743c'],
  ['farm', 'Farm', '#4e7a5a'],
  ['animalFeed', 'Animal feed', '#c4a24e'],
  ['processing', 'Processing', '#7b6fa0'],
  ['transport', 'Transport', '#4e7ea8'],
  ['retail', 'Retail', '#c97b8c'],
  ['packaging', 'Packaging', '#6ba3a0'],
  ['losses', 'Losses', '#9a9488'],
]

function IntensityChart() {
  const [showAll, setShowAll] = useState(false)
  const rows = showAll ? poore : poore.slice(0, 15)
  const max = poore[0].kgCO2ePerKg
  return (
    <div className="chart-block">
      <h3>GHG intensity by food category</h3>
      <p className="chart-caption">
        kg CO₂e per kg of food, cradle to retail (Poore &amp; Nemecek 2018, via Our World in
        Data). Beef is in a class of its own — an order of magnitude above most plant proteins.
      </p>
      {rows.map((r) => (
        <div className="bar-row" key={r.entity}>
          <span className="bar-name">{r.entity}</span>
          <div className="bar-track">
            <div
              className="bar-fill"
              style={{
                width: `${(r.kgCO2ePerKg / max) * 100}%`,
                background: LEVEL_COLOR[impactLevel(r.kgCO2ePerKg)],
              }}
            />
          </div>
          <span className="bar-val">{fmt(r.kgCO2ePerKg)}</span>
        </div>
      ))}
      <button className="show-more" onClick={() => setShowAll(!showAll)}>
        {showAll ? 'Show top 15' : `Show all ${poore.length} categories`}
      </button>
    </div>
  )
}

function SupplyChainChart() {
  const [showAll, setShowAll] = useState(false)
  const rows = showAll ? supply : supply.slice(0, 12)
  const max = supply[0].total
  return (
    <div className="chart-block">
      <h3>Where in the supply chain emissions happen</h3>
      <p className="chart-caption">
        The label's headline number decomposes into stages. For high-impact foods the story is
        overwhelmingly land use and the farm itself — transport and packaging, the parts shoppers
        usually worry about, are slivers. (Small negative land-use values, i.e. net carbon
        uptake, are clipped from the bars.)
      </p>
      {rows.map((r) => (
        <div className="bar-row" key={r.entity}>
          <span className="bar-name">{r.entity}</span>
          <div className="bar-track" style={{ display: 'flex' }}>
            {STAGES.map(([key, label, color]) => {
              const v = Math.max(0, r.stages[key])
              if (!v) return null
              return (
                <div
                  key={key}
                  className="bar-fill"
                  title={`${label}: ${fmt(v, 2)} kg`}
                  style={{
                    width: `${(v / max) * 100}%`,
                    minWidth: 0,
                    background: color,
                    borderRadius: 0,
                  }}
                />
              )
            })}
          </div>
          <span className="bar-val">{fmt(r.total)}</span>
        </div>
      ))}
      <div className="legend">
        {STAGES.map(([key, label, color]) => (
          <span className="key" key={key}>
            <span className="swatch" style={{ background: color }} />
            {label}
          </span>
        ))}
      </div>
      <button className="show-more" onClick={() => setShowAll(!showAll)}>
        {showAll ? 'Show top 12' : `Show all ${supply.length} foods`}
      </button>
    </div>
  )
}

export default function Categories() {
  return (
    <section className="section" id="categories">
      <div className="container">
        <p className="section-kicker">Categories</p>
        <h2>Why the numbers are what they are</h2>
        <p className="section-intro">
          Two reference views from the datasets behind the labels: how food categories rank, and
          which stage of the supply chain the emissions actually come from.
        </p>
        <IntensityChart />
        <SupplyChainChart />
      </div>
    </section>
  )
}
