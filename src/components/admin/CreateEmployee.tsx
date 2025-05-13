import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createEmployee, isValidAdmin } from '../../api/index';

const CreateEmployee = () => {
  const [form, setForm] = useState({ name: '', email: '', position: '', joining_date: '', salary: 0 });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const validateForm = () => {
    if (!form.name.trim()) return 'Name is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return 'Invalid email format';
    if (!form.position.trim()) return 'Position is required';
    if (!form.joining_date) return 'Joining date is required';
    if (form.salary <= 0) return 'Salary must be a positive number';
    return '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      await createEmployee({ ...form, salary: Number(form.salary) });
      setSuccess('Employee created successfully');
      setForm({ name: '', email: '', position: '', joining_date: '', salary: 0 });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create employee');
    }
  };

  return (
    <div className="min-h-screen bg-primary-100 p-6">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-primary-500 mb-6">Create Employee</h1>
        {error && (
          <p className="text-red-500 mb-4 bg-red-100 p-3 rounded-lg" role="alert">
            {error}
          </p>
        )}
        {success && (
          <p className="text-primary-500 mb-4 bg-primary-100 p-3 rounded-lg" role="alert">
            {success}
          </p>
        )}
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} aria-labelledby="create-employee-form">
            <h2 id="create-employee-form" className="text-xl font-semibold text-primary-500 mb-4">
              Create New Employee
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="name" className="block text-gray-700 mb-2 font-medium">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  required
                  aria-required="true"
                  placeholder="Enter name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-gray-700 mb-2 font-medium">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  required
                  aria-required="true"
                  placeholder="Enter email"
                />
              </div>
              <div>
                <label htmlFor="position" className="block text-gray-700 mb-2 font-medium">
                  Position
                </label>
                <input
                  type="text"
                  id="position"
                  value={form.position}
                  onChange={(e) => setForm({ ...form, position: e.target.value })}
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  required
                  aria-required="true"
                  placeholder="Enter position"
                />
              </div>
              <div>
                <label htmlFor="joining_date" className="block text-gray-700 mb-2 font-medium">
                  Joining Date
                </label>
                <input
                  type="date"
                  id="joining_date"
                  value={form.joining_date}
                  onChange={(e) => setForm({ ...form, joining_date: e.target.value })}
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  required
                  aria-required="true"
                />
              </div>
              <div>
                <label htmlFor="salary" className="block text-gray-700 mb-2 font-medium">
                  Salary
                </label>
                <input
                  type="number"
                  id="salary"
                  value={form.salary}
                  onChange={(e) => setForm({ ...form, salary: Number(e.target.value) })}
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  required
                  min="1"
                  aria-required="true"
                  placeholder="Enter salary"
                />
              </div>
            </div>
            <div className="flex justify-end gap-4">
              <button
                type="button"
                onClick={() => navigate('/admin/employees')}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600"
              >
                Create Employee
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateEmployee;