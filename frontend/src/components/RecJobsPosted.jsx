import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from '../help/axios';
import './RecJobsPosted.css'; // Import your CSS file

const RecJobsPosted = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const email = Cookies.get('email');
                if (!email) {
                    alert('No email found in cookies');
                    return;
                }

                const recruiterResponse = await axios.get(`http://127.0.0.1:8000/api/recruiters?email=${email}`);
                const recruiterId = recruiterResponse.data.id;

                const response = await axios.get(`http://127.0.0.1:8000/api/jobsbyuser?recruiterId=${recruiterId}`);
                console.log('Fetched Jobs:', response.data);
                setJobs(response.data);
            } catch (error) {
                console.error('Error fetching jobs:', error);
                setError('Error fetching jobs');
            } finally {
                setLoading(false);
            }
        };

        fetchJobs();
    }, []);

    const handleDeleteJob = async (jobId) => {
        try {
            // Assuming you have an API endpoint for deleting jobs
            await axios.delete(`http://127.0.0.1:8000/api/job/${jobId}`);
            // Update state to remove the deleted job from the list
            setJobs(jobs.filter(job => job.id !== jobId));
            console.log(`Job ${jobId} deleted successfully.`);
        } catch (error) {
            console.error('Error deleting job:', error);
            // Handle error state if needed
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="jobs-container">
            <h2>Jobs Posted by You</h2>
            <ul className="job-list">
                {jobs.length > 0 ? (
                    jobs.map(job => (
                        <li key={job.id} className="job-item">
                            <div>
                                <div className="job-title">{job.job_title}</div>
                                <div className="job-details">
                                    <p><strong>Industry:</strong> {job.industry}</p>
                                    <p><strong>Location:</strong> {job.location}</p>
                                    <p><strong>Posted:</strong> {job.jobpost_date}</p>
                                    <p><strong>Last Date:</strong> {job.last_date}</p>
                                    <p><strong>Employment Type:</strong> {job.employment_type}</p>
                                    <div className="job-description">
                                        <p><strong>Description:</strong> {job.job_description}</p>
                                    </div>
                                </div>
                                <div className="button-container">
                                    <Link to={`/view-application/${job.id}`} className="view-button">View Application</Link>
                                    <button className="delete-button" onClick={() => handleDeleteJob(job.id)}>Delete</button>
                                </div>
                            </div>
                        </li>
                    ))
                ) : (
                    <li>No jobs found</li>
                )}
            </ul>
        </div>
    );
};

export default RecJobsPosted;
