import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from '../help/axios';
import './ApplicationStatus.css';

const ApplicationStatus = () => {
    const [applications, setApplications] = useState([]);
    const email = Cookies.get('email');
    

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/applications/${email}/`)
            .then(response => {
                setApplications(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the applications!', error);
            });
    }, [email]);

    return (
        <div className="application-list">
            <table>
                <thead>
                    <tr>
                        <th>Job Name</th>
                        <th>Applied Date</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {applications.map(application => (
                        <tr key={application.id}>
                            <td>{application.job.job_title}</td>
                            <td>{application.applied_date}</td>
                            <td>{application.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className='button-container'>
            <Link to={`/jsinsight`} className="view-button">View Insight</Link>
            </div>
        </div>
    );
};

export default ApplicationStatus
