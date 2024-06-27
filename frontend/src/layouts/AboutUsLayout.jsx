import Cookies from 'js-cookie'
import React, { useEffect, useState } from 'react'
import AboutUs from '../components/AboutUs'
import ContactUs from '../components/ContactUs'
import Footer from '../components/Footer'
import JsNavbar from '../components/JsNavbar'
import Navbar from '../components/Navbar'

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
    <AboutUs/>
    <ContactUs/>
    <Footer/>

    </div>
    )
}

export default AboutUsLayout