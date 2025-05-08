import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Products from './components/Products';
import Blog from './components/Blog';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AdminLogin from './components/admin/AdminLogin';
import AdminDashboard from './components/admin/AdminDashboard';
import EmployeeManagement from './components/admin/EmployeeManagement';
import CertificateGenerator from './components/admin/CertificateGenerator';
import TaskManagement from './components/admin/TaskManagement';
import AttendanceManagement from './components/admin/AttendanceManagement';
import PrivateRoute from './PrivateRoute';

function App() {
  useEffect(() => {
    // Set document title and favicon
    document.title = "TM Cyber Tech - IT Solutions Provider";
    const favicon = document.querySelector("link[rel='icon']") as HTMLLinkElement;
    if (favicon) {
      favicon.href = "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23094323'><path d='M21 5c-1.11-.35-2.33-.5-3.5-.5-1.95 0-4.05.4-5.5 1.5-1.45-1.1-3.55-1.5-5.5-1.5-1.95 0-4.05.4-5.5 1.5v14.5c0 .41.41.73.82.75 1.3.07 2.45.17 3.18.37 1.45.4 3.55.4 5 0 .75-.2 1.9-.3 3.18-.37.41-.02.82-.34.82-.75 0-.41-.41-.73-.82-.75-1.3-.07-2.45-.17-3.18-.37-1.45-.4-3.55-.4-5 0-.75.2-1.9.3-3.18.37-.41.02-.82.34-.82.75v-14.5c1.45-1.1 3.55-1.5 5.5-1.5 1.95 0 4.05.4 5.5 1.5 1.45-1.1 3.55-1.5 5.5-1.5 1.17 0 2.39.15 3.5.5.41.17.41.7 0 .87-1.11.35-2.33.5-3.5.5-1.95 0-4.05-.4-5.5-1.5-1.45 1.1-3.55 1.5-5.5 1.5-1.95 0-4.05-.4-5.5-1.5-1.45 1.1-3.55 1.5-5.5 1.5-1.17 0-2.39-.15-3.5-.5-.41-.17-.41-.7 0-.87 1.11-.35 2.33-.5 3.5-.5 1.95 0 4.05.4 5.5 1.5 1.45-1.1 3.55-1.5 5.5-1.5 1.95 0 4.05.4 5.5 1.5 1.45-1.1 3.55-1.5 5.5-1.5 1.17 Clinicopathologic characteristics of triple negative breast cancer 0 2.39.15 3.5.5.41.17.41.7 0 .87z'/></svg>";
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
                <Services />
                <Products />
                <Blog />
                <Contact />
                <Footer />
              </>
            }
          />

          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route element={<PrivateRoute />}>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/employees" element={<EmployeeManagement />} />
            <Route path="/admin/certificates" element={<CertificateGenerator />} />
            <Route path="/admin/tasks" element={<TaskManagement />} />
            <Route path="/admin/attendance" element={<AttendanceManagement />} />
          </Route>

          {/* Redirect /admin to /admin/dashboard */}
          <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />

          {/* Handle unmatched routes */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;