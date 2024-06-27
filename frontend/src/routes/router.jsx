import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Signin from '../components/Signin';
import Signup from '../components/Signup';
import ApplicationStatusLayout from '../layouts/ApplicationStatusLayout';
import CompanySearch from '../layouts/CompanySearchLayout';
import HomeLayout from '../layouts/HomeLayout';
import JobApplicationFormLayout from '../layouts/JobApplicationFormLayout';
import JobSearchLayout from '../layouts/JobSearchLayout';
import JobViewLayout from '../layouts/JobViewLayout';
import JsLayout from '../layouts/JsLayout';
import RecLayout from '../layouts/RecLayout';
import ProtectedRoute from './ProtectedRouter';

const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomeLayout />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/signup" element={<Signup />} />
      <Route path='/searchjob' element={<JobSearchLayout/>}/>
      <Route path="/viewjob/:jobId" element={<JobViewLayout/>} />
      <Route path='/searchcompany' element={<CompanySearch/>}/>
      {/* Add other routes here */}

      {/* Add protected routes here*/}
      <Route path="/apply/:jobId" element={<ProtectedRoute> <JobApplicationFormLayout/> </ProtectedRoute>}/>
      <Route path="/jobseeker" element={<ProtectedRoute> <JsLayout/> </ProtectedRoute>}/>
      <Route path="/recruiter" element={<ProtectedRoute> <RecLayout/> </ProtectedRoute>}/>
      <Route path='/status' element={<ProtectedRoute><ApplicationStatusLayout/></ProtectedRoute>}/>

    </Routes>
  );
}

export default MainRoutes;

