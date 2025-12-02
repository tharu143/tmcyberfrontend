import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Process from './components/Process';
import Services from './components/Services';
import ServicesDetail from './components/ServicesDetail';
import Products from './components/Products';
import ProductsDetail from './components/ProductsDetail';
import Blog from './components/Blog';
import BlogDetail from './components/BlogDetail';
import MissionVision from './components/MissionVision';
import Careers from './components/Careers';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AdminLogin from './components/admin/AdminLogin';
import AdminDashboard from './components/admin/AdminDashboard';
import EmployeeManagement from './components/admin/EmployeeManagement';
import CertificateGenerator from './components/admin/CertificateGenerator';
import TaskManagement from './components/admin/TaskManagement';
import AttendanceManagement from './components/admin/AttendanceManagement';
import CertificateManagement from './components/admin/CertificateManagement';
import CreateEmployee from './components/admin/CreateEmployee';
import LicenseManagement from './components/admin/LicenseManagement';
import InvoiceGenerator from './components/admin/InvoiceGenerator';
import InvoiceList from './components/admin/InvoiceList';
import PrivateRoute from './PrivateRoute';
import logo from './assest/logo.png';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <div className="container mx-auto px-6 py-12">
        <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-slate-100 max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8 border-b border-slate-100 pb-4">Privacy Policy</h1>
          <div className="prose prose-slate max-w-none text-slate-600">
            <p className="text-lg"><strong>Last Updated:</strong> October 9, 2025</p>
            <p>This Privacy Policy explains how ERPNext CRM, developed by Tharun Kumar K, handles user information when you use the application ("App").</p>

            <h2 className="text-2xl font-bold text-slate-800 mt-8 mb-4">1. Overview</h2>
            <p>ERPNext CRM is a mobile application built on Flutter that connects directly with your own ERPNext server to manage CRM modules such as Leads, Opportunities, Quotations, and Customers.</p>
            <p>All business data created or accessed through the app — including text, images, audio, and location data — is stored only on your configured ERPNext server.</p>
            <p className="font-semibold text-slate-800">We do not collect, store, or share your data on any third-party or developer-owned servers.</p>

            <h2 className="text-2xl font-bold text-slate-800 mt-8 mb-4">2. Information We Collect</h2>
            <p>The app itself does not automatically collect any personal data for analytics or marketing. However, depending on how you use the app, it may process:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Account Information:</strong> ERPNext username, API key, or secret (used only for authentication to your ERPNext system).</li>
              <li><strong>Business Data:</strong> Leads, customer details, quotations, and documents you create or view inside the app.</li>
              <li><strong>Media Files:</strong> Images or audio that you upload for business records (e.g., customer proof or attachments).</li>
              <li><strong>Location Data (optional):</strong> Used only when the app includes modules like check-in/check-out or visit tracking.</li>
            </ul>
            <p className="mt-4">All the above data remains on your own ERPNext server and is never transmitted to any external database.</p>

            <h2 className="text-2xl font-bold text-slate-800 mt-8 mb-4">3. How We Use Your Information</h2>
            <p>The App uses your information only to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Connect and authenticate with your ERPNext server.</li>
              <li>Display and manage your CRM-related data.</li>
              <li>Enable you to create, edit, or view records.</li>
              <li>Allow optional features like image or location uploads tied to your ERPNext modules.</li>
            </ul>
            <p className="mt-4">No data is shared, analyzed, or used for advertising or analytics.</p>

            <h2 className="text-2xl font-bold text-slate-800 mt-8 mb-4">4. Data Storage and Security</h2>
            <p>All data (including uploaded images, audio, or location) is securely stored on your own ERPNext instance.</p>
            <p>The app uses HTTPS communication for all requests to ensure data security.</p>
            <p>API keys and credentials are stored locally on your device in a secure manner (never uploaded).</p>
            <p>We do not maintain or access your ERPNext database.</p>

            <h2 className="text-2xl font-bold text-slate-800 mt-8 mb-4">5. Permissions Used</h2>
            <div className="overflow-x-auto">
              <table className="table-auto w-full mb-4 border-collapse border border-slate-200">
                <thead>
                  <tr className="bg-slate-50">
                    <th className="px-4 py-3 border border-slate-200 text-left font-semibold text-slate-700">Permission</th>
                    <th className="px-4 py-3 border border-slate-200 text-left font-semibold text-slate-700">Purpose</th>
                    <th className="px-4 py-3 border border-slate-200 text-left font-semibold text-slate-700">Data Destination</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-slate-200 px-4 py-3">Camera / Media Access</td>
                    <td className="border border-slate-200 px-4 py-3">To capture or upload customer-related images.</td>
                    <td className="border border-slate-200 px-4 py-3">Saved only in ERPNext.</td>
                  </tr>
                  <tr>
                    <td className="border border-slate-200 px-4 py-3">Microphone</td>
                    <td className="border border-slate-200 px-4 py-3">To record and upload audio notes if required.</td>
                    <td className="border border-slate-200 px-4 py-3">Saved only in ERPNext.</td>
                  </tr>
                  <tr>
                    <td className="border border-slate-200 px-4 py-3">Location</td>
                    <td className="border border-slate-200 px-4 py-3">For attendance or visit tracking (if module enabled).</td>
                    <td className="border border-slate-200 px-4 py-3">Saved only in ERPNext.</td>
                  </tr>
                  <tr>
                    <td className="border border-slate-200 px-4 py-3">Internet Access</td>
                    <td className="border border-slate-200 px-4 py-3">To connect with your ERPNext API endpoint.</td>
                    <td className="border border-slate-200 px-4 py-3">Used only for that ERPNext server.</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>All permissions are optional and requested only when required for a specific function.</p>

            <h2 className="text-2xl font-bold text-slate-800 mt-8 mb-4">6. Data Retention</h2>
            <p>We do not store or retain any of your business data.</p>
            <p>Your ERPNext server manages all data retention according to your organization’s settings and policies.</p>

            <h2 className="text-2xl font-bold text-slate-800 mt-8 mb-4">7. Third-Party Services</h2>
            <p>This app does not use any third-party analytics, ad networks, or external databases.</p>
            <p>Your ERPNext instance might use integrations (e.g., email or cloud file storage) — those are managed under your ERPNext account and not by this app.</p>

            <h2 className="text-2xl font-bold text-slate-800 mt-8 mb-4">8. Children’s Privacy</h2>
            <p>This application is designed for professional and business users. It is not intended for children under 13 years of age.</p>

            <h2 className="text-2xl font-bold text-slate-800 mt-8 mb-4">9. Data Safety and Your Rights</h2>
            <p>Since all data remains within your own ERPNext infrastructure, you have full control over:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Data access, modification, and deletion</li>
              <li>Role-based permissions and user management</li>
              <li>Audit and backup policies</li>
            </ul>
            <p className="mt-4">You may uninstall the app anytime to stop using it. The app does not keep any residual user data on uninstall.</p>

            <h2 className="text-2xl font-bold text-slate-800 mt-8 mb-4">10. Changes to This Policy</h2>
            <p>We may occasionally update this Privacy Policy.</p>
            <p>The latest version will always be available at the provided URL and inside the app “About” section.</p>

            <h2 className="text-2xl font-bold text-slate-800 mt-8 mb-4">11. Contact</h2>
            <p>If you have any questions about this Privacy Policy, please contact:</p>
            <p><strong>Developer Name:</strong> Tharun Kumar K</p>
            <p><strong>Email:</strong> tharuntk143143@gmail.com</p>
            <p><strong>Location:</strong> Theni, Tamilnadu, India</p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

const App: React.FC = () => {
  useEffect(() => {
    document.title = "TM Cyber Tech - IT Solutions Provider";
    const favicon = document.querySelector("link[rel='icon']") as HTMLLinkElement | null;
    if (favicon) {
      favicon.href = logo;
    }
  }, []);

  return (
    <Router>
      <div className="font-sans">
        <Routes>
          {/* Main Website Routes */}
          <Route
            path="/"
            element={
              <>
                <Navbar />
                <Hero />
                <Process />
                <Services />
                <Products />
                <Blog />
                <MissionVision />
                <Careers />
                <Contact />
                <Footer />
              </>
            }
          />
          <Route path="/services" element={<ServicesDetail />} />
          <Route path="/products" element={<ProductsDetail />} />
          <Route path="/products/:productId" element={<ProductsDetail />} />
          <Route path="/blog" element={<BlogDetail />} />
          <Route path="/contact" element={<div><Navbar /><Contact /><Footer /></div>} />
          <Route path="/process" element={<div><Navbar /><Process /><Footer /></div>} />
          <Route path="/app-privacy-policy" element={<PrivacyPolicy />} />
          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route element={<PrivateRoute />}>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/employees" element={<EmployeeManagement />} />
            <Route path="/admin/certificate-generator" element={<CertificateGenerator />} />
            <Route path="/admin/certificates" element={<CertificateManagement />} />
            <Route path="/admin/tasks" element={<TaskManagement />} />
            <Route path="/admin/attendance" element={<AttendanceManagement />} />
            <Route path="/admin/employees/create" element={<CreateEmployee />} />
            <Route path="/admin/licenses" element={<LicenseManagement />} />
            <Route path="/admin/licenses" element={<LicenseManagement />} />
            <Route path="/admin/invoices" element={<InvoiceList />} />
            <Route path="/admin/invoices/new" element={<InvoiceGenerator />} />
            <Route path="/admin/invoices/edit/:id" element={<InvoiceGenerator />} />
          </Route>
          <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;