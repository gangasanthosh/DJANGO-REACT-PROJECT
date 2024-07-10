import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";
import React, { useEffect, useState } from "react";
import axios from "../help/axios";
import "./HomeJobCards.css";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/job/?max_likes=6')
      .then(response => {
        setJobs(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the jobs!', error);
      });
  }, []);

  const handleLike = (jobId) => {
    setJobs(jobs.map(job => 
      job.id === jobId ? { ...job, liked: !job.liked } : job
    ));
  };

  return (
    <div className="container mt-5 pt-4">
      <div className="row align-items-end mb-4 pb-2">
        <div className="col-md-8">
          <div className="section-title text-center text-md-start">
            <h1 className="title mb-4">Find the perfect jobs</h1>
            <h3 className="text-muted mb-0 para-desc">
              Growth takes place outside your comfort zone
            </h3>
          </div>
        </div>

        <div className="col-md-4 mt-4 mt-sm-0 d-none d-md-block">
          <div className="text-center text-md-end">
            <div className="view-more-container">
              <a href="/searchjob" className="text-primary">View more Jobs</a>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        {jobs.map((job) => (
          <div key={job.id} className="col-lg-4 col-md-6 col-12 mt-4 pt-2">
            <div className="card border-0 bg-light rounded shadow">
              <div className="card-body p-4">
                <span className="badge rounded-pill float-md-end mb-3 mb-sm-0" style={{ backgroundColor: '#DFDDDE', color: '#000000' }}>{job.employment_type}</span>
                <h5 className="job-title" style={{ color: 'black', textAlign: 'center' }}>{job.job_title}</h5>
                <div className="mt-3">
                  <span className="text-muted d-block">
                    <i className="fa fa-map-marker" aria-hidden="true"></i>
                    {job.location}
                  </span>
                </div>
                <div className="mt-3 d-flex justify-content-between align-items-center">
                  <a href={`/viewjob/${job.id}`} className="btn btn-primary">View Details & Apply</a>
                  <button 
                    className={`like-button ${job.liked ? 'liked' : ''}`} 
                    onClick={() => handleLike(job.id)}
                  >
                    <i className={`fa ${job.liked ? 'fa-heart' : 'fa-heart-o'}`} aria-hidden="true"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}

        <div className="col-12 mt-4 pt-2 d-block d-md-none text-center">
          <div className="view-more-container">
            <a href="/searchjob" className="btn btn-primary">
              View more Jobs
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Jobs;
