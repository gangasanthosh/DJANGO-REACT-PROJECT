import React from 'react';
import '../App.css';
import Footer from '../components/Footer';
import Main from '../components/HomeMiddlelayout';
import RecNavbar from '../components/RecNavbar';

const RecLayout = () => {
  return (
    <div>
      <RecNavbar/>
      <Main/>
      <Footer/>
    </div>
  );
}

export default RecLayout;
