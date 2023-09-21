import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

function PrivateRouteWrapper({ children }) {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      navigate('/');
      return;
    }

    try {
      const decoded = jwt_decode(token);
      const currentTime = Date.now() / 1000;

      if (decoded.exp < currentTime) {
        localStorage.removeItem('authToken');
        navigate('/');
        return;
      }
    } catch (err) {
      localStorage.removeItem('authToken');
      navigate('/');
      return;
    }
  }, [navigate]);

  return children;
}

export default PrivateRouteWrapper;
