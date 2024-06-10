import React from 'react';
import '../App.css';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import ViewApply from '../components/ViewApply';



const ViewApplyLayout = () => {
  return (
    <div>
        <Navbar/>
        <ViewApply/>
        <Footer/>
    </div>
  );
}

export default ViewApplyLayout