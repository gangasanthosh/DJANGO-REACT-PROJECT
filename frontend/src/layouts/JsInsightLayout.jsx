import React from 'react'
import Footer from '../components/Footer'
import JsInsight from '../components/JsInsight'
import JsNavbar from '../components/JsNavbar'

const JsInsightLayout = () => {
  return (
    <div>
        <JsNavbar/>
        <JsInsight/>
        <Footer/>
    </div>
  )
}

export default JsInsightLayout