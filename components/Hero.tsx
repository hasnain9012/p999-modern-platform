export function Hero() {
  return (
    <section className="hero">
      <div className="container">
        <div className="hero-card">
          <div className="hero-copy">
            <span className="hero-kicker">MISSION REWARDS</span>
            <h1>Get rewards<br /><strong>for free!</strong></h1>
            <div className="hero-amount">Rs 5,000</div>
            <p>Explore popular games and discover something new.</p>
            <a className="hero-button" href="/games">Explore Games</a>
          </div>
          <div className="hero-art">
            <div className="hero-orb">P999</div>
            <div className="hero-coin coin-one">✦</div>
            <div className="hero-coin coin-two">Rs</div>
            <div className="hero-character">♕</div>
          </div>
        </div>
        <div className="quick-links">
          {["App Bonus", "Download App", "Rewards", "Events", "Support"].map((x, i) => (
            <a href="#quick" key={x}><span className={`quick-icon q${i}`}>{["✦","⌄","7","⚡","◉"][i]}</span><small>{x}</small></a>
          ))}
        </div>
      </div>
    </section>
  );
}