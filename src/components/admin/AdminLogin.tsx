import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../api/index';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
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
    <div className="min-h-screen flex items-center justify-center bg-primary-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md transform transition-all hover:scale-105">
        <h2 className="text-3xl font-bold text-center text-primary-500 mb-6">Admin Login</h2>
        {error && (
          <p className="text-red-500 mb-4 text-center bg-red-100 p-2 rounded" role="alert">
            {error}
          </p>
        )}
        <form onSubmit={handleSubmit} aria-labelledby="admin-login-form">
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 mb-2 font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              required
              aria-required="true"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 mb-2 font-medium">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              required
              aria-required="true"
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-primary-500 text-white p-3 rounded-lg hover:bg-primary-600 transition-colors duration-300"
            aria-label="Login"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;