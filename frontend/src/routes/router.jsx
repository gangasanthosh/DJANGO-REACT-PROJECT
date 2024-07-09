import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Signin from '../components/Signin';
import Signup from '../components/Signup';
import AboutUsLayout from '../layouts/AboutUsLayout';
import ApplicationStatusLayout from '../layouts/ApplicationStatusLayout';
import CompanySearch from '../layouts/CompanySearchLayout';
import HomeLayout from '../layouts/HomeLayout';
import JobApplicationFormLayout from '../layouts/JobApplicationFormLayout';
import JobPostedLayout from '../layouts/JobPostedLayout';
import JobSearchLayout from '../layouts/JobSearchLayout';
import JobViewLayout from '../layouts/JobViewLayout';
import PostJobFormLayout from '../layouts/PostJobFormLayout';
import ProfileSetupForm from '../layouts/ProfileFormLayout';
import RecProfileFormLayout from '../layouts/RecProfileFormLayout';
import ViewApplicationLayout from '../layouts/ViewApplicationLayout';
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
      <Route path='/aboutus' element={<AboutUsLayout/>}/>
      {/* Add other routes here */}

      {/* Add protected routes here*/}
      <Route path="/apply/:jobId" element={<ProtectedRoute> <JobApplicationFormLayout/> </ProtectedRoute>}/>
      <Route path='/status' element={<ProtectedRoute><ApplicationStatusLayout/></ProtectedRoute>}/>
      <Route path='/profilesetup' element={<ProtectedRoute><ProfileSetupForm/></ProtectedRoute>}/>
      <Route path='/postjob' element={<ProtectedRoute><PostJobFormLayout/></ProtectedRoute>}/>
      <Route path='/jobsposted' element={<ProtectedRoute><JobPostedLayout/></ProtectedRoute>}/>
      <Route path='/view-application/:jobId' element={<ProtectedRoute><ViewApplicationLayout/></ProtectedRoute>}/>
      <Route path='/recprofile' element={<ProtectedRoute><RecProfileFormLayout/></ProtectedRoute>}/>

    </Routes>
  );
}

export default MainRoutes;

