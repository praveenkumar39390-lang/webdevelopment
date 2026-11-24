function Navbar() {
  return (
    <header className="navbar">
      <a className="brand" href="#home">
        <span className="brand-mark">IPL</span>
        <span>Matchday 2026</span>
      </a>
      <nav aria-label="Main navigation">
        <a href="#matches">Matches</a>
        <a href="#booking">Book tickets</a>
      </nav>
    </header>
  )
}

export default Navbar
