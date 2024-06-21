
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import profile from '../assets/images/profile.jpg'; // Make sure to update the path to your profile image
import './JsNavbar.css';

const JsNavbar = () => {
  const [isMobileMenuVisible, setMobileMenuVisible] = useState(false);
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const handleLogout = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/logout/', {}, {
        headers: {
          Authorization: `Token ${localStorage.getItem('token')}`,  // Send token for authentication
        },
      });
      localStorage.removeItem('token');  // Remove token from local storage
      navigate('/signin'); // Perform any other logout actions, e.g., redirecting to login page
      console.log(response.data.message);  // Display logout message
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handleHamburgerClick = () => {
    setMobileMenuVisible(!isMobileMenuVisible);
  };

  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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
      <div className="relative">
        <img
          src={profile}
          alt="Profile"
          className="rounded-full w-10 h-10 cursor-pointer"
          onClick={toggleDropdown}
        />
        {isDropdownVisible && (
          <ul
            className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md py-2"
            ref={dropdownRef}
          >
            <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer"><a href="#">Settings</a></li>
            <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer"><a href="#">Profile</a></li>
            <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer"><a href="#">Application Status</a></li>
            <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer" onClick={handleLogout}>Sign Out</li>
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
              <li><a href="#"> Contact Us</a></li>
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
                  <li><a href="/profile">Application Status</a></li>
                  <li onClick={handleLogout}>Sign Out</li>
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

export default JsNavbar;


