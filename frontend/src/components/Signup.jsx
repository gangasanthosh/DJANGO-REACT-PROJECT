
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import homeIcon from '../assets/images/homeArrow.jpg';
import signupImage from '../assets/images/signup.jpg';
import './LoginPage.css';

const Signup = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        usertype: '',  // Changed role to usertype
    });
    const [usernameError, setUsernameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [usertypeError, setUsertypeError] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
        // Reset specific error when user starts typing again
        if (name === 'username') setUsernameError('');
        if (name === 'email') setEmailError('');
        if (name === 'password') setPasswordError('');
    };

    const validateForm = () => {
        const { username, email, password, usertype } = formData;
        let valid = true;

        if (!username) {
            setUsernameError('First Name is required.');
            valid = false;
        } else if (!/^[a-zA-Z]+$/.test(username)) {
            setUsernameError('Oops! Your first name contains a number or a special character.');
            valid = false;
        }

        if (!email) {
            setEmailError('Email is required.');
            valid = false;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            setEmailError('Oops! Enter a valid email.');
            valid = false;
        }

        if (!password) {
            setPasswordError('Password is required.');
            valid = false;
        } else if (password.length < 8) {
            setPasswordError('Password should be at least 8 characters long.');
            valid = false;
        }

        if (!usertype) {
            setUsertypeError('Please select a role.');
            valid = false;
        }

        return valid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const isValid = validateForm();
            if (!isValid) {
                return;
            }

            const formBody = {
                ...formData,
                "user_auth_type": "username/password"
            };

            const response = await fetch('http://127.0.0.1:8000/api/register/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formBody)
            });

            if (response.ok) {
                navigate('/signin');
            }
        } catch (error) {
            setError({ message: error.message });
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
                <h2>Let's get started!</h2>
            </div>
            <div className="login-page">
                <div className="form-container">
                    <div className="form">
                        <form className="register-form" onSubmit={handleSubmit}>
                            <input
                                type="text"
                                name="username"
                                placeholder="First Name*"
                                value={formData.username}
                                onChange={handleChange}
                            />
                            {usernameError && <p className="message error">{usernameError}</p>}

                            <input
                                type="email"
                                name="email"
                                placeholder="Email Address*"
                                value={formData.email}
                                onChange={handleChange}
                            />
                            {emailError && <p className="message error">{emailError}</p>}

                            <input
                                type="password"
                                name="password"
                                placeholder="Password*"
                                value={formData.password}
                                onChange={handleChange}
                            />
                            {passwordError && <p className="message error">{passwordError}</p>}

                            <div className="role-selection">
                                <p>Indicate your role:</p>
                                <div className='d-flex'>
                                    <div className="role-option">
                                        <input
                                            type="radio"
                                            name="usertype"
                                            value="recruiter"
                                            id="recruiter"
                                            onChange={handleChange}
                                        />
                                        <label htmlFor="recruiter">Recruiter</label>
                                    </div>
                                    <div className="role-option">
                                        <input
                                            type="radio"
                                            name="usertype"
                                            value="jobseeker"
                                            id="jobSeeker"
                                            onChange={handleChange}
                                        />
                                        <label htmlFor="jobSeeker">Job Seeker</label>
                                    </div>
                                </div>
                                {usertypeError && <p className="message error">{usertypeError}</p>}
                            </div>
                            {error && <p className="message error">{error.message}</p>}
                            <button type="submit">Create</button>
                            <p className="message">Already registered? <Link to="/signin">Sign In</Link></p>
                        </form>
                    </div>
                    <div className="image-container">
                        <img src={signupImage} alt="Sign Up" className="signup-image" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;
