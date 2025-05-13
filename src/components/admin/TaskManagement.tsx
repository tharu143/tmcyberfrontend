import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getTasks, createTask, updateTask, deleteTask, getEmployees, isValidAdmin } from '../../api/index';

interface Task {
  id: string;
  employee_id: string;
  employee_name: string;
  title: string;
  description: string;
  due_date: string;
  status: string;
  created_at: string;
}

interface Employee {
  id: string;
  name: string;
}

const TaskManagement = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [form, setForm] = useState({ employee_id: '', title: '', description: '', due_date: '', status: '' });
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
        fetchData();
      }
    };
    checkAuth();
  }, [navigate]);

  const fetchData = async () => {
    try {
      const [taskData, employeeData] = await Promise.all([getTasks(), getEmployees()]);
      setTasks(taskData);
      setEmployees(employeeData.map((emp) => ({ id: emp.id, name: emp.name })));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch data');
    }
  };

  const validateForm = () => {
    if (!form.employee_id) return 'Employee is required';
    if (!form.title.trim()) return 'Title is required';
    if (!form.description.trim()) return 'Description is required';
    if (!form.due_date) return 'Due date is required';
    if (!form.status) return 'Status is required';
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
        await updateTask(editId, form);
        setSuccess('Task updated successfully');
      } else {
        await createTask(form);
        setSuccess('Task created successfully');
      }
      setForm({ employee_id: '', title: '', description: '', due_date: '', status: '' });
      setEditId(null);
      setIsModalOpen(false);
      fetchData();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Operation failed');
    }
  };

  const handleEdit = (task: Task) => {
    setForm({
      employee_id: task.employee_id,
      title: task.title,
      description: task.description,
      due_date: task.due_date.split('T')[0],
      status: task.status,
    });
    setEditId(task.id);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await deleteTask(id);
        setSuccess('Task deleted successfully');
        fetchData();
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to delete task');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-radial dark:bg-dark-gradient p-6 font-inter">
      <div className="container mx-auto">
        <h1 className="text-3xl font-poppins font-bold text-primary-500 dark:text-primary-100 mb-6">
          Manage Tasks
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
          onClick={() => {
            setForm({ employee_id: '', title: '', description: '', due_date: '', status: '' });
            setEditId(null);
            setIsModalOpen(true);
          }}
          className="mb-6 bg-primary-500 text-white px-6 py-2 rounded-lg hover:bg-primary-600 transition-colors duration-300 shadow-lg hover:shadow-neon"
        >
          Create Task
        </button>
        <div className="bg-white dark:bg-dark-800 rounded-lg shadow-lg overflow-x-auto transform hover:scale-101 transition-transform duration-300">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-primary-500 text-white">
                <th className="p-3 text-left">Employee</th>
                <th className="p-3 text-left">Title</th>
                <th className="p-3 text-left">Description</th>
                <th className="p-3 text-left">Due Date</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => (
                <tr key={task.id} className="hover:bg-primary-100 dark:hover:bg-dark-700 transition-colors duration-200">
                  <td className="p-3 border-b text-gray-700 dark:text-gray-300">{task.employee_name}</td>
                  <td className="p-3 border-b text-gray-700 dark:text-gray-300">{task.title}</td>
                  <td className="p-3 border-b text-gray-700 dark:text-gray-300">{task.description}</td>
                  <td className="p-3 border-b text-gray-700 dark:text-gray-300">
                    {new Date(task.due_date).toLocaleDateString()}
                  </td>
                  <td className="p-3 border-b text-gray-700 dark:text-gray-300">{task.status}</td>
                  <td className="p-3 border-b">
                    <button
                      onClick={() => handleEdit(task)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded-lg mr-2 hover:bg-yellow-600 transition-colors duration-300 shadow-sm hover:shadow-neon"
                      aria-label={`Edit task ${task.title}`}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(task.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition-colors duration-300 shadow-sm hover:shadow-neon"
                      aria-label={`Delete task ${task.title}`}
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
            <div className="bg-white dark:bg-dark-800 p-6 rounded-lg shadow-lg w-full max-w-lg border-l-4 border-primary-500">
              <h2 className="text-2xl font-poppins font-bold text-primary-500 dark:text-primary-100 mb-4">
                {editId ? 'Update Task' : 'Create Task'}
              </h2>
              <div>
                <div className="mb-4">
                  <label htmlFor="employee_id" className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">
                    Employee
                  </label>
                  <select
                    id="employee_id"
                    value={form.employee_id}
                    onChange={(e) => setForm({ ...form, employee_id: e.target.value })}
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-dark-700 dark:border-gray-600 dark:text-white transition-all duration-300"
                    required
                    aria-required="true"
                  >
                    <option value="">Select Employee</option>
                    {employees.map((emp) => (
                      <option key={emp.id} value={emp.id}>
                        {emp.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-4">
                  <label htmlFor="title" className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">
                    Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-dark-700 dark:border-gray-600 dark:text-white transition-all duration-300"
                    required
                    aria-required="true"
                    placeholder="Enter task title"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="description" className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">
                    Description
                  </label>
                  <textarea
                    id="description"
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-dark-700 dark:border-gray-600 dark:text-white transition-all duration-300"
                    required
                    aria-required="true"
                    placeholder="Enter task description"
                    rows={4}
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="due_date" className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">
                    Due Date
                  </label>
                  <input
                    type="date"
                    id="due_date"
                    value={form.due_date}
                    onChange={(e) => setForm({ ...form, due_date: e.target.value })}
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-dark-700 dark:border-gray-600 dark:text-white transition-all duration-300"
                    required
                    aria-required="true"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="status" className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">
                    Status
                  </label>
                  <select
                    id="status"
                    value={form.status}
                    onChange={(e) => setForm({ ...form, status: e.target.value })}
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-dark-700 dark:border-gray-600 dark:text-white transition-all duration-300"
                    required
                    aria-required="true"
                  >
                    <option value="">Select Status</option>
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                  </select>
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
                    {editId ? 'Update' : 'Create'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskManagement;