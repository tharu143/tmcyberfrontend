import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getEmployees, updateEmployee, deleteEmployee, isValidAdmin } from '../../api/index';

interface Employee {
  id: string;
  name: string;
  email: string;
  position: string;
  joining_date: string;
  salary: number;
  created_at: string;
}

const EmployeeManagement = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [form, setForm] = useState({ name: '', email: '', position: '', joining_date: '', salary: 0 });
  const [editId, setEditId] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const isValid = await isValidAdmin();
      if (!isValid) {
        navigate('/admin/login');
      } else {
        fetchEmployees();
      }
    };
    checkAuth();
  }, [navigate]);

  const fetchEmployees = async () => {
    try {
      const data = await getEmployees();
      setEmployees(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch employees');
    }
  };

  const validateForm = () => {
    if (!form.name.trim()) return 'Name is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return 'Invalid email format';
    if (!form.position.trim()) return 'Position is required';
    if (!form.joining_date) return 'Joining date is required';
    if (form.salary <= 0) return 'Salary must be a positive number';
    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      if (editId) {
        await updateEmployee(editId, { ...form, salary: Number(form.salary) });
        setSuccess('Employee updated successfully');
      }
      setForm({ name: '', email: '', position: '', joining_date: '', salary: 0 });
      setEditId(null);
      setIsModalOpen(false);
      fetchEmployees();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Operation failed');
    }
  };

  const handleEdit = (employee: Employee) => {
    setForm({
      name: employee.name,
      email: employee.email,
      position: employee.position,
      joining_date: employee.joining_date.split('T')[0],
      salary: employee.salary,
    });
    setEditId(employee.id);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      try {
        await deleteEmployee(id);
        setSuccess('Employee deleted successfully');
        fetchEmployees();
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to delete employee');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-radial dark:bg-dark-gradient p-6 font-inter">
      <div className="container mx-auto">
        <h1 className="text-3xl font-poppins font-bold text-primary-500 dark:text-primary-100 mb-6">
          Manage Employees
        </h1>
        {error && (
          <p className="text-red-500 mb-4 bg-red-100 dark:bg-red-900 p-3 rounded-lg" role="alert">
            {error}
          </p>
        )}
        {success && (
          <p className="text-primary-500 dark:text-primary-100 mb-4 bg-primary-100 dark:bg-dark-700 p-3 rounded-lg" role="alert">
            {success}
          </p>
        )}
        <button
          onClick={() => navigate('/admin/employees/create')}
          className="mb-6 bg-primary-500 text-white px-6 py-2 rounded-lg hover:bg-primary-600 transition-colors duration-300 shadow-lg hover:shadow-neon"
        >
          Create Employee
        </button>
        <div className="bg-white dark:bg-dark-800 rounded-lg shadow-lg overflow-x-auto transform hover:scale-101 transition-transform duration-300">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-primary-500 text-white">
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Position</th>
                <th className="p-3 text-left">Joining Date</th>
                <th className="p-3 text-left">Salary</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee) => (
                <tr key={employee.id} className="hover:bg-primary-100 dark:hover:bg-dark-700 transition-colors duration-200">
                  <td className="p-3 border-b text-gray-700 dark:text-gray-300">{employee.name}</td>
                  <td className="p-3 border-b text-gray-700 dark:text-gray-300">{employee.email}</td>
                  <td className="p-3 border-b text-gray-700 dark:text-gray-300">{employee.position}</td>
                  <td className="p-3 border-b text-gray-700 dark:text-gray-300">
                    {new Date(employee.joining_date).toLocaleDateString()}
                  </td>
                  <td className="p-3 border-b text-gray-700 dark:text-gray-300">{employee.salary}</td>
                  <td className="p-3 border-b">
                    <button
                      onClick={() => handleEdit(employee)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded-lg mr-2 hover:bg-yellow-600 transition-colors duration-300 shadow-sm hover:shadow-neon"
                      aria-label={`Edit employee ${employee.name}`}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(employee.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition-colors duration-300 shadow-sm hover:shadow-neon"
                      aria-label={`Delete employee ${employee.name}`}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-dark-800 p-6 rounded-lg shadow-lg w-full max-w-2xl border-l-4 border-primary-500">
              <h2 className="text-2xl font-poppins font-bold text-primary-500 dark:text-primary-100 mb-4">
                Update Employee
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="name" className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-dark-700 dark:border-gray-600 dark:text-white transition-all duration-300"
                    required
                    aria-required="true"
                    placeholder="Enter name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-dark-700 dark:border-gray-600 dark:text-white transition-all duration-300"
                    required
                    aria-required="true"
                    placeholder="Enter email"
                  />
                </div>
                <div>
                  <label htmlFor="position" className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">
                    Position
                  </label>
                  <input
                    type="text"
                    id="position"
                    value={form.position}
                    onChange={(e) => setForm({ ...form, position: e.target.value })}
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-dark-700 dark:border-gray-600 dark:text-white transition-all duration-300"
                    required
                    aria-required="true"
                    placeholder="Enter position"
                  />
                </div>
                <div>
                  <label htmlFor="joining_date" className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">
                    Joining Date
                  </label>
                  <input
                    type="date"
                    id="joining_date"
                    value={form.joining_date}
                    onChange={(e) => setForm({ ...form, joining_date: e.target.value })}
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-dark-700 dark:border-gray-600 dark:text-white transition-all duration-300"
                    required
                    aria-required="true"
                  />
                </div>
                <div>
                  <label htmlFor="salary" className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">
                    Salary
                  </label>
                  <input
                    type="number"
                    id="salary"
                    value={form.salary}
                    onChange={(e) => setForm({ ...form, salary: Number(e.target.value) })}
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-dark-700 dark:border-gray-600 dark:text-white transition-all duration-300"
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
                  onClick={() => setIsModalOpen(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors duration-300 shadow-sm hover:shadow-neon"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  className="bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600 transition-colors duration-300 shadow-sm hover:shadow-neon"
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployeeManagement;