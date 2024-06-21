import React, { useEffect, useState } from 'react';
import '../App.css';
import Footer from '../components/Footer';
import JsNavbar from '../components/JsNavbar';
import Navbar from '../components/Navbar';
import ViewApply from '../components/ViewApply';



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
    const token = localStorage.getItem('token');
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
        <ViewApply/>
        <Footer/>
    </div>
  );
}

export default ViewApplyLayout