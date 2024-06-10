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

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formBody = {
                ...formData,
                "user_auth_type": "username/password"
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
                            <input type="text" name="username" placeholder="Name" value={formData.username} onChange={handleChange} required />
                            <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} required />
                            <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
                            <div className="radio-buttons">
                                <p>Indicate your role:</p>
                                <div className="radio-option">
                                    <input type="radio" name="usertype" value="recruiter" id="recruiter" onChange={handleChange} required />
                                    <label htmlFor="recruiter">Recruiter</label>
                                </div>
                                <div className="radio-option">
                                    <input type="radio" name="usertype" value="jobseeker" id="jobSeeker" onChange={handleChange} required />
                                    <label htmlFor="jobSeeker">Job Seeker</label>
                                </div>
                            </div>
                            <button type="submit">Create</button>
                            {error && <p className="error">{JSON.stringify(error)}</p>}
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


