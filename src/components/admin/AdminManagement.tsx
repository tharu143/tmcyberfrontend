import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAdmins, createAdmin, updateAdmin, deleteAdmin, isValidAdmin } from '../../api/index';

interface Admin {
  id: string;
  email: string;
  created_at: string;
}

const AdminManagement = () => {
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [form, setForm] = useState({ email: '', password: '' });
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
        fetchAdmins();
      }
    };
    checkAuth();
  }, [navigate]);

  const fetchAdmins = async () => {
    try {
      const data = await getAdmins();
      setAdmins(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch admins');
    }
  };

  const validateForm = () => {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return 'Invalid email format';
    if (!editId && !form.password) return 'Password is required for new admins';
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
      if (editId) {
        await updateAdmin(editId, form.email, form.password || undefined);
        setSuccess('Admin updated successfully');
      } else {
        await createAdmin(form.email, form.password);
        setSuccess('Admin created successfully');
      }
      setForm({ email: '', password: '' });
      setEditId(null);
      setIsModalOpen(false);
      fetchAdmins();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Operation failed');
    }
  };

  const handleEdit = (admin: Admin) => {
    setForm({ email: admin.email, password: '' });
    setEditId(admin.id);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this admin?')) {
      try {
        await deleteAdmin(id);
        setSuccess('Admin deleted successfully');
        fetchAdmins();
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to delete admin');
      }
    }
  };

  return (
    <div className="min-h-screen bg-primary-100 p-6">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-primary-500 mb-6">Manage Admins</h1>
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
        <button
          onClick={() => {
            setForm({ email: '', password: '' });
            setEditId(null);
            setIsModalOpen(true);
          }}
          className="mb-6 bg-primary-500 text-white px-6 py-2 rounded-lg hover:bg-primary-600 transition-colors duration-300"
        >
          Create Admin
        </button>
        <div className="bg-white rounded-lg shadow-lg overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-primary-500 text-white">
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Created At</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {admins.map((admin) => (
                <tr key={admin.id} className="hover:bg-primary-100 transition-colors duration-200">
                  <td className="p-3 border-b">{admin.email}</td>
                  <td className="p-3 border-b">{new Date(admin.created_at).toLocaleString()}</td>
                  <td className="p-3 border-b">
                    <button
                      onClick={() => handleEdit(admin)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded-lg mr-2 hover:bg-yellow-600 transition-colors duration-300"
                      aria-label={`Edit ${admin.email}`}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(admin.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition-colors duration-300"
                      aria-label={`Delete ${admin.email}`}
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
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
              <h2 className="text-2xl font-bold text-primary-500 mb-4">
                {editId ? 'Update Admin' : 'Create Admin'}
              </h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
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
                <div className="mb-4">
                  <label htmlFor="password" className="block text-gray-700 mb-2 font-medium">
                    Password {editId && '(optional)'}
                  </label>
                  <input
                    type="password"
                    id="password"
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    required={!editId}
                    placeholder="Enter password"
                  />
                </div>
                <div className="flex justify-end gap-4">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600"
                  >
                    {editId ? 'Update' : 'Create'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminManagement;