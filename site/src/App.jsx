import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import Explore from './components/Explore.jsx'
import Swaps from './components/Swaps.jsx'
import Categories from './components/Categories.jsx'
import Baskets from './components/Baskets.jsx'
import Methodology from './components/Methodology.jsx'

export default function App() {
  return (
    <>
      <Nav />
      <Hero />
      <main>
        <Explore />
        <Swaps />
        <Categories />
        <Baskets />
        <Methodology />
      </main>
      <footer className="footer">
        <div className="container">
          <p className="recognition">
            <span className="award-star" aria-hidden="true">★</span> Recognized as{' '}
            <strong>Best Overall</strong> and <strong>Most Polished</strong> in the{' '}
            <a href="https://softwarexclimate.com/showcase">Terra.do Software x Climate</a>{' '}
            January 2024 cohort.
          </p>
          <p className="footer-credit">
            Built by{' '}
            <a href="https://www.linkedin.com/in/nicholasjsutherland/">Nicholas Sutherland</a> ·
            data from USDA FoodData Central, Our World in Data, CarbonCloud and cited sources ·{' '}
            <a href="https://github.com/njsuthe/GhGlabeling">source on GitHub</a>
          </p>
        </div>
      </footer>
    </>
  )
}
