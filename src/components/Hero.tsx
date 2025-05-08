import React from 'react';
import { ArrowRight, Server, Shield, Code } from 'lucide-react';
import { Link } from './Link';

const Hero: React.FC = () => {
  return (
    <section id="home" className="relative min-h-screen bg-white pt-20">
      <div className="absolute inset-0 overflow-hidden">
        <div className="h-full w-full bg-[url('https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')] bg-cover bg-center opacity-10"></div>
      </div>
      
      <div className="container relative mx-auto px-4 py-32 sm:px-6 lg:px-8 flex flex-col items-center justify-center text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#094323] mb-6">
          Next-Generation IT Solutions
        </h1>
        <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mb-10">
          Transforming businesses through innovative technology solutions and expert IT services
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="#services" 
            className="bg-[#094323] hover:bg-[#0d5c31] text-white py-3 px-8 rounded-md font-medium transition-all flex items-center justify-center"
          >
            Our Services <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
          <Link 
            href="#contact" 
            className="bg-white hover:bg-gray-100 text-[#094323] border-2 border-[#094323] py-3 px-8 rounded-md font-medium transition-all"
          >
            Contact Us
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
          <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-all">
            <Server className="h-12 w-12 text-[#094323] mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">IT Infrastructure</h3>
            <p className="text-gray-600">
              Reliable and scalable IT infrastructure solutions for your business needs
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-all">
            <Shield className="h-12 w-12 text-[#094323] mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Cyber Security</h3>
            <p className="text-gray-600">
              Advanced security solutions to protect your valuable business data
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-all">
            <Code className="h-12 w-12 text-[#094323] mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Custom Development</h3>
            <p className="text-gray-600">
              Tailored software solutions designed to boost your business efficiency
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;