import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Signin from '../components/Signin';
import Signup from '../components/Signup';
import HomeLayout from '../layouts/HomeLayout';
import JsLayout from '../layouts/JsLayout';
import RecLayout from '../layouts/RecLayout';
import SearchFilterLayout from '../layouts/SearchFilterLayout';
import ViewApplyLayout from '../layouts/ViewApplyLayout';

const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomeLayout />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/signup" element={<Signup />} />
      <Route path='/recruiter' element={<RecLayout />}/>
      <Route path='/jobseeker' element={<JsLayout />} />
      <Route path='/search' element={<SearchFilterLayout/>}/>
      {/* <Route path='/viewapply' element={<ViewApplyLayout/>} /> */}
      <Route path="/viewapply/:jobId" element={<ViewApplyLayout/>} />

      {/* Add other routes here */}
    </Routes>
  );
}

export default MainRoutes;

