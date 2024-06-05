
import React from 'react';
import '../App.css';
import Footer from '../components/Footer';
import Middlelayout from '../components/HomeMiddlelayout';
import Navbar from '../components/Navbar';

const Layout = () => {
    return (
        <div className="web-app">
            <Navbar />
            <Middlelayout />
            <Footer />
        </div>
    );
    }

export default Layout;

