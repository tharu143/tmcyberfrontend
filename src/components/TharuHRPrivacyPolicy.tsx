import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

const TharuHRPrivacyPolicy: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <div className="container mx-auto px-6 py-12">
        <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-slate-100 max-w-4xl mx-auto">
          
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2 pb-2 border-b border-slate-200">
            Privacy Policy for TharuHR
          </h1>
          <p className="text-sm text-slate-500 mb-8 pb-4">
            <strong>Effective Date:</strong> July 27, 2026
          </p>
          
          <div className="prose prose-slate max-w-none text-slate-600 space-y-6">
            <p className="text-lg leading-relaxed text-slate-700">
              Welcome to <strong>TharuHR</strong> (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;). We are committed to protecting your privacy and ensuring transparency regarding how your data is collected, used, and safeguarded when using our Human Resource Management System (HRMS) mobile application.
            </p>

            <div>
              <h2 className="text-xl font-bold text-blue-950 mt-8 mb-3">1. Information We Collect</h2>
              <p className="leading-relaxed mb-4">
                To provide HR management functionality, TharuHR collects and processes the following categories of information:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>User Profile Data:</strong> Full Name, Email Address, Employee ID, Designation, and Department as provided by your company&apos;s ERPNext instance.
                </li>
                <li>
                  <strong>Attendance &amp; Check-in Logs:</strong> Check-in and Check-out timestamps, working hours, and log types (IN/OUT).
                </li>
                <li>
                  <strong>Leave Applications &amp; History:</strong> Leave request dates, leave types, reasons provided for leave, and approval status.
                </li>
                <li>
                  <strong>Payroll &amp; Compensation Data:</strong> Gross pay, deductions, net pay, and salary slip details fetched securely for employee view.
                </li>
                <li>
                  <strong>Biometric Credentials:</strong> Local biometric authentication (Face ID or Fingerprint) is processed entirely on your physical device via standard Android BiometricPrompt APIs. <em>Biometric template data is NEVER stored on or transmitted to external servers.</em>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold text-blue-950 mt-8 mb-3">2. How We Use Your Information</h2>
              <p className="leading-relaxed mb-4">
                We use the collected information exclusively to provide employee self-service HR functions, including:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Authenticating users against your company&apos;s ERPNext enterprise server (<code className="bg-slate-100 px-1 py-0.5 rounded text-slate-800">https://erp.tmcybertech.in</code>).</li>
                <li>Recording attendance check-ins and check-outs.</li>
                <li>Processing leave applications and displaying remaining leave balances.</li>
                <li>Displaying payslip details and company holiday lists.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold text-blue-950 mt-8 mb-3">3. Data Sharing and Disclosure</h2>
              <p className="leading-relaxed">
                We do NOT sell, rent, or trade your personal data to third parties or marketing agencies. Data is strictly transmitted to your organization&apos;s authorized enterprise ERPNext server.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-blue-950 mt-8 mb-3">4. Data Security</h2>
              <p className="leading-relaxed">
                We implement industry-standard encryption protocols (HTTPS/TLS) for data in transit and Android EncryptedSharedPreferences for securing sensitive session tokens locally on your device.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-blue-950 mt-8 mb-3">5. Your Data Rights &amp; Deletion</h2>
              <p className="leading-relaxed">
                Employees have the right to access and review their HR records. To request account deletion or data modification, please contact your company&apos;s HR administrator.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-blue-950 mt-8 mb-3">6. Contact Us</h2>
              <div className="bg-blue-50 border-l-4 border-blue-600 p-4 rounded-r-lg mt-3">
                <p className="mb-2">If you have any questions or concerns regarding this Privacy Policy, please contact our support team:</p>
                <p><strong>Email:</strong> <a href="mailto:support@tmcybertech.in" className="text-blue-600 hover:underline">support@tmcybertech.in</a></p>
                <p><strong>Website:</strong> <a href="https://erp.tmcybertech.in" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">https://erp.tmcybertech.in</a></p>
              </div>
            </div>

          </div>

        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TharuHRPrivacyPolicy;
