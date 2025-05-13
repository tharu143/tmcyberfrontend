import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCertificates, createCertificate, updateCertificate, deleteCertificate, isValidAdmin } from '../../api/index';

interface Certificate {
  id: string;
  name: string;
  start_date: string;
  end_date: string;
  type: string;
  created_at: string;
}

const CertificateManagement = () => {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [form, setForm] = useState({ name: '', start_date: '', end_date: '', type: '' });
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
        fetchCertificates();
      }
    };
    checkAuth();
  }, [navigate]);

  const fetchCertificates = async () => {
    try {
      const data = await getCertificates();
      setCertificates(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch certificates');
    }
  };

  const validateForm = () => {
    if (!form.name.trim()) return 'Certificate name is required';
    if (!form.start_date) return 'Start date is required';
    if (!form.end_date) return 'End date is required';
    if (!form.type.trim()) return 'Type is required';
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
        await updateCertificate(editId, form);
        setSuccess('Certificate updated successfully');
      } else {
        await createCertificate(form);
        setSuccess('Certificate created successfully');
      }
      setForm({ name: '', start_date: '', end_date: '', type: '' });
      setEditId(null);
      setIsModalOpen(false);
      fetchCertificates();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Operation failed');
    }
  };

  const handleEdit = (certificate: Certificate) => {
    setForm({
      name: certificate.name,
      start_date: certificate.start_date.split('T')[0],
      end_date: certificate.end_date.split('T')[0],
      type: certificate.type,
    });
    setEditId(certificate.id);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this certificate?')) {
      try {
        await deleteCertificate(id);
        setSuccess('Certificate deleted successfully');
        fetchCertificates();
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to delete certificate');
      }
    }
  };

  return (
    <div className="min-h-screen bg-primary-100 p-6">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-primary-500 mb-6">Manage Certificates</h1>
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
            setForm({ name: '', start_date: '', end_date: '', type: '' });
            setEditId(null);
            setIsModalOpen(true);
          }}
          className="mb-6 bg-primary-500 text-white px-6 py-2 rounded-lg hover:bg-primary-600 transition-colors duration-300"
        >
          Create Certificate
        </button>
        <div className="bg-white rounded-lg shadow-lg overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-primary-500 text-white">
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Start Date</th>
                <th className="p-3 text-left">End Date</th>
                <th className="p-3 text-left">Type</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {certificates.map((certificate) => (
                <tr key={certificate.id} className="hover:bg-primary-100 transition-colors duration-200">
                  <td className="p-3 border-b">{certificate.name}</td>
                  <td className="p-3 border-b">{new Date(certificate.start_date).toLocaleDateString()}</td>
                  <td className="p-3 border-b">{new Date(certificate.end_date).toLocaleDateString()}</td>
                  <td className="p-3 border-b">{certificate.type}</td>
                  <td className="p-3 border-b">
                    <button
                      onClick={() => handleEdit(certificate)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded-lg mr-2 hover:bg-yellow-600 transition-colors duration-300"
                      aria-label={`Edit certificate ${certificate.name}`}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(certificate.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition-colors duration-300"
                      aria-label={`Delete certificate ${certificate.name}`}
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
                {editId ? 'Update Certificate' : 'Create Certificate'}
              </h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="name" className="block text-gray-700 mb-2 font-medium">
                    Certificate Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    required
                    aria-required="true"
                    placeholder="Enter certificate name"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="start_date" className="block text-gray-700 mb-2 font-medium">
                    Start Date
                  </label>
                  <input
                    type="date"
                    id="start_date"
                    value={form.start_date}
                    onChange={(e) => setForm({ ...form, start_date: e.target.value })}
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    required
                    aria-required="true"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="end_date" className="block text-gray-700 mb-2 font-medium">
                    End Date
                  </label>
                  <input
                    type="date"
                    id="end_date"
                    value={form.end_date}
                    onChange={(e) => setForm({ ...form, end_date: e.target.value })}
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    required
                    aria-required="true"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="type" className="block text-gray-700 mb-2 font-medium">
                    Type
                  </label>
                  <input
                    type="text"
                    id="type"
                    value={form.type}
                    onChange={(e) => setForm({ ...form, type: e.target.value })}
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    required
                    aria-required="true"
                    placeholder="Enter certificate type"
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

export default CertificateManagement;