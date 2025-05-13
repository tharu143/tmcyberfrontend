import { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { isValidAdmin } from './api/index';

const PrivateRoute: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const valid = await isValidAdmin();
        setIsAuthenticated(valid);
      } catch (err) {
        console.error('Authentication check failed:', err);
        setIsAuthenticated(false);
      }
    };
    checkAuth();
  }, []);

  if (isAuthenticated === null) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/admin/login" replace />;
};

export default PrivateRoute;