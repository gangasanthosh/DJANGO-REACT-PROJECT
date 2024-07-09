import React from 'react'
import { useSelector } from 'react-redux'
import Footer from '../components/Footer'
import JsNavbar from '../components/JsNavbar'
import Navbar from '../components/Navbar'
import ProfileForm from '../components/ProfileForm'
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
    <div>
        {isAuthenticated ? <NavbarSignedIn /> : <Navbar />}
        <ProfileForm/>
        <Footer/>
    </div>
    )
}

export default AboutUsLayout