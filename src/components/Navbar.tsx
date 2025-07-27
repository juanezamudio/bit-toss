import React, { useState } from 'react';

const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <a href="/">BitToss</a>
      </div>
      <button
        className="navbar-hamburger"
        aria-label="Toggle navigation"
        onClick={() => setMenuOpen((open) => !open)}
      >
        <span className="hamburger-bar" />
        <span className="hamburger-bar" />
        <span className="hamburger-bar" />
      </button>
      <div className={`navbar-menu${menuOpen ? ' open' : ''}`}>
        <a href="/" onClick={() => setMenuOpen(false)}>Home</a>
        <a href="/explorer" onClick={() => setMenuOpen(false)}>Explorer</a>
      </div>
    </nav>
  );
};

export default Navbar;
