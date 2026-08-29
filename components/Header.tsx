import { Menu, Search, UserRound } from "lucide-react";

export function Header() {
  return (
    <>
      <div className="promo-bar">
        <div className="promo-inner">
          <span className="promo-close">×</span>
          <span className="promo-mark">✦</span>
          <strong>Download app bonus <b>Rs999</b></strong>
          <a href="#download">Download now</a>
        </div>
      </div>
      <header className="header">
        <div className="container header-inner">
          <button className="icon-button mobile-only" aria-label="Open menu"><Menu size={22} /></button>
          <a className="brand" href="/">
            <span className="brand-symbol">P</span><span>999</span>
          </a>
          <nav className="desktop-nav">
            <a href="/">Home</a>
            <a href="/games">Games</a>
            <a href="/category/mini-games">Mini Games</a>
            <a href="/category/slot">Slot</a>
            <a href="/search">Search</a>
          </nav>
          <div className="header-actions">
            <a className="login-button" href="#">Login</a>
            <a className="register-button" href="#">Register <small>30-999</small></a>
            <a className="icon-button search-button" href="/search" aria-label="Search"><Search size={19} /></a>
          </div>
        </div>
      </header>
    </>
  );
}