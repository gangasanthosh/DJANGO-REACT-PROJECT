
import Cookies from 'js-cookie';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import profile from '../assets/images/profile.jpg';
import axios from '../help/axios';
import { logout } from '../redux/reducers/authSlice';
import { persistor } from '../redux/store/store';
import './JsNavbar.css';

const JsNavbar = () => {
  const [isMobileMenuVisible, setMobileMenuVisible] = useState(false);
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const dispatch = useDispatch();


  const handleLogout = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/logout/', {}, {
        headers: {
          Authorization: `Token ${Cookies.get('authToken')}`,
        },
      });
      Cookies.remove('authToken')
      Cookies.remove('userDetails');
      Cookies.remove('email')
      localStorage.clear();
      sessionStorage.clear();
      // Dispatch logout action to clear Redux state
      dispatch(logout());
      await persistor.purge();
      navigate('/signin');
      console.log('logout succesful');
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
          <li><a href="/searchcompany"> Companies </a></li>
          <li><a href="/searchjob"> Jobs </a></li>
          <li><a href="/status"> Application Status</a></li>
          <li><a href="/aboutus"> About Us </a></li>
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
            <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer"><a href="/profilesetup">Profile</a></li>
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
              <li><a href="/searchcompany"> Companies </a></li>
              <li><a href="/searchjob"> Jobs </a></li>
              <li><a href="/status"> Application Status</a></li>
              <li><a href="/aboutus"> About Us </a></li>
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


