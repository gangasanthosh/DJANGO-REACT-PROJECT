

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../help/axios';

const RecViewApplication = () => {
    const { jobId } = useParams(); // Extract jobId from URL parameters
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                if (!jobId) {
                    throw new Error('Job ID is not defined');
                }
                console.log(`Fetching applications for job ID: ${jobId}`);
                const response = await axios.get(`http://127.0.0.1:8000/api/applications/job/${jobId}`);
                console.log('Fetched Applications:', response.data);
                setApplications(response.data);
            } catch (error) {
                console.error('Error fetching applications:', error);
                setError('Error fetching applications. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchApplications();
    }, [jobId]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <h2>Applications for Job ID: {jobId}</h2>
            <ul>
                {applications.length > 0 ? (
                    applications.map(application => (
                        <li key={application.id}>
                            <p><strong>Applicant remarks:</strong> {application.remarks}</p>
                            <p><strong>Status:</strong> {application.status}</p>
                            {/* Add more details as needed */}
                        </li>
                    ))
                ) : (
                    <li>No applications found</li>
                )}
            </ul>
        </div>
    );
};

export default RecViewApplication;
