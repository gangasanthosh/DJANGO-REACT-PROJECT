import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Signin from '../components/Signin';
import Signup from '../components/Signup';
import HomeLayout from '../layouts/HomeLayout';
import JsApplyLayout from '../layouts/JsApplyLayout';
import JsLayout from '../layouts/JsLayout';
import RecLayout from '../layouts/RecLayout';
import SearchFilterLayout from '../layouts/SearchFilterLayout';
import ViewApplyLayout from '../layouts/ViewApplyLayout';
import ProtectedRoute from './ProtectedRouter';

const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomeLayout />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/signup" element={<Signup />} />
      {/* <Route path='/recruiter' element={<RecLayout />}/> */}
      <Route path='/search' element={<SearchFilterLayout/>}/>
      <Route path="/viewapply/:jobId" element={<ViewApplyLayout/>} />
      {/* Add other routes here */}

      {/* protected routes */}

      <Route path="/apply" element={<ProtectedRoute> <JsApplyLayout/> </ProtectedRoute>}/>
      <Route path="/jobseeker" element={<ProtectedRoute> <JsLayout/> </ProtectedRoute>}/>
      <Route path="/recruiter" element={<ProtectedRoute> <RecLayout/> </ProtectedRoute>}/>

    </Routes>
  );
}

export default MainRoutes;

