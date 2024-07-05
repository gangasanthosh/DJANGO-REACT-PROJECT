

import React from 'react';
import { useSelector } from 'react-redux';
import '../App.css';
import Footer from '../components/Footer';
import Middlelayout from '../components/HomeMiddlelayout';
import JsNavbar from '../components/JsNavbar';
import Navbar from '../components/Navbar';
import RecMiddleLayout from '../components/RecMiddleLayout';
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
const Layout = () => {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const userType = useSelector((state) => state.auth.userType);
        return (
            <div className="web-app">
                {isAuthenticated ? <NavbarSignedIn /> : <Navbar />}
                {isAuthenticated && userType === 'recruiter' ? <RecMiddleLayout /> : <Middlelayout />}
                <Footer />
            </div>
        );
    };
export default Layout;
    


