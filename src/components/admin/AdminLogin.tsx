import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../api/index';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await login(email, password);
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-radial dark:bg-dark-gradient p-4 font-inter">
      <div className="bg-white dark:bg-dark-800 p-8 rounded-lg shadow-neon w-full max-w-md transform transition-all hover:scale-105 border-l-4 border-primary-500">
        <h2 className="text-3xl font-poppins font-bold text-center text-primary-500 dark:text-primary-100 mb-6">
          Admin Login
        </h2>
        {error && (
          <p className="text-red-500 mb-4 text-center bg-red-100 dark:bg-red-900 p-2 rounded-lg" role="alert">
            {error}
          </p>
        )}
        <div aria-labelledby="admin-login-form">
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-dark-700 dark:border-gray-600 dark:text-white transition-all duration-300"
              required
              aria-required="true"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-dark-700 dark:border-gray-600 dark:text-white transition-all duration-300"
              required
              aria-required="true"
              placeholder="Enter your password"
            />
          </div>
          <button
            onClick={handleSubmit}
            className="w-full bg-primary-500 text-white p-3 rounded-lg hover:bg-primary-600 transition-colors duration-300 shadow-lg hover:shadow-neon"
            aria-label="Login"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;