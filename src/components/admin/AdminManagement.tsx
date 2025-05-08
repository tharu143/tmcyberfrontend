import { useEffect, useState } from 'react';
import { getAdmins, createAdmin, updateAdmin, deleteAdmin } from '../../lib/db';

const AdminManagement: React.FC = () => {
  const [admins, setAdmins] = useState<any[]>([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [editId, setEditId] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchAdmins = async () => {
    setLoading(true);
    try {
      const data = await getAdmins();
      setAdmins(data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch admins');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (editId) {
        await updateAdmin(editId, email, password || undefined);
        setEditId(null);
      } else {
        await createAdmin(email, password);
      }
      setEmail('');
      setPassword('');
      fetchAdmins();
    } catch (err: any) {
      setError(err.message || 'Failed to save admin');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (admin: any) => {
    setEditId(admin.id);
    setEmail(admin.email);
    setPassword('');
  };

  const handleDelete = async (id: string) => {
    setLoading(true);
    try {
      await deleteAdmin(id);
      fetchAdmins();
    } catch (err: any) {
      setError(err.message || 'Failed to delete admin');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Manage Admins</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="mb-6">
        <h3 className="text-xl mb-2">{editId ? 'Edit Admin' : 'Add Admin'}</h3>
        <div className="flex gap-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="p-2 border rounded flex-1"
            disabled={loading}
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={editId ? 'New Password (optional)' : 'Password'}
            className="p-2 border rounded flex-1"
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
        <h3 className="text-xl mb-2">Admin List</h3>
        {loading && !admins.length ? (
          <p>Loading...</p>
        ) : (
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2">Email</th>
                <th className="border p-2">Created At</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {admins.map((admin) => (
                <tr key={admin.id}>
                  <td className="border p-2">{admin.email}</td>
                  <td className="border p-2">{new Date(admin.created_at).toLocaleString()}</td>
                  <td className="border p-2">
                    <button
                      onClick={() => handleEdit(admin)}
                      className="p-1 bg-yellow-500 text-white rounded mr-2"
                      disabled={loading}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(admin.id)}
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

export default AdminManagement;