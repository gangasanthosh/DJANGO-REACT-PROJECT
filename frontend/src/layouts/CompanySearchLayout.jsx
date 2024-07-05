import React from 'react';
import { useSelector } from 'react-redux';
import Companies from '../components/Companies';
import CompanySearch from '../components/CompanySearch';
import Footer from '../components/Footer';
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

const companiesLayout = () => {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    return (
        <div className="web-app">
        {isAuthenticated ? <NavbarSignedIn /> : <Navbar />}
        <CompanySearch/>
        <Companies/>
        <Footer/>
        </div>
        )
    }

export default companiesLayout