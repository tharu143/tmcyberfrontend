import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getEmployees, isValidAdmin } from '../../api/index';
import jsPDF from 'jspdf';

interface Employee {
  id: string;
  name: string;
}

const CertificateGenerator = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [form, setForm] = useState({
    employee_id: '',
    certificate_name: '',
    issue_date: '',
    signatory_name: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const isValid = await isValidAdmin();
      if (!isValid) {
        navigate('/admin/login');
      } else {
        fetchEmployees();
      }
    };
    checkAuth();
  }, [navigate]);

  const fetchEmployees = async () => {
    try {
      const data = await getEmployees();
      setEmployees(data.map((emp: any) => ({ id: emp.id, name: emp.name })));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch employees');
    }
  };

  const validateForm = () => {
    if (!form.employee_id) return 'Employee is required';
    if (!form.certificate_name.trim()) return 'Certificate name is required';
    if (!form.issue_date) return 'Issue date is required';
    if (!form.signatory_name.trim()) return 'Signatory name is required';
    return '';
  };

  const generateCertificate = () => {
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    const doc = new jsPDF('portrait', 'mm', 'a4');
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 15;
    const contentWidth = pageWidth - 2 * margin;

    // Background and Border
    doc.setFillColor(245, 245, 245); // Light gray background
    doc.rect(0, 0, pageWidth, pageHeight, 'F');
    doc.setLineWidth(1);
    doc.setDrawColor(34, 197, 94); // primary-500 green
    doc.rect(margin, margin, contentWidth, pageHeight - 2 * margin, 'S');

    // Inner decorative border
    doc.setLineWidth(0.5);
    doc.setDrawColor(100, 100, 100);
    doc.rect(margin + 5, margin + 5, contentWidth - 10, pageHeight - 2 * margin - 10, 'S');

    // Logo Placeholder (replace with actual image if available)
    doc.setFontSize(12);
    doc.setTextColor(100, 100, 100);
    doc.text('[Company Logo]', pageWidth / 2, margin + 20, { align: 'center' });

    // Header
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(24);
    doc.setTextColor(34, 197, 94); // primary-500 green
    doc.text('Certificate of Achievement', pageWidth / 2, margin + 50, { align: 'center' });

    // Horizontal Line
    doc.setLineWidth(0.5);
    doc.setDrawColor(34, 197, 94);
    doc.line(margin + 20, margin + 55, pageWidth - margin - 20, margin + 55);

    // Certificate Details
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(16);
    doc.setTextColor(0, 0, 0);
    const employeeName = employees.find((emp) => emp.id === form.employee_id)?.name || 'Unknown';
    doc.text(`Awarded to: ${employeeName}`, pageWidth / 2, margin + 80, { align: 'center' });
    doc.text(`For: ${form.certificate_name}`, pageWidth / 2, margin + 100, { align: 'center' });
    doc.text(`Issued on: ${new Date(form.issue_date).toLocaleDateString()}`, pageWidth / 2, margin + 120, { align: 'center' });

    // Signature Section
    doc.setFontSize(14);
    doc.text('Authorized Signature:', margin + 20, pageHeight - margin - 40);
    doc.setFont('helvetica', 'italic');
    doc.text(form.signatory_name, margin + 20, pageHeight - margin - 25);

    // Footer
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text('Issued by [Your Company Name]', pageWidth / 2, pageHeight - margin - 10, { align: 'center' });

    // Save PDF
    doc.save(`${form.certificate_name}_${form.employee_id}.pdf`);
    setSuccess('Certificate generated successfully');
    setForm({ employee_id: '', certificate_name: '', issue_date: '', signatory_name: '' });
    setIsPreviewOpen(false);
  };

  const handlePreview = () => {
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }
    setIsPreviewOpen(true);
  };

  return (
    <div className="min-h-screen bg-primary-100 p-6">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-primary-500 mb-6">Generate Certificate</h1>
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
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg mx-auto transform transition-all hover:scale-105">
          <h2 className="text-2xl font-bold text-primary-500 mb-6">Certificate Details</h2>
          <div className="grid grid-cols-1 gap-4 mb-6">
            <div>
              <label htmlFor="employee_id" className="block text-gray-700 mb-2 font-medium">
                Employee
              </label>
              <select
                id="employee_id"
                value={form.employee_id}
                onChange={(e) => setForm({ ...form, employee_id: e.target.value })}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
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
            <div>
              <label htmlFor="certificate_name" className="block text-gray-700 mb-2 font-medium">
                Certificate Name
              </label>
              <input
                type="text"
                id="certificate_name"
                value={form.certificate_name}
                onChange={(e) => setForm({ ...form, certificate_name: e.target.value })}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
                aria-required="true"
                placeholder="e.g., Employee of the Month"
              />
            </div>
            <div>
              <label htmlFor="issue_date" className="block text-gray-700 mb-2 font-medium">
                Issue Date
              </label>
              <input
                type="date"
                id="issue_date"
                value={form.issue_date}
                onChange={(e) => setForm({ ...form, issue_date: e.target.value })}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
                aria-required="true"
              />
            </div>
            <div>
              <label htmlFor="signatory_name" className="block text-gray-700 mb-2 font-medium">
                Signatory Name
              </label>
              <input
                type="text"
                id="signatory_name"
                value={form.signatory_name}
                onChange={(e) => setForm({ ...form, signatory_name: e.target.value })}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
                aria-required="true"
                placeholder="e.g., John Doe, CEO"
              />
            </div>
          </div>
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={() => navigate('/admin/dashboard')}
              className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors duration-300"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handlePreview}
              className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition-colors duration-300"
            >
              Preview
            </button>
            <button
              type="button"
              onClick={generateCertificate}
              className="bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600 transition-colors duration-300"
            >
              Generate PDF
            </button>
          </div>
        </div>
        {isPreviewOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
              <h2 className="text-2xl font-bold text-primary-500 mb-6">Certificate Preview</h2>
              <div className="border border-gray-300 p-6 rounded-lg bg-gray-50">
                <h3 className="text-xl font-bold text-primary-500 text-center mb-4">
                  Certificate of Achievement
                </h3>
                <p className="text-center mb-2">
                  Awarded to: {employees.find((emp) => emp.id === form.employee_id)?.name}
                </p>
                <p className="text-center mb-2">For: {form.certificate_name}</p>
                <p className="text-center mb-2">
                  Issued on: {new Date(form.issue_date).toLocaleDateString()}
                </p>
                <p className="mt-4">Authorized Signature: {form.signatory_name}</p>
              </div>
              <div className="flex justify-end gap-4 mt-6">
                <button
                  type="button"
                  onClick={() => setIsPreviewOpen(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={generateCertificate}
                  className="bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600"
                >
                  Generate PDF
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CertificateGenerator;