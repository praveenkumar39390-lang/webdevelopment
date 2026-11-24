function Hero() {
  return (
    <section className="hero" id="home">
      <p className="eyebrow">The 2026 season starts here</p>
      <h1>Experience The Stadium Energy Live!</h1>
      <p>Pick your match, choose your stand, and be part of the action.</p>
      <div className="hero-actions">
        <a className="button button-primary" href="#matches">
          View schedule
        </a>
        <a className="button button-secondary" href="#booking">
          Book ticket
        </a>
      </div>
    </section>
  )
}

export default Hero
