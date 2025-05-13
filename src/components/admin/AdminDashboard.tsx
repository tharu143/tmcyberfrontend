import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { isValidAdmin, logout, getEmployees } from '../../api/index';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [employeeData, setEmployeeData] = useState({ active: 0, inactive: 0 });

  useEffect(() => {
    const checkAuth = async () => {
      const isValid = await isValidAdmin();
      if (!isValid) {
        navigate('/admin/login');
      } else {
        fetchEmployeeData();
      }
    };
    checkAuth();
  }, [navigate]);

  const fetchEmployeeData = async () => {
    try {
      const employees = await getEmployees();
      const active = employees.filter((emp: any) => emp.status === 'active').length;
      const inactive = employees.length - active;
      setEmployeeData({ active, inactive });
    } catch (err) {
      console.error('Failed to fetch employees:', err);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  const pieData = {
    labels: ['Active Employees', 'Inactive Employees'],
    datasets: [
      {
        data: [employeeData.active, employeeData.inactive],
        backgroundColor: ['#22c55e', '#ef4444'],
        hoverBackgroundColor: ['#16a34a', '#dc2626'],
      },
    ],
  };

  return (
    <div className="min-h-screen bg-primary-100">
      <nav className="bg-primary-500 p-4 text-white shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600 transition-colors duration-300"
          >
            Logout
          </button>
        </div>
      </nav>
      <div className="container mx-auto p-6">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Employee Statistics</h2>
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto">
            <Pie data={pieData} options={{ responsive: true, plugins: { legend: { position: 'top' } } }} />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { to: '/admin/admins', title: 'Manage Admins', desc: 'Add, update, or delete admin accounts.' },
            { to: '/admin/employees', title: 'Manage Employees', desc: 'Handle employee records.' },
            { to: '/admin/employees/create', title: 'Create Employee', desc: 'Add a new employee.' },
            { to: '/admin/attendance', title: 'Manage Attendance', desc: 'Track employee attendance.' },
            { to: '/admin/tasks', title: 'Manage Tasks', desc: 'Assign and track tasks.' },
            { to: '/admin/certificates', title: 'Manage Certificates', desc: 'Issue and manage certificates.' },
            { to: '/admin/certificate-generator', title: 'Generate Certificate', desc: 'Create employee certificates.' },
          ].map((item, index) => (
            <Link
              key={index}
              to={item.to}
              className="bg-white p-6 rounded-lg shadow-lg hover:bg-primary-100 transform transition-all hover:scale-105"
            >
              <h2 className="text-xl font-bold text-primary-500">{item.title}</h2>
              <p className="text-gray-600 mt-2">{item.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;