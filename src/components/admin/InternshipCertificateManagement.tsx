import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  getInternshipCertificates, 
  createInternshipCertificate, 
  updateInternshipCertificate, 
  deleteInternshipCertificate, 
  isValidAdmin 
} from '../../api/index';
import { Award, Copy, Check, Plus, Edit2, Trash2, ArrowLeft } from 'lucide-react';

interface InternshipCertificate {
  id: string;
  name: string;
  start_date: string;
  end_date: string;
  domain: string;
  company: string;
  contact: string;
  website: string;
  created_at: string;
}

const InternshipCertificateManagement = () => {
  const [certificates, setCertificates] = useState<InternshipCertificate[]>([]);
  const [form, setForm] = useState({
    name: '',
    start_date: '',
    end_date: '',
    domain: '',
    company: 'tmcybertech',
    contact: '+91 63813 60779',
    website: 'https://tmcybertech.in/',
  });
  const [editId, setEditId] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  
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
      const data = await getInternshipCertificates();
      setCertificates(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch internship certificates');
    }
  };

  const validateForm = () => {
    if (!form.name.trim()) return 'Student Name is required';
    if (!form.start_date) return 'Start Date is required';
    if (!form.end_date) return 'End Date is required';
    if (!form.domain.trim()) return 'Internship Domain is required';
    if (!form.company.trim()) return 'Company Name is required';
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
        await updateInternshipCertificate(editId, form);
        setSuccess('Internship certificate updated successfully');
      } else {
        await createInternshipCertificate(form);
        setSuccess('Internship certificate generated successfully');
      }
      setForm({
        name: '',
        start_date: '',
        end_date: '',
        domain: '',
        company: 'tmcybertech',
        contact: '+91 63813 60779',
        website: 'https://tmcybertech.in/',
      });
      setEditId(null);
      setIsModalOpen(false);
      fetchCertificates();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Operation failed');
    }
  };

  const handleEdit = (cert: InternshipCertificate) => {
    setForm({
      name: cert.name,
      start_date: cert.start_date.split('T')[0],
      end_date: cert.end_date.split('T')[0],
      domain: cert.domain,
      company: cert.company,
      contact: cert.contact,
      website: cert.website,
    });
    setEditId(cert.id);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this internship certificate?')) {
      try {
        await deleteInternshipCertificate(id);
        setSuccess('Internship certificate deleted successfully');
        fetchCertificates();
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to delete certificate');
      }
    }
  };

  const handleCopyLink = (id: string) => {
    const url = `${window.location.origin}/verify/${id}`;
    navigator.clipboard.writeText(url).then(() => {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    });
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans">
      {/* Top Navigation Panel */}
      <header className="bg-slate-800 border-b border-slate-700 px-6 py-4 sticky top-0 z-10 shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate('/admin/dashboard')}
              className="text-slate-400 hover:text-slate-100 transition-colors p-2 rounded-lg hover:bg-slate-700"
              aria-label="Back to dashboard"
            >
              <ArrowLeft size={20} />
            </button>
            <div className="flex items-center space-x-3">
              <Award className="text-amber-500 w-8 h-8" />
              <h1 className="text-2xl font-bold font-poppins bg-gradient-to-r from-amber-400 to-amber-200 bg-clip-text text-transparent">
                Internship Certificate Management
              </h1>
            </div>
          </div>
          <button
            onClick={() => {
              setForm({
                name: '',
                start_date: '',
                end_date: '',
                domain: '',
                company: 'tmcybertech',
                contact: '+91 63813 60779',
                website: 'https://tmcybertech.in/',
              });
              setEditId(null);
              setIsModalOpen(true);
            }}
            className="flex items-center space-x-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-semibold px-5 py-2.5 rounded-xl transition-all duration-300 shadow-lg shadow-amber-500/10 hover:shadow-amber-500/20 active:scale-95"
          >
            <Plus size={18} />
            <span>Generate Certificate</span>
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="container mx-auto px-6 py-8">
        {error && (
          <div className="bg-red-950/50 border border-red-500/30 text-red-300 p-4 rounded-xl mb-6 flex items-center justify-between">
            <span>{error}</span>
            <button onClick={() => setError('')} className="text-red-400 hover:text-red-200">×</button>
          </div>
        )}
        {success && (
          <div className="bg-emerald-950/50 border border-emerald-500/30 text-emerald-300 p-4 rounded-xl mb-6 flex items-center justify-between">
            <span>{success}</span>
            <button onClick={() => setSuccess('')} className="text-emerald-400 hover:text-emerald-200">×</button>
          </div>
        )}

        {/* Certificate List Section */}
        <div className="bg-slate-800 border border-slate-700/60 rounded-2xl shadow-xl overflow-hidden">
          <div className="px-6 py-5 border-b border-slate-700/60 bg-slate-800/50">
            <h2 className="text-lg font-semibold text-slate-200">Generated Certificates</h2>
            <p className="text-sm text-slate-400 mt-1">List of verified internship certificates generated for student programs.</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-800/80 text-slate-400 text-xs font-semibold uppercase tracking-wider border-b border-slate-700/60">
                  <th className="py-4 px-6">Student Name</th>
                  <th className="py-4 px-6">Domain / Program</th>
                  <th className="py-4 px-6">Start Date</th>
                  <th className="py-4 px-6">End Date</th>
                  <th className="py-4 px-6">Company</th>
                  <th className="py-4 px-6 text-center">Public Link</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/50 text-slate-300">
                {certificates.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center py-12 text-slate-500">
                      No internship certificates created yet. Click "Generate Certificate" to create your first one!
                    </td>
                  </tr>
                ) : (
                  certificates.map((cert) => (
                    <tr key={cert.id} className="hover:bg-slate-700/30 transition-colors">
                      <td className="py-4 px-6 font-medium text-slate-200">{cert.name}</td>
                      <td className="py-4 px-6">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-500/10 text-amber-300 border border-amber-500/20">
                          {cert.domain}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-sm text-slate-400">
                        {new Date(cert.start_date).toLocaleDateString(undefined, { dateStyle: 'medium' })}
                      </td>
                      <td className="py-4 px-6 text-sm text-slate-400">
                        {new Date(cert.end_date).toLocaleDateString(undefined, { dateStyle: 'medium' })}
                      </td>
                      <td className="py-4 px-6 text-sm text-slate-400">{cert.company}</td>
                      <td className="py-4 px-6">
                        <div className="flex justify-center">
                          <button
                            onClick={() => handleCopyLink(cert.id)}
                            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                              copiedId === cert.id
                                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                                : 'bg-slate-700 text-slate-300 hover:bg-slate-600 hover:text-slate-100 border border-slate-600'
                            }`}
                          >
                            {copiedId === cert.id ? (
                              <>
                                <Check size={13} />
                                <span>Copied!</span>
                              </>
                            ) : (
                              <>
                                <Copy size={13} />
                                <span>Copy Link</span>
                              </>
                            )}
                          </button>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-right">
                        <div className="flex justify-end space-x-2">
                          <button
                            onClick={() => handleEdit(cert)}
                            className="p-1.5 hover:text-amber-400 rounded-lg hover:bg-slate-700/80 transition-colors text-slate-400"
                            title="Edit Certificate"
                          >
                            <Edit2 size={16} />
                          </button>
                          <button
                            onClick={() => handleDelete(cert.id)}
                            className="p-1.5 hover:text-red-400 rounded-lg hover:bg-slate-700/80 transition-colors text-slate-400"
                            title="Delete Certificate"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Design Modal Form */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className="bg-slate-800 border border-slate-700 rounded-2xl shadow-2xl w-full max-w-xl overflow-hidden transform scale-100 transition-all">
            <div className="px-6 py-5 border-b border-slate-700 flex justify-between items-center bg-slate-800/50">
              <h3 className="text-xl font-bold font-poppins text-slate-200">
                {editId ? 'Update Internship Certificate' : 'Generate Internship Certificate'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-200 text-2xl font-semibold focus:outline-none"
              >
                &times;
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-1.5">
                  Student Name *
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-700 bg-slate-900 text-slate-100 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all placeholder-slate-500"
                  required
                  placeholder="Enter full student name"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-1.5">
                    Start Date (From) *
                  </label>
                  <input
                    type="date"
                    value={form.start_date}
                    onChange={(e) => setForm({ ...form, start_date: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-700 bg-slate-900 text-slate-100 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all text-sm"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-1.5">
                    End Date (To) *
                  </label>
                  <input
                    type="date"
                    value={form.end_date}
                    onChange={(e) => setForm({ ...form, end_date: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-700 bg-slate-900 text-slate-100 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all text-sm"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-1.5">
                  Internship Domain / Program *
                </label>
                <input
                  type="text"
                  value={form.domain}
                  onChange={(e) => setForm({ ...form, domain: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-700 bg-slate-900 text-slate-100 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all placeholder-slate-500"
                  required
                  placeholder="e.g. Full Stack Web Development"
                />
              </div>

              <div className="border-t border-slate-700/60 pt-4 mt-2">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
                  Company Defaults (Optional customization)
                </h4>
                
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Company Name</label>
                    <input
                      type="text"
                      value={form.company}
                      onChange={(e) => setForm({ ...form, company: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-slate-700 bg-slate-900/50 text-slate-200 focus:outline-none focus:border-amber-500 text-sm"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs text-slate-400 mb-1">Contact Number</label>
                      <input
                        type="text"
                        value={form.contact}
                        onChange={(e) => setForm({ ...form, contact: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg border border-slate-700 bg-slate-900/50 text-slate-200 focus:outline-none focus:border-amber-500 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-slate-400 mb-1">Website URL</label>
                      <input
                        type="text"
                        value={form.website}
                        onChange={(e) => setForm({ ...form, website: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg border border-slate-700 bg-slate-900/50 text-slate-200 focus:outline-none focus:border-amber-500 text-sm"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-700">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-slate-100 transition-colors font-medium text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-semibold px-6 py-2.5 rounded-xl transition-all duration-300 text-sm"
                >
                  {editId ? 'Save Changes' : 'Generate Certificate'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default InternshipCertificateManagement;
