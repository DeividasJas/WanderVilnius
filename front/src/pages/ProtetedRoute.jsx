import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { getUserByEmail } from '../services/get.mjs';
import { useEffect, useState } from 'react';

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    try {
      const codedToken = window.localStorage.getItem('token');
      if (!codedToken) {
        console.log('notoken');
        // move to login from protected route (with router state)
        navigate('/login', {
          state: { from: 'protected-route' },
        });
        return;
      }
      if (codedToken) {
        (async () => {
          const token = jwtDecode(codedToken);
          const response = await getUserByEmail(token.email);
          console.log(response);
          if (response.status === 200) {
            setIsAuthenticated(true);
          } else {
            return navigate('/login');
          }
        })();
      }
    } catch (error) {
      console.log(error);
    }
  }, []);
  if (isAuthenticated === null) {
    return <div>Loading...</div>; // Or a loading spinner
  }
  if (isAuthenticated) {
    return children;
  }
};

export default ProtectedRoute;
