import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import homeIcon from '../assets/images/homeArrow.jpg';
import signInImage from '../assets/images/signin.jpg';
import { loginSuccess } from '../redux/reducers/authSlice';
import './LoginPage.css';

const Signin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 8;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setEmailError('');
    setPasswordError('');

    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address');
      setLoading(false);
      return;
    }

    if (!validatePassword(password)) {
      setPasswordError('your password in incorrect');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post('http://localhost:8000/api/login/', { email, password });

      if (response.data.token) {
        Cookies.set('authToken', response.data.token);
        Cookies.set('email', email);
        console.log('Login successful, token saved:', response.data.token);

        const userTypeResponse = await axios.post('http://localhost:8000/api/get_usertype/', { email });
        const userType = userTypeResponse.data.usertype;

        const userDetailsResponse = await axios.post('http://localhost:8000/api/get_userdetails/', { email });
        const userDetails = userDetailsResponse.data;

        dispatch(loginSuccess({
          token: response.data.token,
          userType,
          userDetails,
          email,
        }));

        navigate(from, { replace: true });
      } else {
        setError('Invalid email or password');
      }
    } catch (error) {
      console.error('Login error:', error.response || error);
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
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
              {emailError && <p className="message error">{emailError}</p>}
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {passwordError && <p className="message error">{passwordError}</p>}
              <button type="submit" disabled={loading}>
                {loading ? 'Logging in...' : 'Login'}
              </button>
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
