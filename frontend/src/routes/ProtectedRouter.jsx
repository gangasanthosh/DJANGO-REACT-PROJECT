// import React from 'react';
// import { Navigate, useLocation } from 'react-router-dom';

// const ProtectedRoute = ({ children }) => {
//     const token = localStorage.getItem('token');
//     const location= useLocation();

//     if (!token) {
//       localStorage.setItem('lastvistedpage',location.pathname)
//     return <Navigate to="/signin" />;
//     }
//   // If token exists, render the protected component
//     return children;
// };

// export default ProtectedRoute;
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  const location = useLocation();

  if (!token) {
    return <Navigate to="/signin" state={{ from: location }} />;
  }

  return children;
};

export default ProtectedRoute;
