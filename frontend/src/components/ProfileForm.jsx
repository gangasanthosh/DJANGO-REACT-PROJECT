import Cookies from 'js-cookie';
import React, { useState } from 'react';
import './ProfileForm.css';

const validateInput = (name, value) => {
  let error = '';

  switch (name) {
    case 'firstName':
    case 'lastName':
      if (!/^[a-zA-Z]+$/.test(value)) {
        error = 'Only letters are allowed';
      }
      break;
    case 'contactNumber':
      if (!/^\d{10}$/.test(value)) {
        error = 'Must be a 10-digit number';
      }
      break;
    case 'location':
    case 'fieldOfStudy':
    case 'institution':
    case 'jobTitle':
      if (/[^a-zA-Z\s]/.test(value)) {
        error = 'No special characters allowed';
      }
      break;
    case 'email':
      if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)) {
        error = 'Invalid email format';
      }
      break;
    case 'password':
      if (value.length < 8) {
        error = 'Password must be at least 8 characters long';
      }
      break;
    default:
      break;
  }

  return error;
};

const UserDetails = ({ formData, handleInputChange, handleSave, errors }) => {
  return (
    <section className="user-details">
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
          Fresher:
          <input
            type="checkbox"
            name="isFresher"
            checked={formData.isFresher}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Profile Description:
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
          />
        </label>
        <button type="button" onClick={() => handleSave('Personal Info')}>
          Save
        </button>
      </form>
    </section>
  );
};

const UserEducation = ({ formData, handleInputChange, handleSave, errors }) => {
  return (
    <section className="user-education">
      <h2>Education</h2>
      <form>
        <label>
          Education Level:
          <select name="educationLevel" value={formData.educationLevel} onChange={handleInputChange}>
            <option value="10th">10th</option>
            <option value="12th">12th</option>
            <option value="Diploma">Diploma</option>
            <option value="UG">Undergraduate</option>
            <option value="PGDM">PGDM</option>
            <option value="PG">Postgraduate</option>
            <option value="PhD">PhD</option>
            <option value="Certificate Courses">Certificate Courses</option>
            <option value="Other">Other</option>
          </select>
        </label>
        <label>
          Field of Study:
          <input
            type="text"
            name="fieldOfStudy"
            value={formData.fieldOfStudy}
            onChange={handleInputChange}
          />
          {errors.fieldOfStudy && <span className="error">{errors.fieldOfStudy}</span>}
        </label>
        <label>
          Institution:
          <input
            type="text"
            name="institution"
            value={formData.institution}
            onChange={handleInputChange}
          />
          {errors.institution && <span className="error">{errors.institution}</span>}
        </label>
        <label>
          Status:
          <select name="status" value={formData.status} onChange={handleInputChange}>
            <option value="Completed">Completed</option>
            <option value="Pursuing">Pursuing</option>
            <option value="Interrupted">Interrupted</option>
          </select>
        </label>
        <label>
          Start Date:
          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleInputChange}
          />
        </label>
        <label>
          End Date:
          <input
            type="date"
            name="endDate"
            value={formData.endDate}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Grade:
          <input
            type="text"
            name="grade"
            value={formData.grade}
            onChange={handleInputChange}
          />
        </label>
        <button type="button" onClick={() => handleSave('Education')}>
          Save
        </button>
      </form>
    </section>
  );
};

const UserExperience = ({ formData, handleInputChange, handleSave, errors }) => {
  return (
    <section className="user-experience">
      <h2>Experience</h2>
      <form>
        <label>
          Job Title:
          <input
            type="text"
            name="jobTitle"
            value={formData.jobTitle}
            onChange={handleInputChange}
          />
          {errors.jobTitle && <span className="error">{errors.jobTitle}</span>}
        </label>
        <label>
          Company:
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleInputChange}
          />
          {errors.company && <span className="error">{errors.company}</span>}
        </label>
        <label>
          Start Date:
          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleInputChange}
          />
        </label>
        <label>
          End Date:
          <input
            type="date"
            name="endDate"
            value={formData.endDate}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Responsibilities:
          <textarea
            name="responsibilities"
            value={formData.responsibilities}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Description:
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
          />
        </label>
        <button type="button" onClick={() => handleSave('Experience')}>
          Save
        </button>
      </form>
    </section>
  );
};

const UserAccount = ({ formData, handleInputChange, handleSave, handleDelete, errors }) => {
  return (
    <section className="user-account">
      <h2>Account</h2>
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
        <button type="button" onClick={() => handleSave('Account')}>
          Save
        </button>
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
    location: '',
    description: '',
    isFresher: false,
    educationLevel: '',
    fieldOfStudy: '',
    status: '',
    institution: '',
    startDate: '',
    endDate: '',
    grade: '',
    email: '',
    password: '',
    jobTitle: '',
    company: '',
    responsibilities: '',
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const inputValue = type === 'checkbox' ? checked : value;

    setFormData({
      ...formData,
      [name]: inputValue,
    });

    setErrors({
      ...errors,
      [name]: validateInput(name, inputValue),
    });
  };

  const handleSave = (section) => {
    alert(`Saved ${section}`);
    console.log('Form Data:', formData);
    Cookies.set('formData', JSON.stringify(formData));
  };

  const handleDelete = () => {
    const confirmDelete = window.confirm('Are you sure you want to delete your account?');
    if (confirmDelete) {
      console.log('Account Deleted');
      // Perform the account deletion logic here
    }
  };

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <UserDetails
        formData={formData}
        handleInputChange={handleInputChange}
        handleSave={handleSave}
        errors={errors}
      />
      <UserEducation
        formData={formData}
        handleInputChange={handleInputChange}
        handleSave={handleSave}
        errors={errors}
      />
      <UserExperience
        formData={formData}
        handleInputChange={handleInputChange}
        handleSave={handleSave}
        errors={errors}
      />
      <UserAccount
        formData={formData}
        handleInputChange={handleInputChange}
        handleSave={handleSave}
        handleDelete={handleDelete}
        errors={errors}
      />
    </div>
  );
};

export default Dashboard;
