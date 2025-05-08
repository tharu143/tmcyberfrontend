import { useEffect, useState } from 'react';
import { getCertificates, createCertificate, updateCertificate, deleteCertificate } from '../../lib/db';

const CertificateManagement: React.FC = () => {
  const [certificates, setCertificates] = useState<any[]>([]);
  const [form, setForm] = useState({
    name: '',
    start_date: '',
    end_date: '',
    type: '',
  });
  const [editId, setEditId] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchCertificates = async () => {
    setLoading(true);
    try {
      const data = await getCertificates();
      setCertificates(data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch certificates');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCertificates();
  }, []);

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (editId) {
        await updateCertificate(editId, form);
        setEditId(null);
      } else {
        await createCertificate(form);
      }
      setForm({ name: '', start_date: '', end_date: '', type: '' });
      fetchCertificates();
    } catch (err: any) {
      setError(err.message || 'Failed to save certificate');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (certificate: any) => {
    setEditId(certificate.id);
    setForm({
      name: certificate.name,
      start_date: certificate.start_date.split('T')[0],
      end_date: certificate.end_date.split('T')[0],
      type: certificate.type,
    });
  };

  const handleDelete = async (id: string) => {
    setLoading(true);
    try {
      await deleteCertificate(id);
      fetchCertificates();
    } catch (err: any) {
      setError(err.message || 'Failed to delete certificate');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Manage Certificates</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="mb-6">
        <h3 className="text-xl mb-2">{editId ? 'Edit Certificate' : 'Add Certificate'}</h3>
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
            type="date"
            value={form.start_date}
            onChange={(e) => setForm({ ...form, start_date: e.target.value })}
            placeholder="Start Date"
            className="p-2 border rounded"
            disabled={loading}
          />
          <input
            type="date"
            value={form.end_date}
            onChange={(e) => setForm({ ...form, end_date: e.target.value })}
            placeholder="End Date"
            className="p-2 border rounded"
            disabled={loading}
          />
          <input
            type="text"
            value={form.type}
            onChange={(e) => setForm({ ...form, type: e.target.value })}
            placeholder="Type"
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
        <h3 className="text-xl mb-2">Certificate List</h3>
        {loading && !certificates.length ? (
          <p>Loading...</p>
        ) : (
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2">Name</th>
                <th className="border p-2">Start Date</th>
                <th className="border p-2">End Date</th>
                <th className="border p-2">Type</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {certificates.map((certificate) => (
                <tr key={certificate.id}>
                  <td className="border p-2">{certificate.name}</td>
                  <td className="border p-2">{new Date(certificate.start_date).toLocaleDateString()}</td>
                  <td className="border p-2">{new Date(certificate.end_date).toLocaleDateString()}</td>
                  <td className="border p-2">{certificate.type}</td>
                  <td className="border p-2">
                    <button
                      onClick={() => handleEdit(certificate)}
                      className="p-1 bg-yellow-500 text-white rounded mr-2"
                      disabled={loading}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(certificate.id)}
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

export default CertificateManagement;