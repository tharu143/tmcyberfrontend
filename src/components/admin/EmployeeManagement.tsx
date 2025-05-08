import { useEffect, useState } from 'react';
import { getEmployees, createEmployee, updateEmployee, deleteEmployee } from '../../lib/db';

const EmployeeManagement: React.FC = () => {
  const [employees, setEmployees] = useState<any[]>([]);
  const [form, setForm] = useState({
    name: '',
    email: '',
    position: '',
    joining_date: '',
    salary: 0,
  });
  const [editId, setEditId] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchEmployees = async () => {
    setLoading(true);
    try {
      const data = await getEmployees();
      setEmployees(data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch employees');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (editId) {
        await updateEmployee(editId, { ...form, salary: Number(form.salary) });
        setEditId(null);
      } else {
        await createEmployee({ ...form, salary: Number(form.salary) });
      }
      setForm({ name: '', email: '', position: '', joining_date: '', salary: 0 });
      fetchEmployees();
    } catch (err: any) {
      setError(err.message || 'Failed to save employee');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (employee: any) => {
    setEditId(employee.id);
    setForm({
      name: employee.name,
      email: employee.email,
      position: employee.position,
      joining_date: employee.joining_date.split('T')[0], // Format date for input
      salary: employee.salary,
    });
  };

  const handleDelete = async (id: string) => {
    setLoading(true);
    try {
      await deleteEmployee(id);
      fetchEmployees();
    } catch (err: any) {
      setError(err.message || 'Failed to delete employee');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Manage Employees</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="mb-6">
        <h3 className="text-xl mb-2">{editId ? 'Edit Employee' : 'Add Employee'}</h3>
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Name"
            className="p-2 border rounded"
            disabled={loading}
          />
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="Email"
            className="p-2 border rounded"
            disabled={loading}
          />
          <input
            type="text"
            value={form.position}
            onChange={(e) => setForm({ ...form, position: e.target.value })}
            placeholder="Position"
            className="p-2 border rounded"
            disabled={loading}
          />
          <input
            type="date"
            value={form.joining_date}
            onChange={(e) => setForm({ ...form, joining_date: e.target.value })}
            className="p-2 border rounded"
            disabled={loading}
          />
          <input
            type="number"
            value={form.salary}
            onChange={(e) => setForm({ ...form, salary: Number(e.target.value) })}
            placeholder="Salary"
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
        <h3 className="text-xl mb-2">Employee List</h3>
        {loading && !employees.length ? (
          <p>Loading...</p>
        ) : (
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2">Name</th>
                <th className="border p-2">Email</th>
                <th className="border p-2">Position</th>
                <th className="border p-2">Joining Date</th>
                <th className="border p-2">Salary</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee) => (
                <tr key={employee.id}>
                  <td className="border p-2">{employee.name}</td>
                  <td className="border p-2">{employee.email}</td>
                  <td className="border p-2">{employee.position}</td>
                  <td className="border p-2">{new Date(employee.joining_date).toLocaleDateString()}</td>
                  <td className="border p-2">{employee.salary}</td>
                  <td className="border p-2">
                    <button
                      onClick={() => handleEdit(employee)}
                      className="p-1 bg-yellow-500 text-white rounded mr-2"
                      disabled={loading}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(employee.id)}
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

export default EmployeeManagement;