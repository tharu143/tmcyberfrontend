import React from 'react';
import { Link } from 'react-router-dom';
import { Code, Smartphone, Database, Server } from 'lucide-react';

const JobCard: React.FC<{ icon: React.ReactNode; title: string; experience: string; salary: string; internship: string; applyLink: string }> = ({ icon, title, experience, salary, internship, applyLink }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all">
      <div className="bg-[#094323] inline-flex p-3 rounded-full text-white mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-gray-800 mb-3">{title}</h3>
      <ul className="space-y-2 mb-6">
        <li className="flex items-start">
          <span className="text-gray-600 font-medium mr-2">Experience:</span>
          <span className="text-gray-600">{experience}</span>
        </li>
        <li className="flex items-start">
          <span className="text-gray-600 font-medium mr-2">Salary:</span>
          <span className="text-gray-600">{salary}</span>
        </li>
        <li className="flex items-start">
          <span className="text-gray-600 font-medium mr-2">Internship:</span>
          <span className="text-gray-600">{internship}</span>
        </li>
      </ul>
      <a
        href={applyLink}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-[#094323] hover:bg-[#0d5c31] text-white py-2 px-6 rounded-md font-medium transition-all inline-flex items-center"
      >
        Apply Now
      </a>
    </div>
  );
};

const Careers: React.FC = () => {
  // Placeholder Google Form link (replace with your actual form link)
  const applyFormLink = "https://forms.gle/your-form-link-here";

  return (
    <section id="careers" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#094323] mb-4">Careers</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join our team and be a part of our mission to innovate and empower through technology. Explore opportunities that match your skills and passion.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* MERN Developer */}
          <JobCard
            icon={<Code className="h-6 w-6" />}
            title="MERN Developer"
            experience="0-1 Year"
            salary="As per company norms"
            internship="Paid (Stipend-based internship provided)"
            applyLink={applyFormLink}
          />

          {/* Flutter Developer */}
          <JobCard
            icon={<Smartphone className="h-6 w-6" />}
            title="Flutter Developer"
            experience="0-1 Year"
            salary="As per company norms"
            internship="Paid (Stipend-based internship provided)"
            applyLink={applyFormLink}
          />

          {/* ERPNext Developer */}
          <JobCard
            icon={<Database className="h-6 w-6" />}
            title="ERPNext Developer"
            experience="0-1 Year"
            salary="As per company norms"
            internship="Paid (Stipend-based internship provided)"
            applyLink={applyFormLink}
          />

          {/* Python Developer */}
          <JobCard
            icon={<Server className="h-6 w-6" />}
            title="Python Developer"
            experience="0-1 Year"
            salary="As per company norms"
            internship="Paid (Stipend-based internship provided)"
            applyLink={applyFormLink}
          />
        </div>
      </div>
    </section>
  );
};

export default Careers;