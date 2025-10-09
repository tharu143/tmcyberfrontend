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
import PrivateRoute from './PrivateRoute';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
        <div className="prose max-w-none">
          <p><strong>Last Updated:</strong> October 9, 2025</p>
          <p>This Privacy Policy explains how ERPNext CRM, developed by Tharun Kumar K, handles user information when you use the application (“App”).</p>
          
          <h2>1. Overview</h2>
          <p>ERPNext CRM is a mobile application built on Flutter that connects directly with your own ERPNext server to manage CRM modules such as Leads, Opportunities, Quotations, and Customers.</p>
          <p>All business data created or accessed through the app — including text, images, audio, and location data — is stored only on your configured ERPNext server.</p>
          <p><strong>We do not collect, store, or share your data on any third-party or developer-owned servers.</strong></p>
          
          <h2>2. Information We Collect</h2>
          <p>The app itself does not automatically collect any personal data for analytics or marketing. However, depending on how you use the app, it may process:</p>
          <ul>
            <li><strong>Account Information:</strong> ERPNext username, API key, or secret (used only for authentication to your ERPNext system).</li>
            <li><strong>Business Data:</strong> Leads, customer details, quotations, and documents you create or view inside the app.</li>
            <li><strong>Media Files:</strong> Images or audio that you upload for business records (e.g., customer proof or attachments).</li>
            <li><strong>Location Data (optional):</strong> Used only when the app includes modules like check-in/check-out or visit tracking.</li>
          </ul>
          <p>All the above data remains on your own ERPNext server and is never transmitted to any external database.</p>
          
          <h2>3. How We Use Your Information</h2>
          <p>The App uses your information only to:</p>
          <ul>
            <li>Connect and authenticate with your ERPNext server.</li>
            <li>Display and manage your CRM-related data.</li>
            <li>Enable you to create, edit, or view records.</li>
            <li>Allow optional features like image or location uploads tied to your ERPNext modules.</li>
          </ul>
          <p>No data is shared, analyzed, or used for advertising or analytics.</p>
          
          <h2>4. Data Storage and Security</h2>
          <p>All data (including uploaded images, audio, or location) is securely stored on your own ERPNext instance.</p>
          <p>The app uses HTTPS communication for all requests to ensure data security.</p>
          <p>API keys and credentials are stored locally on your device in a secure manner (never uploaded).</p>
          <p>We do not maintain or access your ERPNext database.</p>
          
          <h2>5. Permissions Used</h2>
          <table className="table-auto w-full mb-4">
            <thead>
              <tr>
                <th className="px-4 py-2">Permission</th>
                <th className="px-4 py-2">Purpose</th>
                <th className="px-4 py-2">Data Destination</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border px-4 py-2">Camera / Media Access</td>
                <td className="border px-4 py-2">To capture or upload customer-related images.</td>
                <td className="border px-4 py-2">Saved only in ERPNext.</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">Microphone</td>
                <td className="border px-4 py-2">To record and upload audio notes if required.</td>
                <td className="border px-4 py-2">Saved only in ERPNext.</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">Location</td>
                <td className="border px-4 py-2">For attendance or visit tracking (if module enabled).</td>
                <td className="border px-4 py-2">Saved only in ERPNext.</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">Internet Access</td>
                <td className="border px-4 py-2">To connect with your ERPNext API endpoint.</td>
                <td className="border px-4 py-2">Used only for that ERPNext server.</td>
              </tr>
            </tbody>
          </table>
          <p>All permissions are optional and requested only when required for a specific function.</p>
          
          <h2>6. Data Retention</h2>
          <p>We do not store or retain any of your business data.</p>
          <p>Your ERPNext server manages all data retention according to your organization’s settings and policies.</p>
          
          <h2>7. Third-Party Services</h2>
          <p>This app does not use any third-party analytics, ad networks, or external databases.</p>
          <p>Your ERPNext instance might use integrations (e.g., email or cloud file storage) — those are managed under your ERPNext account and not by this app.</p>
          
          <h2>8. Children’s Privacy</h2>
          <p>This application is designed for professional and business users. It is not intended for children under 13 years of age.</p>
          
          <h2>9. Data Safety and Your Rights</h2>
          <p>Since all data remains within your own ERPNext infrastructure, you have full control over:</p>
          <ul>
            <li>Data access, modification, and deletion</li>
            <li>Role-based permissions and user management</li>
            <li>Audit and backup policies</li>
          </ul>
          <p>You may uninstall the app anytime to stop using it. The app does not keep any residual user data on uninstall.</p>
          
          <h2>10. Changes to This Policy</h2>
          <p>We may occasionally update this Privacy Policy.</p>
          <p>The latest version will always be available at the provided URL and inside the app “About” section.</p>
          
          <h2>11. Contact</h2>
          <p>If you have any questions about this Privacy Policy, please contact:</p>
          <p><strong>Developer Name:</strong> Tharun Kumar K</p>
          <p><strong>Email:</strong> tharuntk143143@gmail.com</p>
          <p><strong>Location:</strong> Theni, Tamilnadu, India</p>
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
      favicon.href = `data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23094323'><path d='M21 5c-1.11-.35-2.33-.5-3.5-.5-1.95 0-4.05.4-5.5 1.5-1.45-1.1-3.55-1.5-5.5-1.5-1.95 0-4.05.4-5.5 1.5v14.5c0 .41.41.73.82.75 1.3.07 2.45.17 3.18.37 1.45.4 3.55.4 5 0 .75-.2 1.9-.3 3.18-.37.41-.02.82-.34.82-.75 0-.41-.41-.73-.82-.75-1.3-.07-2.45-.17-3.18-.37-1.45-.4-3.55-.4-5 0-.75.2-1.9.3-3.18.37-.41.02-.82.34-.82.75v-14.5c1.45-1.1 3.55-1.5 5.5-1.5 1.95 0 4.05.4 5.5 1.5 1.45-1.1 3.55-1.5 5.5-1.5 1.17 0 2.39.15 3.5.5.41.17.41.7 0 .87-1.11.35-2.33.5-3.5.5-1.95 0-4.05-.4-5.5-1.5-1.45 1.1-3.55 1.5-5.5 1.5-1.95 0-4.05-.4-5.5-1.5-1.45 1.1-3.55 1.5-5.5 1.5-1.17 0-2.39-.15-3.5-.5-.41-.17-.41-.7 0-.87 1.11-.35 2.33-.5 3.5-.5 1.95 0 4.05.4 5.5 1.5 1.45-1.1 3.55-1.5 5.5-1.5 1.95 0 4.05.4 5.5 1.5 1.45-1.1 3.55-1.5 5.5-1.5 1.17 0 2.39.15 3.5.5.41.17.41.7 0 .87z'/></svg>`;
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
            <Route path="/admin/invoice-generator" element={<InvoiceGenerator />} />
          </Route>
          <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;