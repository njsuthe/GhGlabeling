import { useMemo, useState } from 'react'
import items from '../data/items.json'
import CarbonFactsLabel from './CarbonFactsLabel.jsx'
import { SWAP_GROUPS } from '../lib/swaps.js'
import { fmt, KG_PER_MILE_DRIVEN } from '../lib/impact.js'

const byId = new Map(items.map((it) => [it.fdcId, it]))

export default function Swaps() {
  const groups = useMemo(
    () =>
      SWAP_GROUPS.map((g) => ({
        ...g,
        fromItem: byId.get(g.from),
        altItems: g.alternatives.map((id) => byId.get(id)).filter(Boolean),
      })).filter((g) => g.fromItem && g.altItems.length),
    [],
  )
  const [groupId, setGroupId] = useState(groups[0]?.id)
  const group = groups.find((g) => g.id === groupId) ?? groups[0]
  const [altId, setAltId] = useState(null)
  const alt = group.altItems.find((a) => a.fdcId === altId) ?? group.altItems[0]

  const from = group.fromItem
  const saveFrac = (from.kgCO2e - alt.kgCO2e) / from.kgCO2e
  const yearlyKg = (from.kgCO2e - alt.kgCO2e) * 52 // swapping 1 kg a week
  const miles = yearlyKg / KG_PER_MILE_DRIVEN

  return (
    <section className="section" id="swaps">
      <div className="container">
        <p className="section-kicker">Swaps</p>
        <h2>Same shelf, different footprint</h2>
        <p className="section-intro">
          The dataset was collected in deliberate pairs — each conventional product alongside a
          plant-based counterpart sold a few feet away. Pick a product to see both labels side by
          side.
        </p>
        <div className="swap-picker">
          {groups.map((g) => (
            <button
              key={g.id}
              className={`chip ${g.id === group.id ? 'active' : ''}`}
              onClick={() => {
                setGroupId(g.id)
                setAltId(null)
              }}
            >
              {g.title}
            </button>
          ))}
        </div>
        <div className="swap-stage">
          <CarbonFactsLabel item={from} />
          <div className="swap-mid">
            <span className="swap-arrow">→</span>
            <span className="swap-save">
              {saveFrac > 0 ? '−' : '+'}
              {fmt(Math.abs(saveFrac) * 100, 0)}%
            </span>
            <span className="swap-note">
              CO₂e per kg. Swapping a kilogram a week for a year saves ~{fmt(yearlyKg, 0)} kg CO₂e
              — about {fmt(miles, 0)} miles of driving.
            </span>
            {group.altItems.length > 1 && (
              <span className="swap-alt-picker">
                {group.altItems.map((a) => (
                  <button
                    key={a.fdcId}
                    className={`chip ${a.fdcId === alt.fdcId ? 'active' : ''}`}
                    onClick={() => setAltId(a.fdcId)}
                  >
                    {a.foodItem}
                  </button>
                ))}
              </span>
            )}
          </div>
          <CarbonFactsLabel item={alt} />
        </div>
      </div>
    </section>
  )
}
