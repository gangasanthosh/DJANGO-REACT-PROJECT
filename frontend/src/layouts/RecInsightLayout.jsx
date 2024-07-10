import React from 'react'
import Footer from '../components/Footer'
import RecInsight from '../components/RecInsight'
import RecNavbar from '../components/RecNavbar'


const RecInsightLayout = () => {
  return (
    <div>
        <RecNavbar/>
        <RecInsight/>
        <Footer/>
    </div>
  )
}

export default RecInsightLayout