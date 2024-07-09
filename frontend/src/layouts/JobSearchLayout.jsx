import React from 'react';
import { useSelector } from 'react-redux';
import '../App.css';
import Footer from '../components/Footer';
import Jobcards from '../components/HomeJobcards';
import JobSearch from '../components/JobSearch';
import JsNavbar from '../components/JsNavbar';
import Navbar from '../components/Navbar';
import RecNavbar from '../components/RecNavbar';



const NavbarSignedIn = () => {
    const userType = useSelector((state) => state.auth.userType);
    return (
    <div>
        {userType === 'jobseeker' ? <JsNavbar /> : <RecNavbar />}
    </div>
    );
};
;

const SearchFilterLayout = () => {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    return (
        <div className="web-app">
        {isAuthenticated ? <NavbarSignedIn /> : <Navbar />}
        <JobSearch/>
        <Jobcards/>
        <Footer/>
        </div>
        )
    }

export default SearchFilterLayout;
