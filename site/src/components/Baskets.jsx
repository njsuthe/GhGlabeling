import { useMemo, useState } from 'react'
import items from '../data/items.json'
import { BASKETS } from '../lib/baskets.js'
import { fmt, KG_PER_MILE_DRIVEN, KG_PER_TREE_YEAR, YEARLY_BUDGET_KG } from '../lib/impact.js'

const byId = new Map(items.map((it) => [it.fdcId, it]))

const PERIODS = [
  ['weekly', 'Weekly', 1],
  ['monthly', 'Monthly', 52 / 12],
  ['annual', 'Annual', 52],
]

// Relative footprint color across the three shoppers (highest → lowest),
// echoing the Swaps section's red/amber/green language.
const FOOTPRINT_COLOR = {
  a: 'var(--red)',
  b: 'var(--amber)',
  c: 'var(--green)',
}

export default function Baskets() {
  const [period, setPeriod] = useState('annual')
  const factor = PERIODS.find(([k]) => k === period)[2]

  const baskets = useMemo(
    () =>
      BASKETS.map((b) => {
        const resolved = b.itemIds.map((id) => byId.get(id)).filter(Boolean)
        const weeklyKg = resolved.reduce((sum, it) => sum + (it.co2PerPackage ?? 0), 0)
        const top = [...resolved]
          .sort((x, y) => (y.co2PerPackage ?? 0) - (x.co2PerPackage ?? 0))
          .slice(0, 5)
        return { ...b, resolved, weeklyKg, top }
      }),
    [],
  )

  return (
    <section className="section" id="baskets">
      <div className="container">
        <p className="section-kicker">Baskets</p>
        <h2>Three shoppers, three footprints</h2>
        <p className="section-intro">
          Rebuilt from the original project's shopper profiles: each basket is one package of
          every listed item per week, extrapolated out. The gap between an average cart and a
          label-guided one is not subtle.
        </p>
        <div className="period-toggle" role="tablist">
          {PERIODS.map(([key, label]) => (
            <button
              key={key}
              className={period === key ? 'active' : ''}
              onClick={() => setPeriod(key)}
            >
              {label}
            </button>
          ))}
        </div>
        <div className="basket-grid">
          {baskets.map((b) => {
            const total = b.weeklyKg * factor
            const annual = b.weeklyKg * 52
            return (
              <div className="basket-card" key={b.id}>
                <h3>{b.name}</h3>
                <p className="basket-blurb">{b.blurb}</p>
                <div className="basket-total" style={{ color: FOOTPRINT_COLOR[b.id] }}>
                  {fmt(total, 0)}
                  <span className="unit">kg CO₂e</span>
                </div>
                <p className="basket-equiv">
                  Annually ≈ {fmt(annual / KG_PER_MILE_DRIVEN, 0)} miles driven ·{' '}
                  {fmt(annual / KG_PER_TREE_YEAR, 0)} tree-years ·{' '}
                  {fmt((annual / YEARLY_BUDGET_KG) * 100, 0)}% of a 2 t budget
                </p>
                <div className="basket-items">
                  {b.top.map((it) => (
                    <div className="bi" key={it.fdcId}>
                      <span>{it.foodItem}</span>
                      <span>{fmt((it.co2PerPackage ?? 0) * factor, 1)} kg</span>
                    </div>
                  ))}
                  <div className="bi">
                    <span>… {b.resolved.length - b.top.length} more items</span>
                    <span />
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
