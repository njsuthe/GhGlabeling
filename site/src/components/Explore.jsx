import { useEffect, useMemo, useState } from 'react'
import items from '../data/items.json'
import CarbonFactsLabel from './CarbonFactsLabel.jsx'
import { impactLevel, fmt } from '../lib/impact.js'

const LEVELS = [
  ['all', 'All'],
  ['low', 'Low'],
  ['medium', 'Medium'],
  ['high', 'High'],
]

const SORTS = {
  'intensity-desc': { label: 'Highest CO₂e per kg', fn: (a, b) => b.kgCO2e - a.kgCO2e },
  'intensity-asc': { label: 'Lowest CO₂e per kg', fn: (a, b) => a.kgCO2e - b.kgCO2e },
  package: { label: 'Highest CO₂e per package', fn: (a, b) => (b.co2PerPackage ?? 0) - (a.co2PerPackage ?? 0) },
  name: { label: 'Name (A–Z)', fn: (a, b) => a.foodItem.localeCompare(b.foodItem) },
}

function Modal({ item, onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-body" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close">
          ✕
        </button>
        <CarbonFactsLabel item={item} />
      </div>
    </div>
  )
}

const COLLAPSED_COUNT = 12

export default function Explore() {
  const [query, setQuery] = useState('')
  const [level, setLevel] = useState('all')
  const [sort, setSort] = useState('intensity-desc')
  const [selected, setSelected] = useState(null)
  const [expanded, setExpanded] = useState(false)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return items
      .filter((it) => {
        if (level !== 'all' && impactLevel(it.kgCO2e) !== level) return false
        if (!q) return true
        return [it.name, it.foodItem, it.brandName, it.brandOwner, it.category]
          .filter(Boolean)
          .some((s) => s.toLowerCase().includes(q))
      })
      .sort(SORTS[sort].fn)
  }, [query, level, sort])

  // Cap the default view; a search or level filter shows all matches directly.
  const isFiltered = query.trim() !== '' || level !== 'all'
  const showAll = expanded || isFiltered
  const visible = showAll ? filtered : filtered.slice(0, COLLAPSED_COUNT)

  return (
    <section className="section" id="explore">
      <div className="container">
        <p className="section-kicker">Explore</p>
        <h2>Every item, labeled</h2>
        <p className="section-intro">
          All {items.length} products, each with the greenhouse-gas label it would carry on the
          shelf. Search
          or filter, then click any item for its full Carbon facts panel.
        </p>
        <div className="explore-controls">
          <input
            className="search"
            type="search"
            placeholder="Search beef, oat milk, chips…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search products"
          />
          {LEVELS.map(([key, label]) => (
            <button
              key={key}
              className={`chip ${level === key ? 'active' : ''}`}
              onClick={() => setLevel(key)}
            >
              {label}
            </button>
          ))}
          <select
            className="sort-select"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            aria-label="Sort products"
          >
            {Object.entries(SORTS).map(([key, s]) => (
              <option key={key} value={key}>
                {s.label}
              </option>
            ))}
          </select>
        </div>
        <div className="item-grid">
          {visible.map((it) => {
            const lv = impactLevel(it.kgCO2e)
            return (
              <button key={it.fdcId} className="item-card" onClick={() => setSelected(it)}>
                <span className="ic-top">
                  <span className="ic-name">{it.foodItem}</span>
                  <span className={`dot ${lv}`} title={`${lv} impact`} />
                </span>
                <span className="ic-brand">{it.brandName || it.brandOwner}</span>
                <span className="ic-co2">
                  <strong>{fmt(it.kgCO2e)}</strong> kg CO₂e / kg
                </span>
              </button>
            )
          })}
        </div>
        {!isFiltered && filtered.length > COLLAPSED_COUNT && (
          <button className="show-more" onClick={() => setExpanded(!expanded)}>
            {expanded ? 'Show fewer' : `Show all ${filtered.length} items`}
          </button>
        )}
        <p className="explore-count">
          Showing {visible.length} of {items.length} items · intensity color:{' '}
          <span className="dot low" /> under 5 · <span className="dot medium" /> 5–20 ·{' '}
          <span className="dot high" /> 20+ kg CO₂e per kg
        </p>
        {selected && <Modal item={selected} onClose={() => setSelected(null)} />}
      </div>
    </section>
  )
}
