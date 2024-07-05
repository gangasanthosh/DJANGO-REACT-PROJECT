import 'bootstrap/dist/css/bootstrap.min.css';
import Cookies from 'js-cookie';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import jobImage from '../assets/images/MNCs/image7.png';
import axios from '../help/axios'; // Assuming you have axios installed
import './PostJob.css';

const PostJob = () => {
  const [formData, setFormData] = useState({
    jobTitle: '',
    jobDescription: '',
    industry: '',
    location: '',
    lastDate: '',
    employmentType: 'full time'
  });
  const [showModal, setShowModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Fetch email ID from cookies
    const email = Cookies.get('email');

    if (!email) {
      alert('No email found in cookies');
      return;
    }

    try {
      // Fetch recruiter ID
      const recruiterResponse = await axios.get(`http://127.0.0.1:8000/api/recruiters?email=${email}`);
      const recruiterId = recruiterResponse.data.id;

      // Fetch company ID
      const companyResponse = await axios.get(`http://127.0.0.1:8000/api/companies?recruiter_id=${recruiterId}`);
      const companyId = companyResponse.data.id;

      // Prepare job data
      const jobData = {
        jobTitle: formData.jobTitle,
        jobDescription: formData.jobDescription,
        industry: formData.industry,
        location: formData.location,
        jobPostDate: new Date().toISOString().split('T')[0], // Today's date in YYYY-MM-DD format
        lastDate: formData.lastDate,
        employmentType: formData.employmentType,
        recruiter: recruiterId,
        company: companyId
      };

      // Post job data
      await axios.post('http://127.0.0.1:8000/api/jobs', jobData);

      setSuccessMessage('Job posted successfully!');
      setShowModal(true);
    } catch (error) {
      console.error('Error posting job:', error);
      alert('Failed to post job');
    }
  };

  const handleOkClick = () => {
    setShowModal(false);
    navigate('/');
  };

  return (
    <div className="postjob-container">
      <img src={jobImage} alt="Job illustration" className="postjob-image" />
      <form className="postjob-form" onSubmit={handleSubmit}>
        <h1 className="postjob-title">Post a Job</h1>
        <label>Job Title</label>
        <input
          type="text"
          name="jobTitle"
          value={formData.jobTitle}
          onChange={handleChange}
          required
        />

        <label>Job Description</label>
        <textarea
          name="jobDescription"
          value={formData.jobDescription}
          onChange={handleChange}
          required
        />

        <label>Industry</label>
        <input
          type="text"
          name="industry"
          value={formData.industry}
          onChange={handleChange}
          required
        />

        <label>Location</label>
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          required
        />

        <label>Last Date</label>
        <input
          type="date"
          name="lastDate"
          value={formData.lastDate}
          onChange={handleChange}
          required
        />

        <label>Employment Type</label>
        <select
          name="employmentType"
          value={formData.employmentType}
          onChange={handleChange}
          required
        >
          <option value="full time">Full Time</option>
          <option value="part time">Part Time</option>
          <option value="hybrid">Hybrid</option>
          <option value="remote">Remote</option>
          <option value="internship">Internship</option>
          <option value="bonded">Bonded</option>
          <option value="Wfh">Work-from-Home</option>
        </select>

        <button type="submit" className="submit-button">Submit</button>
      </form>
      {showModal && (
        <div className="modal fade show" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
          <div className="modal-dialog modal-confirm">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title w-100">Success!</h4>
              </div>
              <div className="modal-body">
                <p className="text-center">{successMessage}</p>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-block"
                  style={{ backgroundColor: '#8436a8', color: '#fff' }}
                  onClick={handleOkClick}
                >
                  Okay
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostJob;
