import React from 'react';
import '../App.css';
import Footer from '../components/Footer';
import JsNavbar from '../components/JsNavbar';
import JsSearchFilter from '../components/JsSearchFilter';



const MoreJobsLayout = () => {
    return (
        <div>
            <JsNavbar/>
            <JsSearchFilter/>
            <Footer/>
        </div>
    );
    }

export default MoreJobsLayout;
