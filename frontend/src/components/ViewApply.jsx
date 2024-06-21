import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './ViewApply.css';
        
const ViewApply = () => {
    const { jobId } = useParams();
    const navigate= useNavigate;
    const [jobDetails, setJobDetails] = useState(null);
    const [companyDetails, setCompanyDetails] = useState(null);
    const [error, setError] = useState(null);
        

    // useEffect(() => {
    //     // Check login status
    //     axios.get('http://127.0.0.1:8000/api/check_login_status', { withCredentials: true })
    //         .then(response => {
    //             if (response.data.status !== 'logged_in') {
    //                 navigate('/signin');
    //             }
    //         })
    //         .catch(error => {
    //             console.error('Error checking login status:', error);
    //             navigate('/signin');
    //         });
    //     },);
    // // }, [history]);

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/viewapply/${jobId}/`)
        .then(response => {
            setJobDetails(response.data);
        })
        .catch(error => {
            console.error('Error fetching job details:', error);
            setError('Failed to load job details.');
        });
        }, [jobId]);
        useEffect(() => {
            if (jobDetails) {
                axios.get(`http://127.0.0.1:8000/company/${jobDetails.company_id}/`)
                    .then(response => {
                        setCompanyDetails(response.data);
                    })
                    .catch(error => {
                        console.error('Error fetching company details:', error);
                        setError('Failed to load company details.');
                    });
            }
        }, [jobDetails]);
            
        if (error) {
            return <p className="error-message">{error}</p>;
        }
            
        if (!jobDetails || !companyDetails) {
            return <p>Loading...</p>;
        }
            
        return (
            <div className="job-details-container">
                <div className="header">
                    <h1 className="job-details-title"><b>{jobDetails.job_title}</b></h1>
                </div>
                <div className="details-wrapper">
                    <div className="left">
                        <div className="job-detail job-description">
                            <span>Job Description:</span> {jobDetails.job_description}
                        </div>
                    </div>
                    <div className="right">
                        <div className="job-detail-box">
                            <div className="job-detail-container">
                                <div className="job-detail">
                                    <span>Company Name:</span> {companyDetails.name}
                                </div>
                                <div className="job-detail">
                                    <span>Industry:</span> {jobDetails.industry}
                                </div>
                                <div className="job-detail">
                                    <span>Location:</span> {jobDetails.location}
                                </div>
                                <div className="job-detail">
                                    <span>Employment Type:</span> {jobDetails.employment_type}
                                </div>
                                <div className="job-detail">
                                    <span>Posted on:</span> {jobDetails.jobpost_date}
                                </div>
                                <div className="job-detail">
                                    <span>Last Date to Apply:</span> {jobDetails.last_date}
                                </div>
                                <div className="mt-3">
                                    <a href='/apply' className="btn btn-primary">Apply+</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
};

export default ViewApply;