import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import '../App.css';
import Footer from '../components/Footer';
import JobView from '../components/JobView';
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
const ViewApplyLayout = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    const token = Cookies.get('authToken');
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  return (
    <div>
        {/* <Navbar/> */}
        {isAuthenticated ? <NavbarSignedIn /> : <NavbarSignedOut />}
        <JobView/>
        <Footer/>
    </div>
  );
}

export default ViewApplyLayout