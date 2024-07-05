

// import Cookies from 'js-cookie'; // Import js-cookie
// import React from 'react';
// import { Navigate, useLocation } from 'react-router-dom';

// const ProtectedRoute = ({ children }) => {
//   const location = useLocation();
//   const token = Cookies.get('authToken'); // Retrieve token from secure cookie

//   if (!token) {
//     // Redirect to login if no token is found
//     return <Navigate to="/signin" replace state={{ from: location }} />;
//   }

//   return children; // Render children if token is present
// };

// export default ProtectedRoute;


import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  if (!isAuthenticated) {
    // Redirect to login if the user is not authenticated
    return <Navigate to="/signin" replace state={{ from: location }} />;
  }

  return children; // Render children if the user is authenticated
};

export default ProtectedRoute;


