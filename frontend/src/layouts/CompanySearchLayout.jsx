import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import Companies from '../components/Companies';
import CompanySearch from '../components/CompanySearch';
import Footer from '../components/Footer';
import JsNavbar from '../components/JsNavbar';
import Navbar from '../components/Navbar';


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
const CompaniesLayout = () => {
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
          {/* <Navbar/> */}
            {isAuthenticated ? <NavbarSignedIn /> : <NavbarSignedOut />}
            <CompanySearch/>
            <Companies/>
            <Footer/>
        </div>
    );
}

export default CompaniesLayout;