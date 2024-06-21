
import React, { useEffect, useState } from 'react';
import '../App.css';
import Footer from '../components/Footer';
import Middlelayout from '../components/HomeMiddlelayout';
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


const Layout = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
        useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false);
        }
        }, []);
    return (
        <div className="web-app">
            {isAuthenticated ? <NavbarSignedIn /> : <NavbarSignedOut />}
            <Middlelayout />
            <Footer />
        </div>
    );
    }

export default Layout;

