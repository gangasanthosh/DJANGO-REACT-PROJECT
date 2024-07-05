import React from 'react'
import { useSelector } from 'react-redux'
import AboutUs from '../components/AboutUs'
import ContactUs from '../components/ContactUs'
import Footer from '../components/Footer'
import JsNavbar from '../components/JsNavbar'
import Navbar from '../components/Navbar'
import RecNavbar from '../components/RecNavbar'

const NavbarSignedIn = () => {
    const userType = useSelector((state) => state.auth.userType);
    return (
    <div>
        {userType === 'jobseeker' ? <JsNavbar /> : <RecNavbar />}
    </div>
    );
};
;

const AboutUsLayout = () => {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    return (
        <div className="web-app">
        {isAuthenticated ? <NavbarSignedIn /> : <Navbar />}
        <AboutUs/>
        <ContactUs/>
        <Footer/>
        </div>
        )
    }

export default AboutUsLayout