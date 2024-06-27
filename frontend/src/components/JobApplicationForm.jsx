
import 'bootstrap/dist/css/bootstrap.min.css';
import Cookies from 'js-cookie';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import appimage from '../assets/images/application-image.jpg';
import './JobApplicationForm.css';

const JsApplicationForm = () => {
    const { jobId } = useParams();
    const [remarks, setRemarks] = useState('');
    const [file, setFile] = useState(null);
    const [cvPreviewUrl, setCvPreviewUrl] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();


    const handleRemarksChange = (event) => {
        setRemarks(event.target.value);
    };

    const handleFileChange = (event) => {
        
        const selectedFile = event.target.files[0];
        setFile(selectedFile);

        const reader = new FileReader();
        reader.onload = (e) => {
            setCvPreviewUrl(e.target.result);
        };
        reader.readAsDataURL(selectedFile);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const email = Cookies.get('email');
        if (!email) {
            alert('Email not found in local storage');
            return;
        }

        if (!file) {
            alert('Please upload a CV');
            return;
        }

        const formData = new FormData();
        formData.append('job_id', jobId);
        formData.append('email', email);
        formData.append('remarks', remarks);
        formData.append('resume', file);

        const url = 'http://localhost:8000/api/submit_application';
        console.log('Submitting to URL:', url);

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    Authorization: `Token ${Cookies.get('authToken')}`, // Corrected the header for token authentication
                },
                body: formData
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Application submitted:', data);
                setSuccessMessage('Your application has been succesfullt recorded!');
                setShowModal(true);
            } else {
                const errorData = await response.json();
                console.error('Error submitting application:', errorData);
                alert(`Error submitting application: ${errorData.error}`);
            }
        } catch (error) {
            console.error('Error submitting application:', error);
            alert('Error submitting application. Please try again.');
        }
    };
    const handleOkClick = () => {
        setShowModal(false);
        navigate('/searchjob');
    };
        

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6 d-flex justify-content-center align-items-center">
                    <img src={appimage} alt="app image" className="img-fluid rounded" />
                </div>
                <div className="col-md-6">
                    <form onSubmit={handleSubmit}>
                        <h1 className="mb-4"><b>Add CV for the Employer</b></h1>
                        <div className="form-group">
                            <label htmlFor="remarks">Remarks</label>
                            <textarea
                                name="remarks"
                                className="form-control"
                                id="remarks"
                                rows="3"
                                placeholder="Enter any remarks here"
                                required
                                value={remarks}
                                onChange={handleRemarksChange}
                            ></textarea>
                        </div>
                        <hr />
                        <div className="form-group mt-3 d-flex justify-content-between align-items-center">
                            <label className="mr-2">Upload your CV:</label>
                            <input
                                type="file"
                                name="file"
                                className="form-control-file"
                                required
                                onChange={handleFileChange}
                            />
                        </div>
                        <hr />
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                    {cvPreviewUrl && (
                        <div className="mt-3 d-flex justify-content-center">
                            <div className="text-center">
                                <p className="font-weight-bold">CV Preview:</p>
                                <img src={cvPreviewUrl} alt="CV Preview" className="img-fluid" style={{ maxWidth: '250px' }} />
                            </div>
                        </div>
                    )}
                </div>
            </div>
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

export default JsApplicationForm;
