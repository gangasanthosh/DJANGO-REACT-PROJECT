import React from 'react';
import { useNavigate } from 'react-router-dom';
import hiringImage from '../assets/images/MNCs/image6.jpg';
import './Intro.css';



const Intro = () => {
  const navigate = useNavigate();
  return (
    <div className="recruiter-container">
      <img 
        src={hiringImage} 
        alt="We are hiring" 
        className="recruiter-photo"
      />
      <div className="recruiter-content">
        <h1 className="recruiter-main-quote">
          Hire the Best People with JobStack
        </h1>
        <blockquote className="recruiter-quote">
          "Finding the right talent is crucial for success."
        </blockquote>
        <button className="post-job-button" onClick={() => navigate('/postjob')}>Post a Job</button>
      </div>
    </div>
  );
};

export default Intro;
