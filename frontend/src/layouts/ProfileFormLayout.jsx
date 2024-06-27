import Cookies from 'js-cookie'
import React, { useEffect, useState } from 'react'
import Footer from '../components/Footer'
import JsNavbar from '../components/JsNavbar'
import Navbar from '../components/Navbar'
import ProfileForm from '../components/ProfileForm'

const NavbarSignedIn = () => {
        return (
            <div>
                <JsNavbar/>
            </div>
            );
        };
    
const NavbarSignedOut = () => {
        return (
            <div>
                <Navbar/>
            </div>
            );
        };

const AboutUsLayout = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    useEffect(() => {
        const token = Cookies.get('authToken');
        if (token) {
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false);
        }
    }  , []);

    return (
    <div>
    {isAuthenticated ? <NavbarSignedIn /> : <NavbarSignedOut />}
    <ProfileForm/>
    <Footer/>

    </div>
    )
}

export default AboutUsLayout