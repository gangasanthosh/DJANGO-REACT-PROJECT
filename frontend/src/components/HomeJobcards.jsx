import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";
import React, { useEffect, useState } from "react";
import axios from "../help/axios";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    // Fetch jobs from the API
    axios.get('http://localhost:8000/api/job/?max_likes=6')
      .then(response => {
        setJobs(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the jobs!', error);
      });
  }, []);

  return (
    <>
      <style>
        {`
          body { margin-top: 20px; }
          .shadow {
            box-shadow: 0 0 3px rgb(134 54 168 / 20%) !important;
          }
          .rounded {
            border-radius: 5px !important;
          }
          .bg-light {
            background-color: #f7f8fa !important;
          }
          .bg-primary, .btn-primary, .btn-outline-primary:hover, .btn-outline-primary:focus,
          .btn-outline-primary:active, .btn-outline-primary.active, .btn-outline-primary.focus,
          .btn-outline-primary:not(:disabled):not(.disabled):active, .badge-primary,
          .nav-pills .nav-link.active, .pagination .active a, .custom-control-input:checked ~
          .custom-control-label:before, #preloader #status .spinner > div, .social-icon li a:hover,
          .back-to-top:hover, .back-to-home a, ::selection, #topnav .navbar-toggle.open span:hover,
          .owl-theme .owl-dots .owl-dot.active span, .owl-theme .owl-dots.clickable .owl-dot:hover span,
          .watch-video a .play-icon-circle, .sidebar .widget .tagcloud > a:hover, .flatpickr-day.selected,
          .flatpickr-day.selected:hover, .tns-nav button.tns-nav-active,
          .form-check-input.form-check-input:checked {
            background-color: #8436a8 !important;
          }
          .badge {
            padding: 5px 8px;
            border-radius: 3px;
            letter-spacing: 0.5px;
            font-size: 12px;
          }
          .btn-primary, .btn-outline-primary:hover, .btn-outline-primary:focus, .btn-outline-primary:active,
          .btn-outline-primary.active, .btn-outline-primary.focus,
          .btn-outline-primary:not(:disabled):not(.disabled):active {
            box-shadow: 0 3px 7px rgb(134 54 168/ 50%) !important;
          }
          .btn-primary, .btn-outline-primary, .btn-outline-primary:hover, .btn-outline-primary:focus,
          .btn-outline-primary:active, .btn-outline-primary.active, .btn-outline-primary.focus,
          .btn-outline-primary:not(:disabled):not(.disabled):active, .bg-soft-primary .border,
          .alert-primary, .alert-outline-primary, .badge-outline-primary, .nav-pills .nav-link.active,
          .pagination .active a, .form-group .form-control:focus, .form-group .form-control.active,
          .custom-control-input:checked ~ .custom-control-label:before,
          .custom-control-input:focus ~ .custom-control-label::before, .form-control:focus,
          .social-icon li a:hover, #topnav .has-submenu.active.active .menu-arrow,
          #topnav.scroll .navigation-menu > li:hover > .menu-arrow, #topnav.scroll .navigation-menu > li.active > .menu-arrow,
          #topnav .navigation-menu > li:hover > .menu-arrow, .flatpickr-day.selected,
          .flatpickr-day.selected:hover, .form-check-input:focus, .form-check-input.form-check-input:checked,
          .container-filter li.active, .container-filter li:hover {
            border-color: #8436a8 !important;
          }
          .btn {
            padding: 8px 20px;
            outline: none;
            text-decoration: none;
            font-size: 16px;
            letter-spacing: 0.5px;
            transition: all 0.3s;
            font-weight: 600;
            border-radius: 5px;
          }
          .btn-primary {
            background-color: #8436a8 !important;
            border: 1px solid #8436a8 !important;
            color: #fff !important;
            box-shadow: 0 3px 7px rgb(134 54 168 / 50%);
          }
          a {
            text-decoration: none;
          }
          .view-more-container {
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          .view-more-container a {
            color: #8436a8 !important;
            text-decoration: underline !important;
          }
          .card {
            height: 100%; /* Ensure all cards have the same height */
          }
          .card .card-body {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
          }
          .card .btn-primary {
            margin-top: auto; /* Push the button to the bottom of the card */
          }
        
          .job-title {
            font-size: 24px; /* Increase the font size of job title */
            font-weight: bold; /* Make the job title bold */
          }
          .section-title .title {
            font-size: 3rem; /* Larger size for the h1 element */
          }
        
          .section-title .para-desc {
            font-size: 1.5rem; /* Larger size for the h3 element */
          }
        `}
      </style>

      <div className="container mt-5 pt-4">
        <div className="row align-items-end mb-4 pb-2">
          <div className="col-md-8">
            <div className="section-title text-center text-md-start">
              <h1 className="title mb-4">Find the perfect jobs</h1>
              <h3 className="text-muted mb-0 para-desc">
                Growth take place outside your comfort zone
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
                  <h5 className="job-title">{job.job_title}</h5>
                  <div className="mt-3">
                    <span className="text-muted d-block">
                      <i className="fa fa-map-marker" aria-hidden="true"></i>
                      {job.location}
                    </span>
                  </div>
                  <div className="mt-3">
                    <a href={`/viewjob/${job.id}`} className="btn btn-primary">View Details & Apply</a>
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
    </>
  );
};

export default Jobs;
