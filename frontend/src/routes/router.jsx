import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Signin from '../components/Signin'; // Ensure the path and file name are correct
import Signup from '../components/Signup';
import HomeLayout from '../layouts/HomeLayout';
import JsLayout from '../layouts/JsLayout';
import RecLayout from '../layouts/RecLayout';

const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomeLayout />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/signup" element={<Signup />} />
      <Route path='/recruiter' element={<RecLayout />}/>
      <Route path='/jobseeker' element={<JsLayout />} />
      {/* Add other routes here */}
    </Routes>
  );
}

export default MainRoutes;

