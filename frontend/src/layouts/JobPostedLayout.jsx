import React from 'react'
import Footer from '../components/Footer'
import RecJobsPosted from '../components/RecJobsPosted'
import RecNavbar from '../components/RecNavbar'

const JobPostedLayout = () => {
  return (
    <div>
        <RecNavbar/>
        <RecJobsPosted/>
        <Footer/>
    </div>
  )
}

export default JobPostedLayout