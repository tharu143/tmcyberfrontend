import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAttendance, createAttendance, updateAttendance, deleteAttendance, getEmployees, isValidAdmin } from '../../api/index';

interface Attendance {
  id: string;
  employee_id: string;
  employee_name: string;
  date: string;
  status: string;
  created_at: string;
}

interface Employee {
  id: string;
  name: string;
}

const AttendanceManagement = () => {
  const [attendance, setAttendance] = useState<Attendance[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [form, setForm] = useState({ employee_id: '', date: '', status: '' });
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
      const [attendanceData, employeeData] = await Promise.all([getAttendance(), getEmployees()]);
      setAttendance(attendanceData);
      setEmployees(employeeData.map((emp) => ({ id: emp.id, name: emp.name })));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch data');
    }
  };

  const validateForm = () => {
    if (!form.employee_id) return 'Employee is required';
    if (!form.date) return 'Date is required';
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
        await updateAttendance(editId, form);
        setSuccess('Attendance updated successfully');
      } else {
        await createAttendance(form);
        setSuccess('Attendance created successfully');
      }
      setForm({ employee_id: '', date: '', status: '' });
      setEditId(null);
      setIsModalOpen(false);
      fetchData();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Operation failed');
    }
  };

  const handleEdit = (record: Attendance) => {
    setForm({
      employee_id: record.employee_id,
      date: record.date.split('T')[0],
      status: record.status,
    });
    setEditId(record.id);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this attendance record?')) {
      try {
        await deleteAttendance(id);
        setSuccess('Attendance deleted successfully');
        fetchData();
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to delete attendance');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-radial dark:bg-dark-gradient p-6 font-inter">
      <div className="container mx-auto">
        <h1 className="text-3xl font-poppins font-bold text-primary-500 dark:text-primary-100 mb-6">
          Manage Attendance
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
            setForm({ employee_id: '', date: '', status: '' });
            setEditId(null);
            setIsModalOpen(true);
          }}
          className="mb-6 bg-primary-500 text-white px-6 py-2 rounded-lg hover:bg-primary-600 transition-colors duration-300 shadow-lg hover:shadow-neon"
        >
          Create Attendance
        </button>
        <div className="bg-white dark:bg-dark-800 rounded-lg shadow-lg overflow-x-auto transform hover:scale-101 transition-transform duration-300">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-primary-500 text-white">
                <th className="p-3 text-left">Employee</th>
                <th className="p-3 text-left">Date</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {attendance.map((record) => (
                <tr key={record.id} className="hover:bg-primary-100 dark:hover:bg-dark-700 transition-colors duration-200">
                  <td className="p-3 border-b text-gray-700 dark:text-gray-300">{record.employee_name}</td>
                  <td className="p-3 border-b text-gray-700 dark:text-gray-300">
                    {new Date(record.date).toLocaleDateString()}
                  </td>
                  <td className="p-3 border-b text-gray-700 dark:text-gray-300">{record.status}</td>
                  <td className="p-3 border-b">
                    <button
                      onClick={() => handleEdit(record)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded-lg mr-2 hover:bg-yellow-600 transition-colors duration-300 shadow-sm hover:shadow-neon"
                      aria-label={`Edit attendance for ${record.employee_name}`}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(record.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition-colors duration-300 shadow-sm hover:shadow-neon"
                      aria-label={`Delete attendance for ${record.employee_name}`}
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
            <div className="bg-white dark:bg-dark-800 p-6 rounded-lg shadow-lg w-full max-w-md border-l-4 border-primary-500">
              <h2 className="text-2xl font-poppins font-bold text-primary-500 dark:text-primary-100 mb-4">
                {editId ? 'Update Attendance' : 'Create Attendance'}
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
                  <label htmlFor="date" className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">
                    Date
                  </label>
                  <input
                    type="date"
                    id="date"
                    value={form.date}
                    onChange={(e) => setForm({ ...form, date: e.target.value })}
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
                    <option value="Present">Present</option>
                    <option value="Absent">Absent</option>
                    <option value="Leave">Leave</option>
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

export default AttendanceManagement;