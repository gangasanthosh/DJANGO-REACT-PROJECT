import React from 'react'

const JsNavbar = () => {
    return (
    <div className="container w-full flex justify-between items-center py-2">
        <h1 className='font-bold text-xl'>JobStack</h1>
        <ul className='flex gap-6 items-center'>
        <li key="home">Home</li>
        <li key="jobs">Jobs</li>
        <li key="companies">Companies</li>
        <li key="contact">Contact us</li>
        <li key="about">About us</li>
        </ul>
        {/* <Link to="/Signin"> */}
            <button className='rounded-full px-5 py-2 text-white font-bold bg-purple-700'>Apply + </button>
        {/* </Link> */}
    </div>
    )
}

export default JsNavbar
