import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import homeIcon from '../assets/images/homeArrow.jpg';
import signInImage from '../assets/images/signin.jpg';
import './LoginPage.css';

const Signin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';


  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("Sending:", { email, password }); 
    try {
      const response = await axios.post('http://localhost:8000/api/login/', {
        email,
        password,
      });

      const csrfToken = response.data.csrf_token;
      const loginRequest = await axios.post('http://localhost:8000/api/login/', {
      email,
      password,
      }, {
      headers: {
        'X-CSRFToken': csrfToken
      }
    });

        if (response.data.token) {
          Cookies.set('authToken', response.data.token);
          Cookies.set('email',email)
          console.log('Login successful, token saved:', response.data.token);
        } else {
          setError('Invalid email or password');
        }

        // Fetch user type
        const userTypeResponse = await axios.post('http://localhost:8000/api/get_usertype/', {
          email,
        });

        if (userTypeResponse.data.usertype === 'jobseeker' || userTypeResponse.data.usertype === 'recruiter') {
          navigate(from, { replace: true });
        } else {
          setError('Invalid user type');
        }
      // Fetch user details
      const userDetailsResponse = await axios.post('http://localhost:8000/api/get_userdetails/', {
        email,
      });


      if (userDetailsResponse.data) {
        Cookies.set('userDetails', JSON.stringify(userDetailsResponse.data));  // Corrected
        sessionStorage.setItem('userDetails', JSON.stringify(userDetailsResponse.data));
        console.log('User details fetched and stored:', userDetailsResponse.data);
      } else {
        setError('Failed to fetch user details');
        return;
      }
    } catch (error) {
      console.error('Login error:', error.response || error); // More detailed error output
      if (error.response && error.response.status === 400) {
        setError('Invalid email or password');
      } else {
        setError('An error occurred. Please try again.');
      }
    }
  };

  return (
    <div className="login-page-wrapper">
      <div className="back-home">
        <Link to="/">
          <img src={homeIcon} alt="Home" className="home-icon" />
          <span>Home</span>
        </Link>
      </div>
      <div className="text-header">
        <h2>Welcome back!</h2>
      </div>
      <div className="login-page">
        <div className="form-container">
          <div className="form">
            <form className="login-form" onSubmit={handleLogin}>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button type="submit">Login</button>
              {error && <p className="message error">{error}</p>}
              <p className="message">
                Not registered? <Link to="/signup">Create an account</Link>
              </p>
            </form>
          </div>
          <div className="image-container">
            <img src={signInImage} alt="Sign In" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;

