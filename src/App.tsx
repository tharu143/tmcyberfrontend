import React, { useState, useEffect, useCallback } from 'react';

// --- Utility Hooks for Single-File Routing Simulation (Mandatory Refactor) ---

/**
 * Simulates client-side routing using window.history.pushState and popstate.
 * This is used to replace react-router-dom, which is disallowed in single-file React projects.
 */
const usePath = () => {
  const [path, setPath] = useState(window.location.pathname);

  const navigate = useCallback((newPath) => {
    if (window.location.pathname !== newPath) {
        window.history.pushState({}, '', newPath);
        setPath(newPath);
        window.scrollTo(0, 0); // Scroll to top on navigation
    }
  }, []);

  useEffect(() => {
    const onPopState = () => setPath(window.location.pathname);
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  return { path, navigate };
};

// --- Placeholder Components (Required for single-file compliance) ---

// Placeholder component for navigation. Links use the 'navigate' function from usePath.
const Navbar = ({ navigate }) => (
    <nav className="bg-white shadow-lg p-4 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
            <div className="text-xl font-bold text-teal-600">TM Cyber Tech</div>
            <div className="space-x-4 flex">
                <button onClick={() => navigate('/')} className="text-gray-600 hover:text-teal-600 transition">Home</button>
                <button onClick={() => navigate('/services')} className="text-gray-600 hover:text-teal-600 transition">Services</button>
                <button onClick={() => navigate('/admin/login')} className="text-red-500 hover:text-red-700 transition">Admin Login</button>
                <button onClick={() => navigate('/app-privacy-policy')} className="text-gray-600 hover:text-teal-600 transition font-semibold">Privacy Policy</button>
            </div>
        </div>
    </nav>
);
const Hero = () => <div className="p-20 bg-teal-50 text-center text-gray-800"><h1>IT Solutions Provider</h1><p>Placeholder Hero Section</p></div>;
const Process = () => <div className="p-10 bg-gray-100 text-center">Process Section Placeholder</div>;
const Services = () => <div className="p-10 bg-white text-center">Services List Placeholder</div>;
const ServicesDetail = () => <div className="p-10 min-h-screen bg-white text-center">Services Detail Page Placeholder</div>;
const Products = () => <div className="p-10 bg-gray-100 text-center">Products List Placeholder</div>;
const ProductsDetail = () => <div className="p-10 min-h-screen bg-white text-center">Products Detail Page Placeholder</div>;
const Blog = () => <div className="p-10 bg-white text-center">Blog List Placeholder</div>;
const BlogDetail = () => <div className="p-10 min-h-screen bg-gray-100 text-center">Blog Detail Page Placeholder</div>;
const MissionVision = () => <div className="p-10 bg-teal-50 text-center">Mission/Vision Placeholder</div>;
const Careers = () => <div className="p-10 bg-white text-center">Careers Placeholder</div>;
const Contact = () => <div className="p-10 bg-gray-100 text-center">Contact Form Placeholder</div>;
const Footer = () => <footer className="p-8 bg-gray-800 text-white text-center">© 2025 TM Cyber Tech. All rights reserved.</footer>;
const AdminLogin = ({ navigate }) => <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50"><h2 className="text-xl mb-4">Admin Login</h2><button onClick={() => navigate('/admin/dashboard')} className="px-4 py-2 bg-teal-600 text-white rounded-md">Log In (Simulated)</button></div>;

// Admin Placeholders (These would typically be behind an auth check)
const AdminDashboard = () => <div className="p-10 min-h-screen bg-red-50 text-center">Admin Dashboard Placeholder</div>;
const EmployeeManagement = () => <div className="p-10 min-h-screen bg-red-50 text-center">Employee Management Placeholder</div>;
const CertificateGenerator = () => <div className="p-10 min-h-screen bg-red-50 text-center">Certificate Generator Placeholder</div>;
const TaskManagement = () => <div className="p-10 min-h-screen bg-red-50 text-center">Task Management Placeholder</div>;
const AttendanceManagement = () => <div className="p-10 min-h-screen bg-red-50 text-center">Attendance Management Placeholder</div>;
const CertificateManagement = () => <div className="p-10 min-h-screen bg-red-50 text-center">Certificate Management Placeholder</div>;
const CreateEmployee = () => <div className="p-10 min-h-screen bg-red-50 text-center">Create Employee Placeholder</div>;
const LicenseManagement = () => <div className="p-10 min-h-screen bg-red-50 text-center">License Management Placeholder</div>;
const InvoiceGenerator = () => <div className="p-10 min-h-screen bg-red-50 text-center">Invoice Generator Placeholder</div>;

// PrivateRoute simulation (just renders children if 'authenticated' state is true)
// For this simulation, we will assume the user is authenticated to see admin routes.
const PrivateRoute = ({ children, navigate }) => {
    // In a real app, this would check an auth token/state.
    const isAuthenticated = true; // Simplified for single-file simulation.
    return isAuthenticated ? children : <div className="text-center p-20">Access Denied. Please log in.</div>;
};


// --- New Component: App Privacy Policy ---

const AppPrivacyPolicy = () => (
    <div className="bg-white min-h-screen py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-2">App Privacy Policy</h1>
            <p className="text-sm text-gray-500 mb-8">Last Updated: October 9, 2025</p>

            <p className="mb-8 text-gray-600 leading-relaxed">
                This Privacy Policy explains how **ERPNext CRM**, developed by **Tharun Kumar K**, handles user information when you use the application (“App”).
            </p>

            <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">1. Overview</h2>
            <p className="mb-4 text-gray-600 leading-relaxed">
                ERPNext CRM is a mobile application built on Flutter that connects directly with **your own ERPNext server** to manage CRM modules such as Leads, Opportunities, Quotations, and Customers.
            </p>
            <p className="mb-6 font-semibold text-teal-700 leading-relaxed">
                All business data created or accessed through the app — including text, images, audio, and location data — is stored **only on your configured ERPNext server.**
            </p>
            <p className="mb-8 text-red-600 leading-relaxed">
                **We do not collect, store, or share your data on any third-party or developer-owned servers.**
            </p>

            <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">2. Information We Process</h2>
            <p className="mb-4 text-gray-600 leading-relaxed">
                The app itself does not automatically collect any personal data for analytics or marketing. However, depending on how you use the app, it may process the following data, which remains on your own ERPNext server:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4 text-gray-600">
                <li>**Account Information:** ERPNext username, API key, or secret (used only for authentication to your ERPNext system).</li>
                <li>**Business Data:** Leads, customer details, quotations, and documents you create or view inside the app.</li>
                <li>**Media Files:** Images or audio that you upload for business records (e.g., customer proof or attachments).</li>
                <li>**Location Data (optional):** Used only when the app includes modules like check-in/check-out or visit tracking.</li>
            </ul>
            <p className="mt-4 text-gray-600 leading-relaxed italic">
                All the above data remains on your own ERPNext server and is never transmitted to any external database.
            </p>

            <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">3. How We Use Your Information</h2>
            <p className="mb-4 text-gray-600 leading-relaxed">
                The App uses your information **only** to:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4 text-gray-600">
                <li>Connect and authenticate with your ERPNext server.</li>
                <li>Display and manage your CRM-related data.</li>
                <li>Enable you to create, edit, or view records.</li>
                <li>Allow optional features like image or location uploads tied to your ERPNext modules.</li>
            </ul>
            <p className="mt-4 text-gray-600 leading-relaxed font-medium">
                No data is shared, analyzed, or used for advertising or analytics.
            </p>

            <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">4. Data Storage and Security</h2>
            <ul className="list-disc list-inside space-y-2 ml-4 text-gray-600 leading-relaxed">
                <li>All data (including uploaded images, audio, or location) is securely stored on **your own ERPNext instance.**</li>
                <li>The app uses **HTTPS** communication for all requests to ensure data security.</li>
                <li>API keys and credentials are stored locally on your device in a secure manner (never uploaded).</li>
                <li>We do not maintain or access your ERPNext database.</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">5. Permissions Used</h2>
            <p className="mb-4 text-gray-600 leading-relaxed">
                The table below outlines the device permissions the app may request and their purpose:
            </p>
            <div className="overflow-x-auto shadow-lg rounded-lg border border-gray-200">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-teal-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Permission</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Purpose</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Data Destination</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-100">
                        {['Camera / Media Access', 'Microphone', 'Location', 'Internet Access'].map((perm, index) => (
                            <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{perm}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                    {perm === 'Camera / Media Access' && 'To capture or upload customer-related images.'}
                                    {perm === 'Microphone' && 'To record and upload audio notes if required.'}
                                    {perm === 'Location' && 'For attendance or visit tracking (if module enabled).'}
                                    {perm === 'Internet Access' && 'To connect with your ERPNext API endpoint.'}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-teal-700">Saved only in ERPNext.</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <p className="mt-6 text-sm text-gray-500 leading-relaxed italic">
                All permissions are optional and requested only when required for a specific function.
            </p>

            <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">6. Data Retention</h2>
            <ul className="list-disc list-inside space-y-2 ml-4 text-gray-600 leading-relaxed">
                <li>We do not store or retain any of your business data.</li>
                <li>Your ERPNext server manages all data retention according to your organization’s settings and policies.</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">7. Third-Party Services</h2>
            <p className="mb-4 text-gray-600 leading-relaxed">
                This app does not use any third-party analytics, ad networks, or external databases. Your ERPNext instance might use integrations (e.g., email or cloud file storage) — those are managed under your ERPNext account and not by this app.
            </p>

            <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">8. Children’s Privacy</h2>
            <p className="mb-4 text-gray-600 leading-relaxed">
                This application is designed for professional and business users. It is **not intended for children under 13 years of age.**
            </p>

            <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">9. Data Safety and Your Rights</h2>
            <p className="mb-4 text-gray-600 leading-relaxed">
                Since all data remains within your own ERPNext infrastructure, you have full control over:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4 text-gray-600 leading-relaxed">
                <li>Data access, modification, and deletion</li>
                <li>Role-based permissions and user management</li>
                <li>Audit and backup policies</li>
            </ul>
            <p className="mt-4 text-gray-600 leading-relaxed">
                You may uninstall the app anytime to stop using it. The app does not keep any residual user data on uninstall.
            </p>

            <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">10. Changes to This Policy</h2>
            <p className="mb-4 text-gray-600 leading-relaxed">
                We may occasionally update this Privacy Policy. The latest version will always be available at the provided URL and inside the app “About” section.
            </p>

            <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">11. Contact</h2>
            <p className="mb-4 text-gray-600 leading-relaxed">
                If you have any questions about this Privacy Policy, please contact:
            </p>
            <div className="bg-teal-50 p-4 rounded-lg border border-teal-200">
                <p><strong>Developer Name:</strong> Tharun Kumar K</p>
                <p><strong>Email:</strong> tharuntk143143@gmail.com</p>
                <p><strong>Location:</strong> Theni, Tamilnadu, India</p>
            </div>
        </div>
    </div>
);


// --- Main Application Component ---

const App = () => {
    // Single-file routing state
    const { path, navigate } = usePath();

    useEffect(() => {
        document.title = "TM Cyber Tech - IT Solutions Provider";
        // Favicon setup as requested in the original code
        const favicon = document.querySelector("link[rel='icon']");
        if (favicon) {
            favicon.href = `data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23094323'><path d='M21 5c-1.11-.35-2.33-.5-3.5-.5-1.95 0-4.05.4-5.5 1.5-1.45-1.1-3.55-1.5-5.5-1.5-1.95 0-4.05.4-5.5 1.5v14.5c0 .41.41.73.82.75 1.3.07 2.45.17 3.18.37 1.45.4 3.55.4 5 0 .75-.2 1.9-.3 3.18-.37.41-.02.82-.34.82-.75 0-.41-.41-.73-.82-.75-1.3-.07-2.45-.17-3.18-.37-1.45-.4-3.55-.4-5 0-.75.2-1.9.3-3.18.37-.41.02-.82.34-.82.75v-14.5c1.45-1.1 3.55-1.5 5.5-1.5 1.95 0 4.05.4 5.5 1.5 1.45-1.1 3.55-1.5 5.5-1.5 1.95 0 4.05.4 5.5 1.5 1.45-1.1 3.55-1.5 5.5-1.5 1.17 0 2.39.15 3.5.5.41.17.41.7 0 .87-1.11.35-2.33.5-3.5.5-1.95 0-4.05-.4-5.5-1.5-1.45 1.1-3.55 1.5-5.5 1.5-1.95 0-4.05-.4-5.5-1.5-1.45 1.1-3.55 1.5-5.5 1.5-1.17 0-2.39-.15-3.5-.5-.41-.17-.41-.7 0-.87 1.11-.35 2.33-.5 3.5-.5 1.95 0 4.05.4 5.5 1.5 1.45-1.1 3.55-1.5 5.5-1.5 1.95 0 4.05.4 5.5 1.5 1.45-1.1 3.55-1.5 5.5-1.5 1.17 0 2.39.15 3.5.5.41.17.41.7 0 .87z'/></svg>`;
        }
    }, []);

    const renderContent = () => {
        // --- Admin Routes (simplified check for /admin/*) ---
        if (path.startsWith('/admin')) {
            const adminPath = path.substring('/admin'.length);
            const children = (
                <PrivateRoute navigate={navigate}>
                    {adminPath === '/dashboard' && <AdminDashboard />}
                    {adminPath === '/employees' && <EmployeeManagement />}
                    {adminPath === '/certificate-generator' && <CertificateGenerator />}
                    {adminPath === '/certificates' && <CertificateManagement />}
                    {adminPath === '/tasks' && <TaskManagement />}
                    {adminPath === '/attendance' && <AttendanceManagement />}
                    {adminPath === '/employees/create' && <CreateEmployee />}
                    {adminPath === '/licenses' && <LicenseManagement />}
                    {adminPath === '/invoice-generator' && <InvoiceGenerator />}
                    {adminPath === '' && navigate('/admin/dashboard')}
                    {adminPath === '/login' && <AdminLogin navigate={navigate} />}
                    {/* Default case if admin route is not found */}
                    {adminPath !== '/dashboard' && adminPath !== '/employees' && adminPath !== '/certificate-generator' && adminPath !== '/certificates' && adminPath !== '/tasks' && adminPath !== '/attendance' && adminPath !== '/employees/create' && adminPath !== '/licenses' && adminPath !== '/invoice-generator' && adminPath !== '' && adminPath !== '/login' && <div className="text-center p-20">Admin Page Not Found</div>}
                </PrivateRoute>
            );
            // Admin login is outside PrivateRoute for simulation
            if (path === '/admin/login') return <AdminLogin navigate={navigate} />;
            return children;
        }

        // --- Public Routes ---
        switch (path) {
            case '/':
                return (
                    <>
                        <Navbar navigate={navigate} />
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
                );
            case '/app-privacy-policy':
                return (
                    <>
                        <Navbar navigate={navigate} />
                        <AppPrivacyPolicy />
                        <Footer />
                    </>
                );
            case '/services':
                return (
                    <>
                        <Navbar navigate={navigate} />
                        <ServicesDetail />
                        <Footer />
                    </>
                );
            case '/products':
                return (
                    <>
                        <Navbar navigate={navigate} />
                        <ProductsDetail />
                        <Footer />
                    </>
                );
            case '/blog':
                return (
                    <>
                        <Navbar navigate={navigate} />
                        <BlogDetail />
                        <Footer />
                    </>
                );
            case '/contact':
                return (
                    <div>
                        <Navbar navigate={navigate} />
                        <Contact />
                        <Footer />
                    </div>
                );
            case '/process':
                return (
                    <div>
                        <Navbar navigate={navigate} />
                        <Process />
                        <Footer />
                    </div>
                );
            default:
                // Handle /products/:productId and 404
                if (path.startsWith('/products/')) {
                    return <ProductsDetail />;
                }
                // Fallback to Home for 404
                return navigate('/');
        }
    };

    return (
        <div className="font-sans min-h-screen flex flex-col">
            {renderContent()}
        </div>
    );
};

export default App;
