import React from 'react'
import Footer from '../components/Footer'
import JobApplicationForm from '../components/JobApplicationForm'
import JsNavbar from '../components/JsNavbar'

const JsApplyLayout = () => {
  return (
    <div>
        <JsNavbar/>
        <JobApplicationForm/>
        <Footer/>
    </div>
  )
}

export default JsApplyLayout