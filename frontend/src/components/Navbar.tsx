import React from 'react';

const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <a href="/">BitToss</a>
      </div>
      <div className="navbar-menu">
        <a href="/">Home</a>
        <a href="/explorer">Explorer</a>
      </div>
    </nav>
  );
}

export default Navbar;
