import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

const TharuFloraPrivacyPolicy: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <div className="container mx-auto px-6 py-12">
        <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-slate-100 max-w-4xl mx-auto">
          
          {/* Privacy Policy Section */}
          <section className="mb-16">
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2 pb-2">Privacy Policy</h1>
            <p className="text-sm text-slate-500 mb-8 border-b border-slate-100 pb-4">
              <strong>Effective Date:</strong> June 10, 2026 | <strong>App Name:</strong> TharuFlora
            </p>
            
            <div className="prose prose-slate max-w-none text-slate-600 space-y-6">
              <p className="text-lg leading-relaxed text-slate-700">
                This Privacy Policy describes how TharuFlora (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) handles data collected through our mobile application. We are committed to protecting your privacy and ensuring you have a clear understanding of what information is handled.
              </p>

              <div>
                <h2 className="text-xl font-bold text-slate-800 mt-8 mb-3">1. Data Collection & Processing</h2>
                <p className="leading-relaxed mb-4">
                  TharuFlora is built as an offline-first utility application:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <strong>Local Database Storage:</strong> All operations, including product cataloging, sales logs, customer details, and invoice generations, are stored exclusively on your device&apos;s local secure SQLite database. We do not host, access, or share this data on external servers.
                  </li>
                  <li>
                    <strong>Camera and Media Access:</strong> The app requests camera/media library access solely to allow you to upload images for your products or set up a company logo. These images remain stored locally on your device.
                  </li>
                  <li>
                    <strong>No Third-Party Analytics:</strong> We do not use third-party tracking, profiling, or behavioral analytics software.
                  </li>
                </ul>
              </div>

              <div>
                <h2 className="text-xl font-bold text-slate-800 mt-8 mb-3">2. Permissions Declared & Used</h2>
                <p className="leading-relaxed mb-4">
                  The app requests the following system permissions to perform its core functions:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <strong>INTERNET:</strong> Required to sync database backups to your configured email accounts via SMTP, verify license keys, and trigger external WhatsApp communication.
                  </li>
                  <li>
                    <strong>RECEIVE_BOOT_COMPLETED & WAKE_LOCK:</strong> Used to register background tasks (using Workmanager) to schedule and trigger daily automatic Excel database backups.
                  </li>
                </ul>
              </div>

              <div>
                <h2 className="text-xl font-bold text-slate-800 mt-8 mb-3">3. Automated Database Backups via Email</h2>
                <p className="leading-relaxed">
                  If you configure email settings inside the app, the system triggers automated backups of your local database to your configured recipient email address. If none are specified, the system uses default SMTP configurations to send encrypted database backups to <a href="mailto:tmcybertechtheni@gmail.com" className="text-blue-600 hover:underline">tmcybertechtheni@gmail.com</a>.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-bold text-slate-800 mt-8 mb-3">4. License Key Verification</h2>
                <p className="leading-relaxed">
                  To activate the app features on a device, users enter a License Activation Key. The app sends the device identifier to verify licensing authorization status.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-bold text-slate-800 mt-8 mb-3">5. Third-Party Sharing (WhatsApp)</h2>
                <p className="leading-relaxed">
                  The app uses external intents to share invoices via WhatsApp. The recipient phone number, customer name, and invoice summary are passed locally to the official WhatsApp application on your device.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-bold text-slate-800 mt-8 mb-3">6. Updates to This Policy</h2>
                <p className="leading-relaxed">
                  We may update our Privacy Policy from time to time. You are advised to review this page periodically for any changes.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-bold text-slate-800 mt-8 mb-3">7. Contact Us</h2>
                <p className="leading-relaxed">
                  If you have any questions, suggestions, or requests regarding this Privacy Policy, please contact us at:
                </p>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 mt-2">
                  <p><strong>Developer:</strong> Tharunkumar K</p>
                  <p><strong>Email:</strong> <a href="mailto:tmcybertechtheni@gmail.com" className="text-blue-600 hover:underline">tmcybertechtheni@gmail.com</a></p>
                </div>
              </div>
            </div>
          </section>

          <hr className="border-slate-150 my-12" />

          {/* Terms & Conditions Section */}
          <section>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2 pb-2">Terms & Conditions</h1>
            <p className="text-sm text-slate-500 mb-8 border-b border-slate-100 pb-4">
              <strong>Last Updated:</strong> June 10, 2026 | <strong>App Name:</strong> TharuFlora
            </p>

            <div className="prose prose-slate max-w-none text-slate-600 space-y-6">
              <p className="text-lg leading-relaxed text-slate-700">
                Please read these Terms and Conditions (&quot;Terms&quot;) carefully before using the TharuFlora mobile application. By activating or using this application, you agree to be bound by these Terms.
              </p>

              <div>
                <h2 className="text-xl font-bold text-slate-800 mt-8 mb-3">1. License Grant & Device Authorization</h2>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <strong>Single-Device License:</strong> Tharunkumar K grants you a limited, non-transferable, revocable license to use TharuFlora on authorized devices under verified License Activation Keys.
                  </li>
                  <li>
                    <strong>Unauthorized Devices:</strong> Attempting to run this app on unauthorized devices or bypass device verification may result in automatic license termination.
                  </li>
                </ul>
              </div>

              <div>
                <h2 className="text-xl font-bold text-slate-800 mt-8 mb-3">2. User Responsibilities & Data Backup</h2>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <strong>Local Storage Disclaimer:</strong> Because the application operates on a local SQLite database, all inventory details, billing files, and customer records remain strictly on your physical device. If your device is damaged, lost, or reset, your data is unrecoverable unless you keep external backups.
                  </li>
                  <li>
                    <strong>Email Backup Setup:</strong> It is the user&apos;s responsibility to verify that automated email backups (sent daily in the afternoon and evening) are correctly configured and arriving in their mailbox. We are not liable for data loss due to device failures, lack of internet connectivity, or SMTP errors.
                  </li>
                </ul>
              </div>

              <div>
                <h2 className="text-xl font-bold text-slate-800 mt-8 mb-3">3. Usage Restrictions</h2>
                <p className="leading-relaxed mb-4">You agree not to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Attempt to decompile, reverse-engineer, or extract the source code of the application.</li>
                  <li>Exploit the software for illegal commercial activities or spamming customers via automated WhatsApp integrations.</li>
                </ul>
              </div>

              <div>
                <h2 className="text-xl font-bold text-slate-800 mt-8 mb-3">4. Limitation of Liability</h2>
                <p className="leading-relaxed">
                  The app is provided &quot;AS IS&quot; and &quot;AS AVAILABLE&quot; without warranties of any kind. In no event shall Tharunkumar K be liable for any direct, indirect, incidental, special, or consequential damages (including loss of profits, business interruptions, or data loss) arising out of the use or inability to use the application.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-bold text-slate-800 mt-8 mb-3">5. Governing Law</h2>
                <p className="leading-relaxed">
                  These terms shall be governed by and construed in accordance with the laws of India.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-bold text-slate-800 mt-8 mb-3">6. Contact Information</h2>
                <p className="leading-relaxed">
                  For any legal inquiries regarding these Terms, please reach out to the developer at:
                </p>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 mt-2">
                  <p><strong>Developer:</strong> Tharunkumar K</p>
                  <p><strong>Email:</strong> <a href="mailto:tmcybertechtheni@gmail.com" className="text-blue-600 hover:underline">tmcybertechtheni@gmail.com</a></p>
                </div>
              </div>
            </div>
          </section>

        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TharuFloraPrivacyPolicy;
