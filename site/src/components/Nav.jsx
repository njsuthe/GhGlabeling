const LINKS = [
  ['#explore', 'Explore'],
  ['#swaps', 'Swaps'],
  ['#categories', 'Categories'],
  ['#baskets', 'Baskets'],
  ['#methodology', 'Methodology'],
]

export default function Nav() {
  return (
    <nav className="nav">
      <div className="nav-inner">
        <a className="wordmark" href="#top">
          <span className="tag">CO₂e</span>Grocery carbon labels
        </a>
        <div className="nav-links">
          {LINKS.map(([href, label]) => (
            <a key={href} href={href}>
              {label}
            </a>
          ))}
        </div>
        <a className="nav-gh" href="https://github.com/njsuthe/GhGlabeling">
          GitHub ↗
        </a>
      </div>
    </nav>
  )
}
