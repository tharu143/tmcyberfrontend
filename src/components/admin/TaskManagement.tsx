import { useEffect, useState } from 'react';
import { getTasks, createTask, updateTask, deleteTask, getEmployees } from '../../lib/db';

const TaskManagement: React.FC = () => {
  const [tasks, setTasks] = useState<any[]>([]);
  const [employees, setEmployees] = useState<any[]>([]);
  const [form, setForm] = useState({
    employee_id: '',
    title: '',
    description: '',
    status: 'Pending',
    due_date: '',
  });
  const [editId, setEditId] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const data = await getTasks();
      setTasks(data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  };

  const fetchEmployees = async () => {
    try {
      const data = await getEmployees();
      setEmployees(data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch employees');
    }
  };

  useEffect(() => {
    fetchTasks();
    fetchEmployees();
  }, []);

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (editId) {
        await updateTask(editId, form);
        setEditId(null);
      } else {
        await createTask(form);
      }
      setForm({ employee_id: '', title: '', description: '', status: 'Pending', due_date: '' });
      fetchTasks();
    } catch (err: any) {
      setError(err.message || 'Failed to save task');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (task: any) => {
    setEditId(task.id);
    setForm({
      employee_id: task.employee_id,
      title: task.title,
      description: task.description,
      status: task.status,
      due_date: task.due_date.split('T')[0],
    });
  };

  const handleDelete = async (id: string) => {
    setLoading(true);
    try {
      await deleteTask(id);
      fetchTasks();
    } catch (err: any) {
      setError(err.message || 'Failed to delete task');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Manage Tasks</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="mb-6">
        <h3 className="text-xl mb-2">{editId ? 'Edit Task' : 'Add Task'}</h3>
        <div className="grid grid-cols-2 gap-4">
          <select
            value={form.employee_id}
            onChange={(e) => setForm({ ...form, employee_id: e.target.value })}
            className="p-2 border rounded"
            disabled={loading}
          >
            <option value="">Select Employee</option>
            {employees.map((employee) => (
              <option key={employee.id} value={employee.id}>{employee.name}</option>
            ))}
          </select>
          <input
            type="text"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            placeholder="Title"
            className="p-2 border rounded"
            disabled={loading}
          />
          <textarea
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            placeholder="Description"
            className="p-2 border rounded col-span-2"
            disabled={loading}
          />
          <select
            value={form.status}
            onChange={(e) => setForm({ ...form, status: e.target.value })}
            className="p-2 border rounded"
            disabled={loading}
          >
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
          <input
            type="date"
            value={form.due_date}
            onChange={(e) => setForm({ ...form, due_date: e.target.value })}
            className="p-2 border rounded"
            disabled={loading}
          />
          <button
            onClick={handleSubmit}
            className={`p-2 rounded text-white ${loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
            disabled={loading}
          >
            {loading ? 'Saving...' : editId ? 'Update' : 'Add'}
          </button>
        </div>
      </div>
      <div>
        <h3 className="text-xl mb-2">Task List</h3>
        {loading && !tasks.length ? (
          <p>Loading...</p>
        ) : (
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2">Employee</th>
                <th className="border p-2">Title</th>
                <th className="border p-2">Description</th>
                <th className="border p-2">Status</th>
                <th className="border p-2">Due Date</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => (
                <tr key={task.id}>
                  <td className="border p-2">{task.employee_name}</td>
                  <td className="border p-2">{task.title}</td>
                  <td className="border p-2">{task.description}</td>
                  <td className="border p-2">{task.status}</td>
                  <td className="border p-2">{new Date(task.due_date).toLocaleDateString()}</td>
                  <td className="border p-2">
                    <button
                      onClick={() => handleEdit(task)}
                      className="p-1 bg-yellow-500 text-white rounded mr-2"
                      disabled={loading}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(task.id)}
                      className="p-1 bg-red-500 text-white rounded"
                      disabled={loading}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default TaskManagement;