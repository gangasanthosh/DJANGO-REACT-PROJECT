import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import '../App.css';
import Footer from '../components/Footer';
import JobSearch from '../components/JobSearch';
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
    const SearchFilterLayout = () => {
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
                <JobSearch/>
                <Footer/>
            </div>
        );
        }

export default SearchFilterLayout;
