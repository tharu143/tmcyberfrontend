import { useState, useEffect } from 'react';
import { getLicenses, approveLicense } from '../../api';
import { CheckCircle, XCircle } from 'react-feather';

const LicenseManagement = () => {
  const [licenses, setLicenses] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLicenses();
  }, []);

  const fetchLicenses = async () => {
    try {
      const data = await getLicenses();
      setLicenses(data);
      setLoading(false);
    } catch (err) {
      setError(err.message || 'Failed to fetch licenses');
      setLoading(false);
    }
  };

  const handleApprove = async (licenseNumber) => {
    try {
      await approveLicense(licenseNumber);
      setLicenses(licenses.map((license) =>
        license.licenseNumber === licenseNumber ? { ...license, isApproved: true } : license
      ));
    } catch (err) {
      setError(err.message || 'Failed to approve license');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-radial dark:bg-dark-900 p-6 font-inter">
      <div className="container mx-auto">
        <h2 className="text-2xl font-poppins font-bold text-gray-800 dark:text-white mb-6">
          License Management
        </h2>
        {error && (
          <p className="text-red-500 mb-4 bg-red-100 dark:bg-red-900 p-3 rounded-lg" role="alert">
            {error}
          </p>
        )}
        {loading ? (
          <p className="text-gray-600 dark:text-gray-400">Loading licenses...</p>
        ) : (
          <div className="bg-white dark:bg-dark-800 rounded-lg shadow-lg overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-dark-700">
              <thead className="bg-primary-500 text-white">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">License Number</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Device ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Created At</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-dark-800 divide-y divide-gray-200 dark:divide-dark-700">
                {licenses.map((license) => (
                  <tr key={license.licenseNumber} className="hover:bg-gray-50 dark:hover:bg-dark-700">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">
                      {license.licenseNumber}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">
                      {license.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">
                      {license.deviceId}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {license.isApproved ? (
                        <span className="text-green-500 flex items-center">
                          <CheckCircle size={16} className="mr-1" /> Approved
                        </span>
                      ) : (
                        <span className="text-red-500 flex items-center">
                          <XCircle size={16} className="mr-1" /> Pending
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">
                      {new Date(license.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {!license.isApproved && (
                        <button
                          onClick={() => handleApprove(license.licenseNumber)}
                          className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                        >
                          Approve
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default LicenseManagement;