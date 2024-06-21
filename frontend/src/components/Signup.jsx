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
    const navigate = useNavigate();
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };
    const validateForm = () => {
        const { username, email, password, usertype } = formData;

        if (!username || !email || !password || !usertype) {
            return "All fields are required.";
        }
        if (!/^[a-zA-Z]+$/.test(username)) {
            return "Oops! your first name contains a number";
        }
        if (!/\S+@\S+\.\S+/.test(email)) {
            return "Oops! Enter a valid Email .";
        }
        if (password.length < 8) {
            return "Password should be at least 8 characters long.";
        }
        return null;
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formBody = {
                ...formData,
                "user_auth_type": "username/password"
            }
            const validationError = validateForm();
            if (validationError) {
                setError({ message: validationError });
                return;
            }

            const response = await fetch('http://127.0.0.1:8000/api/register/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formBody)
            });
            if (response.ok) {
                // const data = await response.json();
                if (formData.usertype === 'jobseeker') {
                    navigate('/jobseeker');
                } else if (formData.usertype === 'recruiter') {
                    navigate('/recruiter');
                }
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

                            <input 
                            type="email" 
                            name="email" 
                            placeholder="Email Address*" 
                            value={formData.email} 
                            onChange={handleChange}
                            />
                            <input 
                            type="password" 
                            name="password" 
                            placeholder="Password*" 
                            value={formData.password} 
                            onChange={handleChange} />
                            
                            <div className="role-selection">
                                <p>Indicate your role:</p>
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
                            <button type="submit">Create</button>
                            {error && <p className="message error">{error.message}</p>}
                            {/* {error && <p className="error">{JSON.stringify(error)}</p>} */}
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


