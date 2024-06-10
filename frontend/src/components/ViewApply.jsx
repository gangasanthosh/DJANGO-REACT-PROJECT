    //     import axios from 'axios';
    // import { useEffect, useState } from 'react';
    // import { useParams } from 'react-router-dom';

    //     const ViewApply = () => {
    //     const { jobId } = useParams();
    //     const [jobDetails, setJobDetails] = useState(null);
    //     const [error, setError] = useState(null);

    //     useEffect(() => {
    //         axios.get(`http://127.0.0.1:8000/api/job/${jobId}/`)
    //         console.log("done")
    //         .then(response => {
    //             setJobDetails(response.data);
    //         })
    //         .catch(error => {
    //             console.error('Error fetching job details:', error);
    //             setError('Failed to load job details.');
    //         });
    //     }, [jobId]);

    //     if (error) {
    //         return <p className="error-message">{error}</p>;
    //     }

    //     if (!jobDetails) {
    //         return <p>Loading...</p>;
    //     }

    //     // Render job details here
    //     return (
    //         <div>
    //         <h1>{jobDetails.job_title}</h1>
    //         {/* other job details */}
    //         </div>
    //     );
    //     };

    //     export default ViewApply;

import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
        
        const ViewApply = () => {
        const { jobId } = useParams();
        const [jobDetails, setJobDetails] = useState(null);
        const [error, setError] = useState(null);
        
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
        
        if (error) {
            return <p className="error-message">{error}</p>;
        }
        
        if (!jobDetails) {
            return <p>Loading...</p>;
        }
        
        return (
            <div>
            <h1>{jobDetails.job_title}</h1>
            {/* other job details */}
            </div>
        );
        };
        
        export default ViewApply;
        