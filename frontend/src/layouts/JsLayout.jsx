import React from 'react';
import '../App.css';
import Footer from '../components/Footer';
import Main from '../components/HomeMiddlelayout';
import JsNavbar from '../components/JsNavbar';


const JsLayout = () => {
    return (
        <div>
        <JsNavbar/>
        <Main/>
        <Footer/>
        
        </div>
    );
    }

export default JsLayout;
