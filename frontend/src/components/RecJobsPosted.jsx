import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from '../help/axios';
import './RecJobsPosted.css';

const RecJobsPosted = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const perPage = 3;

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
            await axios.delete(`http://127.0.0.1:8000/api/job/${jobId}`);
            setJobs(jobs.filter(job => job.id !== jobId));
            console.log(`Job ${jobId} deleted successfully.`);
        } catch (error) {
            console.error('Error deleting job:', error);
        }
    };

    const totalPages = Math.ceil(jobs.length / perPage);
    const indexOfLastJob = currentPage * perPage;
    const indexOfFirstJob = indexOfLastJob - perPage;
    const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="jobs-container">
            <h1>Jobs Posted by You</h1>
            <div className='mt-3 mb-3'>
                <ul className="job-list">
                    {currentJobs.length > 0 ? (
                        currentJobs.map(job => (
                            <li key={job.id} className="job-item">
                                <div>
                                    <div className="job-title">{job.job_title}</div>
                                    <div className="job-details">
                                        <p><strong>Location:</strong> {job.location}</p>
                                        <p><strong>Posted on:</strong> {job.jobpost_date}</p>
                                        <p><strong>Employment Type:</strong> {job.employment_type}</p>
                                    </div>
                                    <div className="button-container">
                                        <Link to={`/viewjob/${job.id}`} className="view-button">View details</Link>
                                        <Link to={`/recinsight/${job.id}`} className="view-button">View Insight</Link>
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
                <div className="pagination">
                    {Array.from({ length: totalPages }, (_, index) => (
                        <button key={index + 1} onClick={() => handlePageChange(index + 1)}>{index + 1}</button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default RecJobsPosted;
