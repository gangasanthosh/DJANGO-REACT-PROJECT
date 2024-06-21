import React from 'react'
import Footer from '../components/Footer'
import JsApplicationForm from '../components/JsApplicationForm'
import JsNavbar from '../components/JsNavbar'

const JsApplyLayout = () => {
  return (
    <div>
        <JsNavbar/>
        <JsApplicationForm/>
        {/* <HomeJobcards/> */}
        <Footer/>
    </div>
  )
}

export default JsApplyLayout