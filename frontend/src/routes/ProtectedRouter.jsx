
// import React from 'react';
// import { Navigate, useLocation } from 'react-router-dom';

// const ProtectedRoute = ({ children }) => {
//   const token = localStorage.getItem('token');
//   const location = useLocation();

//   if (!token) {
//     return <Navigate to="/signin" state={{ from: location }} />;
//   }

//   return children;
// };

// export default ProtectedRoute;

import Cookies from 'js-cookie'; // Import js-cookie
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const token = Cookies.get('authToken'); // Retrieve token from secure cookie

  if (!token) {
    // Redirect to login if no token is found
    return <Navigate to="/signin" replace state={{ from: location }} />;
  }

  return children; // Render children if token is present
};

export default ProtectedRoute;


