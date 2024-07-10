

// import React, { useEffect, useState } from 'react';
// import leftImage from '../assets/images/left-image.jpg';
// import axios from '../help/axios';
// import './JobSearch.css';

// const JsSearchFilter = () => {
//     const [locations, setLocations] = useState([]);
//     const [jobs, setJobs] = useState([]);
//     const [industrys, setIndustrys] = useState([]);
//     const [searchParams, setSearchParams] = useState({
//         jobTitle: '',
//         location: '',
//         industry: ''
//     });
//     const [searchResults, setSearchResults] = useState([]);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         axios.get('http://127.0.0.1:8000/api/job/')
//             .then(response => {
//                 const location = response.data.map(job => job.location);
//                 setLocations(location);
//             })
//             .catch(error => {
//                 console.error('Error fetching locations:', error);
//                 setError('Failed to load locations.');
//             });
        
//         axios.get('http://127.0.0.1:8000/api/job/')
//             .then(response => {
//                 const job_titles = response.data.map(job => job.job_title);
//                 setJobs(job_titles);
//             })
//             .catch(error => {
//                 console.error('Error fetching job titles:', error);
//                 setError('Failed to load job titles.');
//             });
        
//         axios.get('http://127.0.0.1:8000/api/job/')
//             .then(response => {
//                 const industrys = response.data.map(job => job.industry);
//                 setIndustrys(industrys);
//             })
//             .catch(error => {
//                 console.error('Error fetching industrys:', error);
//                 setError('Failed to load industrys.');
//             });
//     }, []);

//     const handleSearch = () => {
//         const query = `job_title=${searchParams.jobTitle}&location=${searchParams.location}&industry=${searchParams.industry}`;
//         axios.get(`http://127.0.0.1:8000/api/search/?${query}`)
//             .then(response => {
//                 setSearchResults(response.data);
//             })
//             .catch(error => {
//                 console.error('Error fetching search results:', error);
//                 setError('Failed to fetch search results.');
//             });
//     };

//     const handleLike = (jobId) => {
//         setSearchResults(searchResults.map(result => 
//             result.id === jobId ? { ...result, liked: !result.liked } : result
//         ));
//     };

//     return (
//         <div className="page-container">
//             <img src={leftImage} alt="Left" className="left-image" />
//             <div id="openRolesSection" className="container content-space-1">
//                 <div className="w-md-75 w-lg-50 text-center mx-md-auto mb-5 mb-md-9">
//                     <h2 className="text-[4rem] mt-3 leading-none font-bold">
//                         Join us & <span className="font-bold" style={{ color: '#8436a8' }}>Explore</span>{" "}
//                     </h2>
//                     <h2 className="text-[4rem] mt-3 leading-none font-bold">
//                         <span className="font-bold" style={{ color: '#8436a8' }}>Thousands</span>{" "} of Jobs.
//                     </h2>
//                     <h5 className="mt-9 py-5 w-[100%]">
//                         Find Jobs, Employment & Career Opportunities. Some of the companies we've helped recruit excellent applicants over the years.
//                     </h5>
//                 </div>
//                 <form>
//                     <div className="row gx-2 gx-md-3 mb-7">
//                         <div className="col-sm-6 col-md-4 mb-2 mb-sm-0">
//                             <label className="form-label visually-hidden" htmlFor="searchJobCareers">Search job</label>
//                             <select
//                                 className="form-select form-select-lg"
//                                 id="searchJobCareers"
//                                 aria-label="Select job"
//                                 value={searchParams.jobTitle}
//                                 onChange={(e) => setSearchParams({ ...searchParams, jobTitle: e.target.value })}
//                             >
//                                 <option value="">Select job title</option>
//                                 {jobs.map((job, index) => (
//                                     <option key={index} value={job}>{job}</option>
//                                 ))}
//                             </select>
//                         </div>
//                         <div className="col-sm-6 col-md-4 mb-2 mb-sm-0">
//                             <label className="form-label visually-hidden" htmlFor="searchLocationCareers">Search location</label>
//                             <select
//                                 className="form-select form-select-lg"
//                                 id="searchLocationCareers"
//                                 aria-label="Select location"
//                                 value={searchParams.location}
//                                 onChange={(e) => setSearchParams({ ...searchParams, location: e.target.value })}
//                             >
//                                 <option value="">All locations</option>
//                                 {locations.map((location, index) => (
//                                     <option key={index} value={location}>{location}</option>
//                                 ))}
//                             </select>
//                         </div>
//                         <div className="col-sm-6 col-md-4 mb-2 mb-sm-0">
//                             <label className="form-label visually-hidden" htmlFor="searchIndustryCareers">Search Industry</label>
//                             <select
//                                 className="form-select form-select-lg"
//                                 id="searchIndustryCareers"
//                                 aria-label="Select industry"
//                                 value={searchParams.industry}
//                                 onChange={(e) => setSearchParams({ ...searchParams, industry: e.target.value })}
//                             >
//                                 <option value="">All Industries</option>
//                                 {industrys.map((industry, index) => (
//                                     <option key={index} value={industry}>{industry}</option>
//                                 ))}
//                             </select>
//                         </div>
//                     </div>
//                     <div className="text-center">
//                         <button
//                             type="button"
//                             className="btn btn-primary btn-lg"
//                             style={{ width: '100px'}}
//                             onClick={handleSearch}>
//                             Search
//                         </button>
//                     </div>
//                 </form>
//                 {error && <p className="error-message">{error}</p>}
//                 <div className="search-results mt-5">
//                     <div className="row">
//                         {searchResults.map((result, index) => (
//                             <div key={index} className="col-lg-4 col-md-6 col-12 mt-4 pt-2">
//                                 <div className="card border-0 bg-light rounded shadow">
//                                     <div className="card-body p-4">
//                                         <span className="badge rounded-pill float-md-end mb-3 mb-sm-0" style={{ backgroundColor: '#DFDDDE', color: '#000000' }}>{result.employment_type}</span>
//                                         <h5 className="job-title" style={{ color: 'black', textAlign: 'center' }}>{result.job_title}</h5>
//                                         <div className="mt-3">
//                                             <span className="text-muted d-block">
//                                                 <i className="fa fa-map-marker" aria-hidden="true"></i>
//                                                 {result.location}
//                                             </span>
//                                         </div>
//                                         <div className="mt-3 d-flex justify-content-between align-items-center">
//                                             <a href={`/viewjob/${result.id}`} className="btn btn-primary">View Details & Apply</a>
//                                             <button 
//                                                 className={`like-button ${result.liked ? 'liked' : ''}`} 
//                                                 onClick={() => handleLike(result.id)}
//                                             >
//                                                 <i className={`fa ${result.liked ? 'fa-heart' : 'fa-heart-o'}`} aria-hidden="true"></i>
//                                             </button>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default JsSearchFilter;


import React, { useEffect, useState } from 'react';
import leftImage from '../assets/images/left-image.jpg';
import axios from '../help/axios';
import './JobSearch.css';

const JsSearchFilter = () => {
    const [locations, setLocations] = useState([]);
    const [jobs, setJobs] = useState([]);
    const [industrys, setIndustrys] = useState([]);
    const [searchParams, setSearchParams] = useState({
        jobTitle: '',
        location: '',
        industry: ''
    });
    const [searchResults, setSearchResults] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/job/')
            .then(response => {
                const data = response.data;
                const locationArray = data.map(job => job.location);
                const jobTitleArray = data.map(job => job.job_title);
                const industryArray = data.map(job => job.industry);

                setLocations(locationArray);
                setJobs(jobTitleArray);
                setIndustrys(industryArray);
            })
            .catch(error => {
                console.error('Error fetching job data:', error);
                setError('Failed to load job data.');
            });
    }, []);

    const handleSearch = () => {
        const query = `job_title=${searchParams.jobTitle}&location=${searchParams.location}&industry=${searchParams.industry}`;
        axios.get(`http://127.0.0.1:8000/api/search/?${query}`)
            .then(response => {
                setSearchResults(response.data);
            })
            .catch(error => {
                console.error('Error fetching search results:', error);
                setError('Failed to fetch search results.');
            });
    };

    const handleLike = (jobId) => {
        setSearchResults(searchResults.map(result =>
            result.id === jobId ? { ...result, liked: !result.liked } : result
        ));
    };

    return (
        <div className="page-container">
            <img src={leftImage} alt="Left" className="left-image" />
            <div id="openRolesSection" className="container content-space-1">
                <div className="w-md-75 w-lg-50 text-center mx-md-auto mb-5 mb-md-9">
                    <h2 className="text-[4rem] mt-3 leading-none font-bold">
                        Join us & <span className="font-bold" style={{ color: '#8436a8' }}>Explore</span>{" "}
                    </h2>
                    <h2 className="text-[4rem] mt-3 leading-none font-bold">
                        <span className="font-bold" style={{ color: '#8436a8' }}>Thousands</span>{" "} of Jobs.
                    </h2>
                    <h5 className="mt-9 py-5 w-[100%]">
                        Find Jobs, Employment & Career Opportunities. Some of the companies we've helped recruit excellent applicants over the years.
                    </h5>
                </div>
                <form>
                    <div className="row gx-2 gx-md-3 mb-7">
                        <div className="col-sm-6 col-md-4 mb-2 mb-sm-0">
                            <label className="form-label visually-hidden" htmlFor="searchJobCareers">Search job</label>
                            <select
                                className="form-select form-select-lg"
                                id="searchJobCareers"
                                aria-label="Select job"
                                value={searchParams.jobTitle}
                                onChange={(e) => setSearchParams({ ...searchParams, jobTitle: e.target.value })}
                            >
                                <option value="">Select job title</option>
                                {jobs.map((job, index) => (
                                    <option key={index} value={job}>{job}</option>
                                ))}
                            </select>
                        </div>
                        <div className="col-sm-6 col-md-4 mb-2 mb-sm-0">
                            <label className="form-label visually-hidden" htmlFor="searchLocationCareers">Search location</label>
                            <select
                                className="form-select form-select-lg"
                                id="searchLocationCareers"
                                aria-label="Select location"
                                value={searchParams.location}
                                onChange={(e) => setSearchParams({ ...searchParams, location: e.target.value })}
                            >
                                <option value="">All locations</option>
                                {locations.map((location, index) => (
                                    <option key={index} value={location}>{location}</option>
                                ))}
                            </select>
                        </div>
                        <div className="col-sm-6 col-md-4 mb-2 mb-sm-0">
                            <label className="form-label visually-hidden" htmlFor="searchIndustryCareers">Search Industry</label>
                            <select
                                className="form-select form-select-lg"
                                id="searchIndustryCareers"
                                aria-label="Select industry"
                                value={searchParams.industry}
                                onChange={(e) => setSearchParams({ ...searchParams, industry: e.target.value })}
                            >
                                <option value="">All Industries</option>
                                {industrys.map((industry, index) => (
                                    <option key={index} value={industry}>{industry}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="text-center">
                        <button
                            type="button"
                            className="btn btn-primary btn-lg"
                            style={{ width: '100px'}}
                            onClick={handleSearch}>
                            Search
                        </button>
                    </div>
                </form>
                {error && <p className="error-message">{error}</p>}
                <div className="search-results mt-5">
                    <div className="row">
                        {searchResults.map((result, index) => (
                            <div key={index} className="col-lg-4 col-md-6 col-12 mt-4 pt-2">
                                <div className="card border-0 bg-light rounded shadow">
                                    <div className="card-body p-4">
                                        <span className="badge rounded-pill float-md-end mb-3 mb-sm-0" style={{ backgroundColor: '#DFDDDE', color: '#000000' }}>{result.employment_type}</span>
                                        <h5 className="job-title" style={{ color: 'black', textAlign: 'center' }}>{result.job_title}</h5>
                                        <div className="mt-3">
                                            <span className="text-muted d-block">
                                                <i className="fa fa-map-marker" aria-hidden="true"></i>
                                                {result.location}
                                            </span>
                                        </div>
                                        <div className="mt-3 d-flex justify-content-between align-items-center">
                                            <a href={`/viewjob/${result.id}`} className="btn btn-primary">View Details & Apply</a>
                                            <button 
                                                className={`like-button ${result.liked ? 'liked' : ''}`} 
                                                onClick={() => handleLike(result.id)}
                                            >
                                                <i className={`fa ${result.liked ? 'fa-heart' : 'fa-heart-o'}`} aria-hidden="true"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JsSearchFilter;
