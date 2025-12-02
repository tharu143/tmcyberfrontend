import React from 'react';
import { Link } from 'react-router-dom';
import { Smartphone, Monitor, Database, Cloud, Lock, Server, ArrowRight } from 'lucide-react';

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  featured?: boolean;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ icon, title, description, featured = false }) => {
  return (
    <Link to="/services" className={`group relative p-8 rounded-2xl transition-all duration-300 hover:-translate-y-2 flex flex-col h-full ${featured
      ? 'bg-gradient-to-br from-slate-800 to-slate-900 border border-cyan-500/30 shadow-2xl shadow-cyan-500/10'
      : 'bg-slate-800 border border-slate-700 hover:border-cyan-500/50 hover:shadow-xl hover:shadow-cyan-500/5'
      }`}>
      <div className={`inline-flex p-4 rounded-xl mb-6 transition-colors w-fit ${featured ? 'bg-cyan-500/20 text-cyan-400' : 'bg-slate-700/50 text-slate-300 group-hover:bg-cyan-500/20 group-hover:text-cyan-400'
        }`}>
        {icon}
      </div>
      <h3 className={`text-xl font-bold mb-4 ${featured ? 'text-white' : 'text-slate-100 group-hover:text-white'}`}>
        {title}
      </h3>
      <p className="text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors mb-6 flex-grow">
        {description}
      </p>

      <div className={`flex items-center text-sm font-semibold mt-auto ${featured ? 'text-cyan-400' : 'text-slate-500 group-hover:text-cyan-400'} transition-colors`}>
        Learn more <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
      </div>

      {featured && (
        <div className="absolute top-4 right-4 px-3 py-1 bg-cyan-500/20 border border-cyan-500/30 rounded-full text-xs font-medium text-cyan-400">
          Featured
        </div>
      )}
    </Link>
  );
};

const Services: React.FC = () => {
  return (
    <section id="services" className="py-24 bg-slate-950 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <span className="text-cyan-400 font-medium tracking-wider uppercase text-sm">What We Do</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-4 mb-6">
            Enterprise-Grade <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">IT Solutions</span>
          </h2>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto">
            We deliver comprehensive technology services designed to scale with your business needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Featured Service: ERPNext */}
          <div className="md:col-span-2 lg:col-span-1">
            <ServiceCard
              icon={<Server className="h-8 w-8" />}
              title="ERPNext Implementation"
              description="End-to-end ERPNext deployment, customization, and support. Streamline your HR, Accounting, Inventory, and CRM into one unified platform."
              featured={true}
            />
          </div>

          <ServiceCard
            icon={<Smartphone className="h-8 w-8" />}
            title="Mobile App Development"
            description="Native and cross-platform mobile applications built with Flutter and React Native for seamless user experiences."
          />

          <ServiceCard
            icon={<Monitor className="h-8 w-8" />}
            title="Web Development"
            description="Modern, responsive web applications using React, Next.js, and Node.js that drive engagement and conversion."
          />

          <ServiceCard
            icon={<Database className="h-8 w-8" />}
            title="Database Architecture"
            description="Scalable database design and management using MongoDB, PostgreSQL, and Redis for high-performance applications."
          />

          <ServiceCard
            icon={<Cloud className="h-8 w-8" />}
            title="Cloud Infrastructure"
            description="Secure cloud migration and DevOps services on AWS, Azure, and Google Cloud Platform."
          />

          <ServiceCard
            icon={<Lock className="h-8 w-8" />}
            title="Cyber Security"
            description="Advanced threat protection, penetration testing, and security audits to safeguard your digital assets."
          />
        </div>

        {/* Stats Section */}
        <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-slate-800 pt-12">
          <div className="text-center">
            <div className="text-4xl font-bold text-white mb-2">10+</div>
            <div className="text-slate-500 text-sm uppercase tracking-wide">Years Experience</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-white mb-2">50+</div>
            <div className="text-slate-500 text-sm uppercase tracking-wide">Enterprise Clients</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-white mb-2">100%</div>
            <div className="text-slate-500 text-sm uppercase tracking-wide">Project Success</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-white mb-2">24/7</div>
            <div className="text-slate-500 text-sm uppercase tracking-wide">Support</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;