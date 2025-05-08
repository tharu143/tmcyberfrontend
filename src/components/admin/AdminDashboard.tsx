import { useEffect, useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { isValidAdmin, logout } from '../../lib/db';

const AdminDashboard: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const valid = await isValidAdmin();
        setIsAuthenticated(valid);
      } catch {
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!isAuthenticated) {
    navigate('/admin/login');
    return null;
  }

  return (
    <div className="min-h-screen flex">
      <div className="w-64 bg-gray-800 text-white p-4">
        <h2 className="text-2xl font-bold mb-6">Admin Dashboard</h2>
        <nav>
          <ul>
            <li className="mb-2">
              <Link to="/admin/dashboard/admins" className="block p-2 hover:bg-gray-700 rounded">Manage Admins</Link>
            </li>
            <li className="mb-2">
              <Link to="/admin/dashboard/employees" className="block p-2 hover:bg-gray-700 rounded">Manage Employees</Link>
            </li>
            <li className="mb-2">
              <Link to="/admin/dashboard/attendance" className="block p-2 hover:bg-gray-700 rounded">Manage Attendance</Link>
            </li>
            <li className="mb-2">
              <Link to="/admin/dashboard/tasks" className="block p-2 hover:bg-gray-700 rounded">Manage Tasks</Link>
            </li>
            <li className="mb-2">
              <Link to="/admin/dashboard/certificates" className="block p-2 hover:bg-gray-700 rounded">Manage Certificates</Link>
            </li>
            <li className="mt-4">
              <button onClick={handleLogout} className="w-full p-2 bg-red-600 hover:bg-red-700 rounded text-white">Logout</button>
            </li>
          </ul>
        </nav>
      </div>
      <div className="flex-1 p-6 bg-gray-100">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminDashboard;