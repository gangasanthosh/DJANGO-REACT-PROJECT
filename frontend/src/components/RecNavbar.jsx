import React, { useState } from 'react';
import profile from '../assets/images/profile.jpg'; // Make sure to update the path to your profile image
import './RecNavbar.css';

const RecNavbar = () => {
  const [isMobileMenuVisible, setMobileMenuVisible] = useState(false);
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleHamburgerClick = () => {
    setMobileMenuVisible(!isMobileMenuVisible);
  };

  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };
  const handleMouseEnter = () => {
      setDropdownOpen(true);
        };
    
  const handleMouseLeave = () => {
      setDropdownOpen(false);
        };
  return (
    <div className="navbar">
      <div className="nav-logo">
        <h1 className="logo-text"><b>JobStack</b></h1>
      </div>
      <div className="nav-items">
        <ul>
          <li><a href="/"> Home </a></li>
          <li><a href="#"> Applications </a></li>
          <li><a href="#"> About Us </a></li>
          <li><a href="/aboutus"> Contact Us</a></li>
        </ul>
      </div>
      <div
        className="relative"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        >
        <img
          src={profile}
          alt="Profile"
          className="rounded-full w-10 h-10 cursor-pointer"
        />
        {dropdownOpen && (
          <ul className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md py-2">
            <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">Settings</li>
            <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">Profile</li>
            <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">Sign Out</li>
            </ul>
          )}
      </div>
      <div id="hamburger-menu" onClick={handleHamburgerClick}>&#9776;</div>

      {isMobileMenuVisible && (
        <div id="mobile-menu">
          <div className="mobile-nav-items">
            <ul>
              <li><a href="/"> Home </a></li>
              <li><a href="#"> Companies </a></li>
              <li><a href="#"> Jobs </a></li>
              <li><a href="#"> About Us </a></li>
              <li><a href="/aboutus"> Contact Us</a></li>
            </ul>
          </div>
          <div className="profile-container-mobile" onClick={toggleDropdown}>
            <img
              src={profile}
              alt="Profile"
              className="profile-img"
            />
            {isDropdownVisible && (
              <div className="profile-dropdown-mobile">
                <ul>
                  <li><a href="/settings">Settings</a></li>
                  <li><a href="/profile">Profile</a></li>
                  <li><a href="/logout">Sign Out</a></li>
                </ul>
              </div>
            )}
          </div>
          <div id="hamburger-cross" onClick={handleHamburgerClick}>&#10006;</div>
        </div>
      )}
    </div>
  );
};


export default RecNavbar

