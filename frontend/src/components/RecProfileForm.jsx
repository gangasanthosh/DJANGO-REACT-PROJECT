import Cookies from 'js-cookie';
import React, { useEffect, useRef, useState } from 'react';
import axios from '../help/axios';
import './ProfileForm.css';

const validateInput = (name, value) => {
    let error = '';

    switch (name) {
        case 'firstName':
        case 'lastName':
        case 'companyName':
        case 'industry':
        case 'headquarters':
            if (!/^[a-zA-Z\s]+$/.test(value)) {
                error = 'Only letters and spaces are allowed';
            }
            break;
        case 'contactNumber':
        case 'phoneNumber':
            if (!/^\d{10}$/.test(value)) {
                error = 'Must be a 10-digit number';
            }
            break;
        case 'email':
            if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)) {
                error = 'Invalid email format';
            }
            break;
        default:
            break;
    }

    return error;
};

const RecruiterDetails = ({ formData, handleInputChange, handleSave, errors }) => {
    return (
        <section className="recruiter-details">
            <h2>Personal Info</h2>
            <form>
                <label>
                    First Name:
                    <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                    />
                    {errors.firstName && <span className="error">{errors.firstName}</span>}
                </label>
                <label>
                    Last Name:
                    <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                    />
                    {errors.lastName && <span className="error">{errors.lastName}</span>}
                </label>
                <label>
                    Contact Number:
                    <input
                        type="text"
                        name="contactNumber"
                        value={formData.contactNumber}
                        onChange={handleInputChange}
                    />
                    {errors.contactNumber && <span className="error">{errors.contactNumber}</span>}
                </label>
                <label>
                    Industry:
                    <input
                        type="text"
                        name="industry"
                        value={formData.industry}
                        onChange={handleInputChange}
                    />
                    {errors.industry && <span className="error">{errors.industry}</span>}
                </label>
                <label>
                    Location:
                    <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                    />
                    {errors.location && <span className="error">{errors.location}</span>}
                </label>
                <label>
                    Gender:
                    <select name="gender" value={formData.gender} onChange={handleInputChange}>
                        <option value="M">Male</option>
                        <option value="F">Female</option>
                        <option value="O">Other</option>
                    </select>
                </label>
                <button type="button" onClick={() => handleSave('recruiter')}>
                    Save
                </button>
            </form>
        </section>
    );
};

const CompanyProfile = ({ formData, handleInputChange, handleSave, errors }) => {
    return (
        <section className="company-profile">
            <h2>Company Profile</h2>
            <form>
                <label>
                    Company Name:
                    <input
                        type="text"
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleInputChange}
                    />
                    {errors.companyName && <span className="error">{errors.companyName}</span>}
                </label>
                <label>
                    Industry:
                    <input
                        type="text"
                        name="companyIndustry"
                        value={formData.companyIndustry}
                        onChange={handleInputChange}
                    />
                    {errors.companyIndustry && <span className="error">{errors.companyIndustry}</span>}
                </label>
                <label>
                    Email:
                    <input
                        type="email"
                        name="companyEmail"
                        value={formData.companyEmail}
                        onChange={handleInputChange}
                    />
                    {errors.companyEmail && <span className="error">{errors.companyEmail}</span>}
                </label>
                <label>
                    Phone Number:
                    <input
                        type="text"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleInputChange}
                    />
                    {errors.phoneNumber && <span className="error">{errors.phoneNumber}</span>}
                </label>
                <label>
                    Website:
                    <input
                        type="text"
                        name="website"
                        value={formData.website}
                        onChange={handleInputChange}
                    />
                    {errors.website && <span className="error">{errors.website}</span>}
                </label>
                <label>
                    Headquarters:
                    <input
                        type="text"
                        name="headquarters"
                        value={formData.headquarters}
                        onChange={handleInputChange}
                    />
                    {errors.headquarters && <span className="error">{errors.headquarters}</span>}
                </label>
                <label>
                    Description:
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                    />
                </label>
                <button type="button" onClick={() => handleSave('companyProfile')}>
                    Save
                </button>
            </form>
        </section>
    );
};

const AccountSettings = ({ formData, handleInputChange, handleDelete, errors }) => {
    return (
        <section className="account-settings">
            <h2>Account Settings</h2>
            <form>
                <label>
                    Email:
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                    />
                    {errors.email && <span className="error">{errors.email}</span>}
                </label>
                <label>
                    Password:
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                    />
                    {errors.password && <span className="error">{errors.password}</span>}
                </label>
                <button type="button" className="delete-button" onClick={handleDelete}>
                    Delete Account
                </button>
            </form>
        </section>
    );
};

const Dashboard = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        contactNumber: '',
        gender: '',
        location: '',
        industry: '',
        companyName: '',
        companyIndustry: '',
        companyEmail: '',
        phoneNumber: '',
        website: '',
        headquarters: '',
        description: '',
        email: '',
        password: '',
    });

    const [errors, setErrors] = useState({});
    const [recruiterId, setRecruiterId] = useState(null);
    const recruiterIdRef = useRef(null);
    const [loading, setLoading] = useState(true);
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const fetchUserId = async () => {
            const email = Cookies.get('email');
            if (email) {
                try {
                    const response = await axios.get(`http://127.0.0.1:8000/api/get-user-id?email=${email}`);
                    if (response.data && response.data.userId) {
                        setUserId(response.data.userId);
                    } else {
                        console.error('User ID not found for email:', email);
                    }
                } catch (error) {
                    console.error('Error fetching User ID:', error);
                }
            } else {
                console.log('Email not found in cookies');
            }
        };

        const fetchRecruiterId = async () => {
            const email = Cookies.get('email');
            if (email) {
                try {
                    const response = await axios.get(`http://127.0.0.1:8000/api/recruiters?email=${email}`);
                    setRecruiterId(response.data.id);
                    recruiterIdRef.current = response.data.id;
                } catch (error) {
                    console.error('Error fetching Recruiter ID:', error);
                }
            } else {
                console.log('Email not found in cookies');
            }
        };

        const fetchData = async () => {
            await Promise.all([fetchUserId(), fetchRecruiterId()]);
            setLoading(false);
        };

        fetchData();
    }, []);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        const inputValue = type === 'checkbox' ? checked : value;

        const error = validateInput(name, inputValue);
        setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));

        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: inputValue,
        }));
    };

    const handleSave = async (section) => {
        if (!recruiterIdRef.current) {
            alert('Recruiter ID is not set');
            return;
        }

        try {
            let payload = {};
            let url = '';

            if (section === 'recruiter') {
                payload = {
                    name: formData.firstName,
                    lname: formData.lastName,
                    contact_no: formData.contactNumber,
                    industry: formData.industry,
                    location: formData.location,
                    gender: formData.gender,
                    id: recruiterIdRef.current,
                    user: userId,
                };
                url = 'http://127.0.0.1:8000/api/save_recruiter/';
            } else if (section === 'companyProfile') {
                payload = {
                    name: formData.companyName,
                    recruiter: recruiterIdRef.current,
                    industry: formData.companyIndustry,
                    email: formData.companyEmail,
                    phn_no: formData.phoneNumber,
                    website: formData.website,
                    headquarters: formData.headquarters,
                    description: formData.description
                };
                url = 'http://127.0.0.1:8000/api/save_company/';
            }

            Object.keys(payload).forEach((key) => {
                if (payload[key] === '') {
                    delete payload[key];
                }
            });

            const response = await axios.post(url, payload);
            console.log('Saved successfully:', response.data);
            alert('Details saved successfully');
        } catch (error) {
            if (error.response && error.response.data && error.response.data.user) {
                alert(error.response.data.user[0]); // Display the error message from the backend
            } else {
                console.error('Error saving details:', error.response.data);
                alert('An error occurred while saving details');
            }
        }
    };

    const handleDelete = async () => {
        if (!recruiterIdRef.current) {
            alert('Recruiter ID is not set');
            return;
        }

        try {
            await axios.delete(`http://127.0.0.1:8000/api/delete_recruiter/${recruiterIdRef.current}`);
            alert('Account deleted successfully');
        } catch (error) {
            console.error('Error deleting account:', error);
            alert('An error occurred while deleting the account');
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="dashboard">
            <RecruiterDetails
                formData={formData}
                handleInputChange={handleInputChange}
                handleSave={handleSave}
                errors={errors}
            />
            <CompanyProfile
                formData={formData}
                handleInputChange={handleInputChange}
                handleSave={handleSave}
                errors={errors}
            />
            <AccountSettings
                formData={formData}
                handleInputChange={handleInputChange}
                handleDelete={handleDelete}
                errors={errors}
            />
        </div>
    );
};

export default Dashboard;
