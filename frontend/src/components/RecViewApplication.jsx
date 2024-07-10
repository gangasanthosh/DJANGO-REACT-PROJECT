
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../help/axios';
import './RecViewApplication.css';

const RecViewApplication = () => {
    const { jobId } = useParams();
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [updatedApplications, setUpdatedApplications] = useState([]);

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

    useEffect(() => {
        fetchApplications();
    }, [jobId]);

    const handleStatusChange = (applicationId, newStatus) => {
        const updatedApps = applications.map(app => {
            if (app.id === applicationId) {
                return { ...app, status: newStatus };
            }
            return app;
        });
        setApplications(updatedApps);
        setUpdatedApplications(updatedApps);
    };

    const handleSave = async () => {
        try {
            await Promise.all(updatedApplications.map(async app => {
                const response = await axios.patch(`http://127.0.0.1:8000/api/application/${app.id}/update_status/`, { status: app.status });
                console.log('Updated Status:', response.data);
            }));
            alert('Status updated successfully!');

            fetchApplications();
        } catch (error) {
            console.error('Error updating status:', error);
            alert('Failed to update status. Please try again.');
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <h2 className='mt-3 mb-3'><b>Applications</b></h2>
            <table className="application-table">
                <thead>
                    <tr>
                        <th>Remarks</th>
                        <th>Status</th>
                        <th>Applied Date</th>
                        <th>Resume</th>
                    </tr>
                </thead>
                <tbody>
                    {applications.length > 0 ? (
                        applications.map(application => (
                            <tr key={application.id}>
                                <td>{application.remarks}</td>
                                <td>
                                    <select
                                        value={application.status}
                                        onChange={(e) => handleStatusChange(application.id, e.target.value)}
                                    >
                                        <option value="Applied">Applied</option>
                                        <option value="Pending">Pending</option>
                                        <option value="Reviewed">Reviewed</option>
                                        <option value="Under Consideration">Under Consideration</option>
                                        <option value="Interviewing">Interviewing</option>
                                        <option value="In Progress">In Progress</option>
                                        <option value="Rejected">Rejected</option>
                                        <option value="Hired">Hired</option>
                                        <option value="Closed">Closed</option>
                                    </select>
                                </td>
                                <td>{application.applied_date}</td>
                                <td><a href={`http://127.0.0.1:8000${application.resume_path}`} target="_blank" rel="noopener noreferrer">View Resume</a></td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4">No applications found</td>
                        </tr>
                    )}
                </tbody>
            </table>
            <button onClick={handleSave} className="save-button">Save Changes</button>
        </div>
    );
};

export default RecViewApplication;

