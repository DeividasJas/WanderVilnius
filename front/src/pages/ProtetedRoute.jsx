import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { getUserByEmail } from '../services/get.mjs';
import { useEffect, useState } from 'react';
import { Toaster, toast } from 'sonner';

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  try {
    const codedToken = window.localStorage.getItem('token');
    useEffect(() => {
      if (!codedToken) {
        console.log('notoken');

        // move to login from protected route (with router state)
        return navigate('/login', {
          state: { from: 'protected-route' },
        });
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
    }, []);

    // if (!token) {
    //   return navigate('/login');
    // }
    // return children;
  } catch (error) {
    console.log(error);
  }
};

export default ProtectedRoute;
