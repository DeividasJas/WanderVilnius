import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const ProtectedRoute = ({ children }) => {
  const token = jwtDecode(window.localStorage.getItem('token'));
  console.log(token);
  //   const isAuthenticated = /* your logic to check if user is authenticated */;

  if (!isAuthenticated) {
    // Redirect to the login page if not authenticated
    return <Navigate to='/login' />;
  }

  // Render the children if authenticated
  return children;
};

export default ProtectedRoute;
