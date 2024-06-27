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
          <li><a href="/searchcompany"> Companies </a></li>
          <li><a href="/searchjob"> Jobs </a></li>
          <li><a href="/status"> Application Status</a></li>
          <li><a href="/aboutus"> About Us </a></li>
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
            <li><a href="/"> Home </a></li>
            <li><a href="/searchcompanies"> Companies </a></li>
            <li><a href="/searchjob"> Jobs </a></li>
            <li><a href="status"> Application Status</a></li>
            <li><a href="/aboutus"> About Us </a></li>
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
