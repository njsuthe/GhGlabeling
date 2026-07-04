import { impactLevel, IMPACT_LABEL, perServingKg, servingGrams, fmt, fmtPct, YEARLY_BUDGET_KG } from '../lib/impact.js'

// The FDA nutrition-facts pastiche at the heart of the site: one label per product.
export default function CarbonFactsLabel({ item }) {
  const level = impactLevel(item.kgCO2e)
  const serving = perServingKg(item)
  const grams = servingGrams(item)
  return (
    <div className="cf-label">
      <p className="cf-title">Carbon facts</p>
      <p className="cf-item">
        <strong>{item.foodItem}</strong>
        {item.brandName ? ` · ${item.brandName}` : ''}
        {item.packageWeight ? ` · ${item.packageWeight}` : ''}
      </p>
      <div className="cf-hero-row">
        <span className="cf-metric">Per package</span>
        <span className="cf-value">{fmt(item.co2PerPackage)} kg CO₂e</span>
      </div>
      <div className="cf-row">
        <span className="cf-sub">Per kg of food</span>
        <span>{fmt(item.kgCO2e)} kg CO₂e</span>
      </div>
      {serving !== null && (
        <div className="cf-row">
          <span className="cf-sub">Per serving ({fmt(grams, 0)} g)</span>
          <span>{fmt(serving, 2)} kg CO₂e</span>
        </div>
      )}
      {item.co2PerPackage !== null && (
        <div className="cf-row">
          <span className="cf-sub">Share of a 2 t yearly budget</span>
          <span>{fmtPct(item.co2PerPackage / YEARLY_BUDGET_KG)}</span>
        </div>
      )}
      <div className="cf-foot">
        <span className={`pill ${level}`}>{IMPACT_LABEL[level]}</span>
        <span className="cf-source">{item.source}</span>
      </div>
    </div>
  )
}
