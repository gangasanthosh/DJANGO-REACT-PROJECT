import React from 'react';
import '../App.css';
import Footer from '../components/Footer';
import PostJobForm from '../components/PostJobForm';
import RecNavbar from '../components/RecNavbar';


const PostJobFormLayout = () => {
  return (
    <div>
        <RecNavbar/>
        <PostJobForm/>
        <Footer/>

    </div>
  )
}

export default PostJobFormLayout