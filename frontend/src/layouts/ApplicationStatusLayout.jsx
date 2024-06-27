import React from 'react'
import ApplicationStatus from '../components/ApplicationStatus'
import Footer from '../components/Footer'
import JsNavbar from '../components/JsNavbar'

const ApplicationStatusLayout = () => {
  return (
    <div>
        <JsNavbar/>
        <ApplicationStatus/>
        <Footer/>
    </div>
  )
}

export default ApplicationStatusLayout