import React from 'react';
import { Smartphone, Monitor, Database, Cloud, Lock, Headphones } from 'lucide-react';

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ icon, title, description }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="bg-[#094323] inline-flex p-3 rounded-full text-white mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-gray-800 mb-3">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

const Services: React.FC = () => {
  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#094323] mb-4">Our Services</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We offer a wide range of IT services to help your business grow and succeed in the digital era
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <ServiceCard 
            icon={<Smartphone className="h-6 w-6" />}
            title="Mobile App Development"
            description="Custom iOS & Android mobile applications designed to meet your specific business requirements and user needs."
          />
          
          <ServiceCard 
            icon={<Monitor className="h-6 w-6" />}
            title="Web Development"
            description="Responsive and user-friendly websites optimized for performance and conversion to help your business stand out."
          />
          
          <ServiceCard 
            icon={<Database className="h-6 w-6" />}
            title="Database Management"
            description="Efficient database design, implementation, and management to ensure your data is secure and accessible."
          />
          
          <ServiceCard 
            icon={<Cloud className="h-6 w-6" />}
            title="Cloud Solutions"
            description="Secure and scalable cloud infrastructure to optimize your operations and reduce costs."
          />
          
          <ServiceCard 
            icon={<Lock className="h-6 w-6" />}
            title="Cyber Security"
            description="Comprehensive security solutions to protect your business from emerging threats and vulnerabilities."
          />
          
          <ServiceCard 
            icon={<Headphones className="h-6 w-6" />}
            title="IT Support"
            description="24/7 technical support and maintenance to keep your systems running smoothly and efficiently."
          />
        </div>
        
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-semibold text-[#094323] mb-6">Why Choose Our Services?</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h4 className="font-bold text-gray-800 mb-2">Expert Team</h4>
              <p className="text-gray-600">Skilled professionals with years of industry experience</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h4 className="font-bold text-gray-800 mb-2">Custom Solutions</h4>
              <p className="text-gray-600">Tailored services to meet your specific requirements</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h4 className="font-bold text-gray-800 mb-2">Timely Delivery</h4>
              <p className="text-gray-600">Projects completed on schedule and within budget</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h4 className="font-bold text-gray-800 mb-2">Ongoing Support</h4>
              <p className="text-gray-600">Continuous assistance even after project completion</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;