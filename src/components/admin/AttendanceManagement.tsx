import { useEffect, useState } from 'react';
import { getAttendance, createAttendance, updateAttendance, deleteAttendance, getEmployees } from '../../lib/db';

const AttendanceManagement: React.FC = () => {
  const [attendance, setAttendance] = useState<any[]>([]);
  const [employees, setEmployees] = useState<any[]>([]);
  const [form, setForm] = useState({
    employee_id: '',
    date: '',
    status: 'Present',
  });
  const [editId, setEditId] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchAttendance = async () => {
    setLoading(true);
    try {
      const data = await getAttendance();
      setAttendance(data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch attendance');
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
    fetchAttendance();
    fetchEmployees();
  }, []);

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (editId) {
        await updateAttendance(editId, form);
        setEditId(null);
      } else {
        await createAttendance(form);
      }
      setForm({ employee_id: '', date: '', status: 'Present' });
      fetchAttendance();
    } catch (err: any) {
      setError(err.message || 'Failed to save attendance');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (record: any) => {
    setEditId(record.id);
    setForm({
      employee_id: record.employee_id,
      date: record.date.split('T')[0],
      status: record.status,
    });
  };

  const handleDelete = async (id: string) => {
    setLoading(true);
    try {
      await deleteAttendance(id);
      fetchAttendance();
    } catch (err: any) {
      setError(err.message || 'Failed to delete attendance');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Manage Attendance</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="mb-6">
        <h3 className="text-xl mb-2">{editId ? 'Edit Attendance' : 'Add Attendance'}</h3>
        <div className="grid grid-cols-3 gap-4">
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
            type="date"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
            className="p-2 border rounded"
            disabled={loading}
          />
          <select
            value={form.status}
            onChange={(e) => setForm({ ...form, status: e.target.value })}
            className="p-2 border rounded"
            disabled={loading}
          >
            <option value="Present">Present</option>
            <option value="Absent">Absent</option>
            <option value="Leave">Leave</option>
          </select>
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
        <h3 className="text-xl mb-2">Attendance List</h3>
        {loading && !attendance.length ? (
          <p>Loading...</p>
        ) : (
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2">Employee</th>
                <th className="border p-2">Date</th>
                <th className="border p-2">Status</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {attendance.map((record) => (
                <tr key={record.id}>
                  <td className="border p-2">{record.employee_name}</td>
                  <td className="border p-2">{new Date(record.date).toLocaleDateString()}</td>
                  <td className="border p-2">{record.status}</td>
                  <td className="border p-2">
                    <button
                      onClick={() => handleEdit(record)}
                      className="p-1 bg-yellow-500 text-white rounded mr-2"
                      disabled={loading}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(record.id)}
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

export default AttendanceManagement;