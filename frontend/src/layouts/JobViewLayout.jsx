import React from 'react';
import { useSelector } from 'react-redux';
import '../App.css';
import Footer from '../components/Footer';
import JobView from '../components/JobView';
import JsNavbar from '../components/JsNavbar';
import Navbar from '../components/Navbar';
import RecJobView from '../components/RecJobView';
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

const ViewApplyLayout = () => {

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const userType = useSelector((state) => state.auth.userType);
  return (
    <div>
        {isAuthenticated ? <NavbarSignedIn /> : <Navbar />}
        {userType === 'recruiter' ? <RecJobView/> : <JobView />}
        <Footer/>
    </div>
  );
}

export default ViewApplyLayout