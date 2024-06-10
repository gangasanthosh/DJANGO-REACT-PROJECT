import React, { useState } from 'react';
import './Navbar.css';

const Navbar = () => {
  const [isMobileMenuVisible, setMobileMenuVisible] = useState(false);

  const handleHamburgerClick = () => {
    setMobileMenuVisible(!isMobileMenuVisible);
  };

  return (
    <div className="navbar">
      <div className="nav-logo">
        <h1 className="logo-text"><b>JobStack</b></h1>
      </div>
      <div className="nav-items">
        <ul>
          <li><a href="/"> Home </a></li>
          <li><a href="#"> Companies </a></li>
          <li><a href="/search"> Jobs </a></li>
          <li><a href="#"> About Us </a></li>
          <li><a href="#"> Contact Us</a></li>
        </ul>
      </div>
      <div className="nav-button">
        <div className="anim-layer"></div>
        <a href="/signin">SignIn</a>
      </div>
      <div id="hamburger-menu" onClick={handleHamburgerClick}>&#9776;</div>

      {isMobileMenuVisible && (
        <div id="mobile-menu">
          <div className="mobile-nav-items">
            <ul>
              <li><a href="#"> Home </a></li>
              <li><a href="#"> Services </a></li>
              <li><a href="#"> About </a></li>
              <li><a href="#"> Contact </a></li>
            </ul>
          </div>
          <div className="mobile-nav-button">
            <div className="anim-layer"></div>
            <a href="/signin">SignIn</a>
          </div>
          <div id="hamburger-cross" onClick={handleHamburgerClick}>&#10006;</div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
