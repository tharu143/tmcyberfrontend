import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { isValidAdmin, logout, getEmployees, getAttendance, getTasks, getCertificates } from '../../api/index';
import { Bar, Line, Doughnut, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale, LineElement, PointElement } from 'chart.js';
import { Menu, X, Users, CheckCircle, Calendar, Award, Moon, Sun, Key } from 'react-feather';

ChartJS.register(ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale, LineElement, PointElement);

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [employeeData, setEmployeeData] = useState({ active: 0, inactive: 0 });
  const [attendanceData, setAttendanceData] = useState([]);
  const [taskData, setTaskData] = useState({ pending: 0, inProgress: 0, completed: 0 });
  const [certificateData, setCertificateData] = useState({});
  const [totalEmployees, setTotalEmployees] = useState(0);
  const [totalTasks, setTotalTasks] = useState(0);
  const [recentAttendance, setRecentAttendance] = useState(0);
  const [totalCertificates, setTotalCertificates] = useState(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(localStorage.getItem('theme') === 'dark');
  const [error, setError] = useState('');

  useEffect(() => {
    const checkAuth = async () => {
      const isValid = await isValidAdmin();
      if (!isValid) {
        navigate('/admin/login');
      } else {
        fetchDashboardData();
      }
    };
    checkAuth();
  }, [navigate]);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const fetchDashboardData = async () => {
    try {
      const [employees, attendance, tasks, certificates] = await Promise.all([
        getEmployees(),
        getAttendance(),
        getTasks(),
        getCertificates(),
      ]);

      const active = employees.filter((emp) => emp.status === 'active').length;
      const inactive = employees.length - active;
      setEmployeeData({ active, inactive });
      setTotalEmployees(employees.length);

      const today = new Date();
      const last7Days = Array.from({ length: 7 }, (_, i) => {
        const date = new Date(today);
        date.setDate(today.getDate() - i);
        return date.toISOString().split('T')[0];
      }).reverse();

      const attendanceCounts = last7Days.map((date) => {
        if (!attendance || !Array.isArray(attendance)) return 0;
        return attendance.filter((record) => {
          try {
            const recordDate = new Date(record.date);
            if (isNaN(recordDate.getTime())) return false;
            return (
              recordDate.toISOString().split('T')[0] === date &&
              record.status === 'Present'
            );
          } catch {
            return false;
          }
        }).length;
      });

      setAttendanceData(attendanceCounts);
      setRecentAttendance(
        attendanceCounts.length > 0 ? attendanceCounts[attendanceCounts.length - 1] : 0
      );

      const pending = tasks.filter((task) => task.status === 'Pending').length;
      const inProgress = tasks.filter((task) => task.status === 'In Progress').length;
      const completed = tasks.filter((task) => task.status === 'Completed').length;
      setTaskData({ pending, inProgress, completed });
      setTotalTasks(tasks.length);

      const certificateTypes = certificates.reduce((acc, cert) => {
        acc[cert.type] = (acc[cert.type] || 0) + 1;
        return acc;
      }, {});
      setCertificateData(certificateTypes);
      setTotalCertificates(certificates.length);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch dashboard data');
      console.error('Failed to fetch dashboard data:', err);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  const employeeChartData = {
    labels: ['Active', 'Inactive'],
    datasets: [
      {
        label: 'Employees',
        data: [employeeData.active, employeeData.inactive],
        backgroundColor: ['#22c55e', '#ef4444'],
        borderColor: ['#16a34a', '#dc2626'],
        borderWidth: 1,
      },
    ],
  };

  const attendanceChartData = {
    labels: Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (6 - i));
      return date.toLocaleDateString('en-US', { weekday: 'short' });
    }),
    datasets: [
      {
        label: 'Present Employees',
        data: attendanceData,
        fill: true,
        backgroundColor: 'rgba(34, 197, 94, 0.2)',
        borderColor: '#22c55e',
        tension: 0.3,
      },
    ],
  };

  const taskChartData = {
    labels: ['Pending', 'In Progress', 'Completed'],
    datasets: [
      {
        data: [taskData.pending, taskData.inProgress, taskData.completed],
        backgroundColor: ['#f59e0b', '#3b82f6', '#22c55e'],
        hoverBackgroundColor: ['#d97706', '#2563eb', '#16a34a'],
      },
    ],
  };

  const certificateChartData = {
    labels: Object.keys(certificateData),
    datasets: [
      {
        data: Object.values(certificateData),
        backgroundColor: ['#22c55e', '#f59e0b', '#3b82f6', '#ef4444'],
        hoverBackgroundColor: ['#16a34a', '#d97706', '#2563eb', '#dc2626'],
      },
    ],
  };

  const navItems = [
    { to: '/admin/admins', title: 'Manage Admins', icon: Users },
    { to: '/admin/employees', title: 'Manage Employees', icon: Users },
    { to: '/admin/employees/create', title: 'Create Employee', icon: Users },
    { to: '/admin/attendance', title: 'Manage Attendance', icon: Calendar },
    { to: '/admin/tasks', title: 'Manage Tasks', icon: CheckCircle },
    { to: '/admin/certificates', title: 'Manage Certificates', icon: Award },
    { to: '/admin/certificate-generator', title: 'Generate Certificate', icon: Award },
    { to: '/admin/licenses', title: 'Manage Licenses', icon: Key },
  ];

  return (
    <div className={`min-h-screen font-inter ${isDarkMode ? 'dark bg-dark-900' : 'bg-gradient-radial'}`}>
      <nav className="bg-primary-500 text-white p-4 shadow-md sticky top-0 z-50">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <button
              className="lg:hidden focus:outline-none"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              aria-label="Toggle sidebar"
            >
              {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <h1 className="text-2xl font-poppins font-bold">Admin Dashboard</h1>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 rounded-full hover:bg-primary-600 transition-colors duration-300"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
            </button>
            <button
              onClick={handleLogout}
              className="bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600 transition-colors duration-300"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="flex">
        <aside
          className={`fixed lg:static inset-y-0 left-0 z-40 w-64 bg-white dark:bg-dark-800 shadow-lg transform ${
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } lg:translate-x-0 transition-transform duration-300 ease-in-out`}
        >
          <div className="p-6">
            <h2 className="text-xl font-poppins font-semibold text-primary-500 dark:text-primary-100 mb-6">
              Navigation
            </h2>
            <nav>
              <ul className="space-y-2">
                {navItems.map((item, index) => (
                  <li key={index}>
                    <Link
                      to={item.to}
                      className="flex items-center space-x-3 p-3 rounded-lg hover:bg-primary-100 dark:hover:bg-dark-700 transition-colors duration-300"
                      onClick={() => setIsSidebarOpen(false)}
                    >
                      <item.icon size={20} className="text-primary-500 dark:text-primary-100" />
                      <span className="text-gray-700 dark:text-gray-300 font-medium">{item.title}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </aside>

        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          ></div>
        )}

        <main className="flex-1 p-6 lg:ml-0">
          <div className="container mx-auto">
            {error && (
              <p className="text-red-500 mb-4 bg-red-100 dark:bg-red-900 p-3 rounded-lg" role="alert">
                {error}
              </p>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {[
                { title: 'Total Employees', value: totalEmployees, icon: Users, color: 'primary-500' },
                { title: 'Total Tasks', value: totalTasks, icon: CheckCircle, color: 'accent-400' },
                { title: 'Today’s Attendance', value: recentAttendance, icon: Calendar, color: 'blue-500' },
                { title: 'Total Certificates', value: totalCertificates, icon: Award, color: 'purple-500' },
              ].map((stat, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-dark-800 p-6 rounded-lg shadow-neon transform transition-all hover:scale-105 border-l-4 border-primary-500"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 dark:text-gray-400 font-medium">{stat.title}</p>
                      <h3 className="text-2xl font-poppins font-bold text-gray-800 dark:text-white">
                        {stat.value}
                      </h3>
                    </div>
                    <stat.icon size={32} className={`text-${stat.color}`} />
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white dark:bg-dark-800 p-6 rounded-lg shadow-lg transform hover:scale-102 transition-transform duration-300">
                <h2 className="text-xl font-poppins font-semibold text-gray-800 dark:text-white mb-4">
                  Employee Statistics
                </h2>
                <div className="h-64">
                  <Bar
                    data={employeeChartData}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: { legend: { display: false } },
                      scales: {
                        y: { beginAtZero: true, title: { display: true, text: 'Count' } },
                        x: { title: { display: true, text: 'Status' } },
                      },
                    }}
                  />
                </div>
              </div>

              <div className="bg-white dark:bg-dark-800 p-6 rounded-lg shadow-lg transform hover:scale-102 transition-transform duration-300">
                <h2 className="text-xl font-poppins font-semibold text-gray-800 dark:text-white mb-4">
                  Attendance Trend (Last 7 Days)
                </h2>
                <div className="h-64">
                  <Line
                    data={attendanceChartData}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: { legend: { position: 'top' } },
                      scales: {
                        y: { beginAtZero: true, title: { display: true, text: 'Present Count' } },
                        x: { title: { display: true, text: 'Day' } },
                      },
                    }}
                  />
                </div>
              </div>

              <div className="bg-white dark:bg-dark-800 p-6 rounded-lg shadow-lg transform hover:scale-102 transition-transform duration-300">
                <h2 className="text-xl font-poppins font-semibold text-gray-800 dark:text-white mb-4">
                  Task Status Distribution
                </h2>
                <div className="h-64 flex justify-center">
                  <Doughnut
                    data={taskChartData}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: { legend: { position: 'top' } },
                    }}
                  />
                </div>
              </div>

              <div className="bg-white dark:bg-dark-800 p-6 rounded-lg shadow-lg transform hover:scale-102 transition-transform duration-300">
                <h2 className="text-xl font-poppins font-semibold text-gray-800 dark:text-white mb-4">
                  Certificate Distribution
                </h2>
                <div className="h-64 flex justify-center">
                  <Pie
                    data={certificateChartData}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: { legend: { position: 'top' } },
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;