import React, { useEffect, useState } from 'react';
import myGif from '../assets/images/mygifff.gif';
import axios from '../help/axios';
import './CompanySearch.css';

const CompanySearchFilter = () => {
    const [headquarters, setHeadquarters] = useState([]);
    const [companies, setCompanies] = useState([]);
    const [industries, setIndustries] = useState([]);
    const [searchParams, setSearchParams] = useState({
        name: '',
        headquarters: '',
        industry: ''
    });
    const [searchResults, setSearchResults] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/company/')
            .then(response => {
                const headquarters = response.data.map(company => company.headquarters);
                const uniqueHeadquarters = [...new Set(headquarters)];
                setHeadquarters(uniqueHeadquarters);

                const names = response.data.map(company => company.name);
                setCompanies(names);

                const industries = response.data.map(company => company.industry);
                const uniqueIndustries = [...new Set(industries)];
                setIndustries(uniqueIndustries);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setError('Failed to load data.');
            });
    }, []);

    const handleSearch = () => {
        const query = `name=${searchParams.name}&headquarters=${searchParams.headquarters}&industry=${searchParams.industry}`;
        axios.get(`http://127.0.0.1:8000/api/company/search?${query}`)
            .then(response => {
                setSearchResults(response.data);
            })
            .catch(error => {
                console.error('Error fetching search results:', error);
                setError('Failed to fetch search results.');
            });
    };

    return (
        <div className="page-container">
            <div className="gif-container">
                <img src={myGif} alt="Your GIF" className="gif-image" />
            </div>
            <div id="openRolesSection" className="container content-space-1 search-overlay">
                <form>
                    <div className="row gx-2 gx-md-3 mb-7">
                        <div className="col-sm-6 col-md-4 mb-2 mb-sm-0">
                            <label className="form-label visually-hidden" htmlFor="searchCompanyName">Search company</label>
                            <select
                                className="form-select form-select-lg"
                                id="searchCompanyName"
                                aria-label="Select company"
                                value={searchParams.name}
                                onChange={(e) => setSearchParams({ ...searchParams, name: e.target.value })}
                            >
                                <option value="">Select company name</option>
                                {companies.map((company, index) => (
                                    <option key={index} value={company}>{company}</option>
                                ))}
                            </select>
                        </div>
                        <div className="col-sm-6 col-md-4 mb-2 mb-sm-0">
                            <label className="form-label visually-hidden" htmlFor="searchLocationCompany">Search location</label>
                            <select
                                className="form-select form-select-lg"
                                id="searchLocationCompany"
                                aria-label="Select location"
                                value={searchParams.headquarters}
                                onChange={(e) => setSearchParams({ ...searchParams, headquarters: e.target.value })}
                            >
                                <option value="">All locations</option>
                                {headquarters.map((headquarters, index) => (
                                    <option key={index} value={headquarters}>{headquarters}</option>
                                ))}
                            </select>
                        </div>
                        <div className="col-sm-6 col-md-4 mb-2 mb-sm-0">
                            <label className="form-label visually-hidden" htmlFor="searchIndustryCompany">Search industry</label>
                            <select
                                className="form-select form-select-lg"
                                id="searchIndustryCompany"
                                aria-label="Select industry"
                                value={searchParams.industry}
                                onChange={(e) => setSearchParams({ ...searchParams, industry: e.target.value })}
                            >
                                <option value="">All industries</option>
                                {industries.map((industry, index) => (
                                    <option key={index} value={industry}>{industry}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="text-center">
                        <button
                            type="button"
                            className="btn btn-primary btn-lg"
                            onClick={handleSearch}>
                            Search
                        </button>
                    </div>
                </form>
                {error && <p className="error-message">{error}</p>}
                <div className="search-results mt-5">
                    <div className="horizontal-scroll">
                        {searchResults.map((result, index) => (
                            <div className="job-card" key={index}>
                                <div className="job-card-header">
                                    <div className="company-name">
                                        <h2>{result.name}</h2>
                                    </div>
                                    <div className="details-right">
                                        <h4>Industry</h4>
                                        <span>{result.industry}</span>
                                        <h4>Headquarters</h4>
                                        <span>{result.headquarters}</span>
                                    </div>
                                </div>
                                <div className="job-card-details">
                                    <div className="detail-item">
                                        <h4>Email</h4>
                                        <a href={`mailto:${result.email}`}>{result.email}</a>
                                    </div>
                                    <div className="detail-item">
                                        <h4>Phone Number</h4>
                                        <span>{result.phn_no}</span>
                                    </div>
                                    <div className="detail-item">
                                        <h4>Website</h4>
                                        <a href={result.website} target="_blank" rel="noopener noreferrer">{result.website}</a>
                                    </div>
                                </div>
                                <div className="job-card-body">
                                    <div className="job-card-description">
                                        <h4>Description</h4>
                                        <p>{result.description}</p>
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

export default CompanySearchFilter;
