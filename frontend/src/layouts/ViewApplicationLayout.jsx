import React from 'react'
import Footer from '../components/Footer'
import RecNavbar from '../components/RecNavbar'
import RecViewApplication from '../components/RecViewApplication'

const ViewApplicationLayout = () => {
  return (
    <div>
        <RecNavbar/>
        <RecViewApplication/>
        <Footer/>
    </div>
  )
}

export default ViewApplicationLayout