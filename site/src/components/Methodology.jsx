export default function Methodology() {
  return (
    <section className="section" id="methodology">
      <div className="container">
        <p className="section-kicker">Methodology</p>
        <h2>How the labels are made</h2>
        <div className="method">
          <p>
            Product metadata (name, brand, package weight, serving size) comes from the{' '}
            <a href="https://fdc.nal.usda.gov/">USDA FoodData Central API</a> — 76 branded items
            hand-picked across high- and low-impact food groups, in deliberate
            conventional/plant-based pairs. Each item is then matched to a documented greenhouse-gas
            intensity (kg CO₂e per kg of food), preferring peer-reviewed syntheses and falling back
            to industry databases where needed. Per-package figures are simply intensity × package
            weight; the data preparation lives in{' '}
            <a href="https://github.com/njsuthe/GhGlabeling/blob/main/notebooks/Grocery_Item_GhG_Labeling.ipynb">
              the project notebook
            </a>
            .
          </p>
          <h3>Caveats</h3>
          <ul className="fine">
            <li>
              Category-level intensities mask brand and supply-chain variability; two cheddars do
              not truly share a footprint.
            </li>
            <li>
              Estimates are sensitive to serving-size, weight, and preparation assumptions; liquids
              are treated as ~1 g/ml.
            </li>
            <li>
              Some products lack definitive footprints, so documented proxies are used — the source
              is printed on every label.
            </li>
            <li>
              The goal is comparative guidance for shoppers, not exact carbon accounting. The
              "2 t yearly budget" line is a commonly cited per-person target compatible with
              1.5–2 °C pathways, used for scale.
            </li>
          </ul>
          <h3>Sources</h3>
          <ul className="fine">
            <li>
              Poore, J., &amp; Nemecek, T. (2018).{' '}
              <a href="https://www.science.org/doi/10.1126/science.aaq0216">
                Reducing food's environmental impacts through producers and consumers
              </a>
              . <em>Science</em> — primary intensity data, via{' '}
              <a href="https://ourworldindata.org/environmental-impacts-of-food">
                Our World in Data
              </a>
              .
            </li>
            <li>
              <a href="https://ourworldindata.org/grapher/food-emissions-supply-chain">
                OWID: food emissions by supply-chain stage
              </a>{' '}
              ·{' '}
              <a href="https://ourworldindata.org/grapher/ghg-per-kg-poore">
                OWID: GHG per kg
              </a>{' '}
              ·{' '}
              <a href="https://ourworldindata.org/grapher/environmental-footprint-milks">
                OWID: milks
              </a>{' '}
              ·{' '}
              <a href="https://ourworldindata.org/grapher/ghg-emissions-seafood">
                OWID: seafood
              </a>
            </li>
            <li>
              <a href="https://apps.carboncloud.com/climatehub/">CarbonCloud ClimateHub</a> —
              secondary product/category footprints.
            </li>
            <li>
              Gap-fillers: <a href="https://consumerecology.com/">Consumer Ecology</a>{' '}
              (alternative beef),{' '}
              <a href="https://link.springer.com/article/10.1007/s11367-020-01817-6">
                Bianchi et al. 2021
              </a>{' '}
              (chocolate), <a href="https://www.healabel.com/">HEALabel</a> (nuts),{' '}
              <a href="https://www.ju.st/learn">Eat Just</a> (plant-based egg).
            </li>
            <li>
              Real-world precedent:{' '}
              <a href="https://www.bloomberg.com/news/articles/2023-01-31/oatly-launches-climate-footprint-labels-in-the-us">
                Oatly's climate-footprint labels
              </a>
              .
            </li>
          </ul>
          <h3>Project history</h3>
          <p className="fine">
            Version 1 (2024) was built by hand: the same notebook-prepared data visualized as a
            Tableau storyboard, including early label mockups —{' '}
            <a href="https://github.com/njsuthe/GhGlabeling/releases/tag/v1-tableau">
              preserved as the v1-tableau release
            </a>
            . Version 2 (2026) rebuilds the presentation as this interactive site, with the same
            data and methodology.
          </p>
        </div>
      </div>
    </section>
  )
}
