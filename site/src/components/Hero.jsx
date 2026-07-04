export default function Hero() {
  return (
    <header className="hero" id="top">
      <div className="container">
        <h1>What if groceries had carbon labels?</h1>
        <p className="lede">
          Food is responsible for roughly a quarter of global greenhouse-gas emissions, but the
          climate cost of what lands in a shopping cart is invisible at the shelf. This project
          takes 76 real products from USDA FoodData Central, matches each to a documented CO₂e
          intensity estimate, and prints the label the package never had.
        </p>
        <p className="provenance">
          Version 2 of a project first built by hand with Tableau —{' '}
          <a href="https://github.com/njsuthe/GhGlabeling/releases/tag/v1-tableau">
            the original storyboard is preserved here
          </a>
          .
        </p>
      </div>
    </header>
  )
}
