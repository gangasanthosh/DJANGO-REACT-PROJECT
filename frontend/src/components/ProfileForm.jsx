import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import axios from '../help/axios';
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
        <label>
          Gender:
          <select name="gender" value={formData.gender} onChange={handleInputChange} className='form-control'>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </label>
        <label>
          Date of Birth:
          <input type="date" name="dob" value={formData.dob} onChange={handleInputChange} />
        </label>
        <button type="button" onClick={() => handleSave('jobseeker')}>
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
        <button type="button" onClick={() => handleSave('education')}>
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
        <button type="button" onClick={() => handleSave('experience')}>
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
    gender:'',
    dob:'',
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
  const [educations, setEducations] = useState([{}]);
  const [experiences, setExperiences] = useState([{}]);
  const [jobSeekerId, setJobSeekerId] = useState(null);

  useEffect(() => {
    const fetchJobSeekerId = async () => {
      const email = Cookies.get('email');
      if (email) {
        try {
          const response = await axios.get(`http://127.0.0.1:8000/api/jobseekerid?email=${email}`);
          setJobSeekerId(response.data.jobseekerId);
          console.log("fetched jobseekerId and saved", response.data)
        } catch (error) {
          console.error('Error fetching JobSeeker ID:', error);
        }
      }
    };
    fetchJobSeekerId();
  }, []);

  const handleInputChange = (e, index, type) => {
    const { name, value, type: inputType, checked } = e.target;
    const inputValue = inputType === 'checkbox' ? checked : value;

    if (type === 'education') {
      const newEducations = [...educations];
      newEducations[index][name] = inputValue;
      setEducations(newEducations);
    } else if (type === 'experience') {
      const newExperiences = [...experiences];
      newExperiences[index][name] = inputValue;
      setExperiences(newExperiences);
    } else {
      setFormData({
        ...formData,
        [name]: inputValue,
      });
    }

    setErrors({
      ...errors,
      [name]: validateInput(name, inputValue),
    });
  };


  const handleSave = async (section, index) => {
    if (!jobSeekerId) { // Use jobSeekerId here
      alert('Jobseeker ID is not set');
      return;
    }
  
    try {
      let payload = {};
      let url = '';
  
      if (section === 'jobseeker') {
        payload = {
          ...formData,
          user: jobSeekerId, // Use jobSeekerId here
        };
        url = 'http://127.0.0.1:8000/api/save_jobseeker';
      } else if (section === 'education') {
        payload = {
          ...educations[index],
          job_seeker: jobSeekerId, // Use jobSeekerId here
        };
        url = 'http://127.0.0.1:8000/api/save_education';
      } else if (section === 'experience') {
        payload = {
          ...experiences[index],
          job_seeker: jobSeekerId, // Use jobSeekerId here
        };
        url = 'http://127.0.0.1:8000/api/save_experience';
      }
  
      // Remove keys with empty string values
      Object.keys(payload).forEach((key) => {
        if (payload[key] === '') {
          payload[key] = null;
        }
      });
  
      const response = await axios.post(url, payload);
      alert(`Saved ${section}`);
      console.log('Form Data:', response.data);
    } catch (error) {
      console.error('Error saving data:', error);
      alert(`Error saving ${section}`);
    }
  };
  

  const handleAddEducation = () => setEducations([...educations, {}]);
  const handleAddExperience = () => setExperiences([...experiences, {}]);

  const handleDelete = async () => {
    const confirmDelete = window.confirm('Are you sure you want to delete your account?');
    if (confirmDelete) {
      // Perform the account deletion logic here
    }
  };

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <UserDetails formData={formData} handleInputChange={handleInputChange} handleSave={handleSave} errors={errors} />

      {educations.map((education, index) => (
        <UserEducation key={index} formData={education} handleInputChange={(e) => handleInputChange(e, index, 'education')} handleSave={handleSave} errors={errors} />
      ))}
      <button type="button" onClick={handleAddEducation} className='mt-3 mb-3'>Add Education</button>

      {experiences.map((experience, index) => (
        <UserExperience key={index} formData={experience} handleInputChange={(e) => handleInputChange(e, index, 'experience')} handleSave={handleSave} errors={errors} />
      ))}
      <button type="button" onClick={handleAddExperience} className='mt-3 mb-3'>Add Experience</button>
      
      <UserAccount formData={formData} handleInputChange={handleInputChange} handleSave={handleSave} handleDelete={handleDelete} errors={errors} />
    </div>
  );
};

export default Dashboard;
