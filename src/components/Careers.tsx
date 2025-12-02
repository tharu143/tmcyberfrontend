import React from 'react';
import { Code, Smartphone, Database, Server, Briefcase, Clock, DollarSign, GraduationCap, ArrowRight } from 'lucide-react';

interface JobCardProps {
  icon: React.ReactNode;
  title: string;
  experience: string;
  salary: string;
  internship: string;
  applyLink: string;
}

const JobCard: React.FC<JobCardProps> = ({ icon, title, experience, salary, internship, applyLink }) => {
  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100 hover:shadow-xl transition-all duration-300 group flex flex-col h-full">
      <div className="w-14 h-14 bg-slate-50 rounded-xl flex items-center justify-center text-cyan-600 mb-6 group-hover:bg-cyan-600 group-hover:text-white transition-colors duration-300">
        {icon}
      </div>

      <h3 className="text-xl font-bold text-slate-900 mb-4">{title}</h3>

      <div className="space-y-3 mb-8 flex-grow">
        <div className="flex items-start gap-3 text-slate-600">
          <Clock className="h-5 w-5 text-cyan-500 flex-shrink-0 mt-0.5" />
          <div>
            <span className="font-medium text-slate-900 block text-sm">Experience</span>
            <span className="text-sm">{experience}</span>
          </div>
        </div>

        <div className="flex items-start gap-3 text-slate-600">
          <DollarSign className="h-5 w-5 text-cyan-500 flex-shrink-0 mt-0.5" />
          <div>
            <span className="font-medium text-slate-900 block text-sm">Salary</span>
            <span className="text-sm">{salary}</span>
          </div>
        </div>

        <div className="flex items-start gap-3 text-slate-600">
          <GraduationCap className="h-5 w-5 text-cyan-500 flex-shrink-0 mt-0.5" />
          <div>
            <span className="font-medium text-slate-900 block text-sm">Internship</span>
            <span className="text-sm">{internship}</span>
          </div>
        </div>
      </div>

      <a
        href={applyLink}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full bg-slate-50 hover:bg-cyan-50 text-slate-700 hover:text-cyan-700 py-3 px-6 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 group-hover:bg-cyan-600 group-hover:text-white"
      >
        Apply Now <ArrowRight className="h-4 w-4" />
      </a>
    </div>
  );
};

const Careers: React.FC = () => {
  const applyFormLink = "https://forms.gle/your-form-link-here";

  return (
    <section id="careers" className="py-24 bg-slate-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <span className="text-cyan-600 font-medium tracking-wider uppercase text-sm">Join Our Team</span>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mt-4 mb-6">
            Build the <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600">Future</span> With Us
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            We're looking for passionate individuals who want to make a difference through technology.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <JobCard
            icon={<Code className="h-7 w-7" />}
            title="MERN Developer"
            experience="0-1 Year"
            salary="Competitive & Performance Based"
            internship="Paid Internship Available"
            applyLink={applyFormLink}
          />

          <JobCard
            icon={<Smartphone className="h-7 w-7" />}
            title="Flutter Developer"
            experience="0-1 Year"
            salary="Competitive & Performance Based"
            internship="Paid Internship Available"
            applyLink={applyFormLink}
          />

          <JobCard
            icon={<Database className="h-7 w-7" />}
            title="ERPNext Developer"
            experience="0-1 Year"
            salary="Competitive & Performance Based"
            internship="Paid Internship Available"
            applyLink={applyFormLink}
          />

          <JobCard
            icon={<Server className="h-7 w-7" />}
            title="Python Developer"
            experience="0-1 Year"
            salary="Competitive & Performance Based"
            internship="Paid Internship Available"
            applyLink={applyFormLink}
          />
        </div>

        <div className="mt-20 bg-slate-900 rounded-3xl p-10 md:p-16 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -ml-32 -mb-32"></div>
          </div>

          <div className="relative z-10">
            <Briefcase className="h-12 w-12 text-cyan-400 mx-auto mb-6" />
            <h3 className="text-3xl font-bold text-white mb-4">Don't see a perfect fit?</h3>
            <p className="text-slate-300 max-w-2xl mx-auto mb-8 text-lg">
              We're always on the lookout for talent. Send us your resume and we'll keep you in mind for future opportunities.
            </p>
            <a
              href="mailto:tmcybertech.in@proton.me"
              className="inline-flex items-center bg-white text-slate-900 py-3 px-8 rounded-xl font-bold hover:bg-cyan-50 transition-colors"
            >
              Email Us Your Resume
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Careers;