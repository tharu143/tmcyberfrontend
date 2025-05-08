import React from 'react';
import { ArrowRight, Utensils, ShoppingBag, Building, Briefcase } from 'lucide-react';

const Products: React.FC = () => {
  return (
    <section id="products" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#094323] mb-4">Our Products</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Innovative software solutions designed to streamline operations and enhance productivity
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <div className="bg-[#094323] inline-flex p-3 rounded-full text-white mb-4">
              <Utensils className="h-6 w-6" />
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">Unavu+ Restaurant Application</h3>
            <p className="text-lg text-gray-600 mb-6">
              A comprehensive restaurant management system designed to streamline operations, enhance customer experience, and boost revenue.
            </p>
            
            <ul className="space-y-3 mb-8">
              <li className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mr-3 mt-0.5">
                  <span className="text-[#094323] font-bold">✓</span>
                </div>
                <span className="text-gray-600">Order management and processing</span>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mr-3 mt-0.5">
                  <span className="text-[#094323] font-bold">✓</span>
                </div>
                <span className="text-gray-600">Inventory tracking and management</span>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mr-3 mt-0.5">
                  <span className="text-[#094323] font-bold">✓</span>
                </div>
                <span className="text-gray-600">Customer loyalty programs</span>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mr-3 mt-0.5">
                  <span className="text-[#094323] font-bold">✓</span>
                </div>
                <span className="text-gray-600">Analytics and reporting dashboard</span>
              </li>
            </ul>
            
            <div className="flex flex-wrap gap-4">
              <a 
                href="#contact" 
                className="bg-[#094323] hover:bg-[#0d5c31] text-white py-3 px-6 rounded-md font-medium transition-all flex items-center"
              >
                Free Demo Available <ArrowRight className="ml-2 h-5 w-5" />
              </a>
              <a 
                href="#contact" 
                className="bg-white hover:bg-gray-100 text-[#094323] border-2 border-[#094323] py-3 px-6 rounded-md font-medium transition-all"
              >
                Contact for Details
              </a>
            </div>
          </div>
          
          <div className="relative h-80 lg:h-full min-h-[400px]">
            <img 
              src="https://images.pexels.com/photos/2253643/pexels-photo-2253643.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
              alt="Restaurant management system" 
              className="w-full h-full object-cover rounded-lg shadow-xl"
            />
          </div>
        </div>
        
        <div className="text-center mt-20 mb-12">
          <h3 className="text-2xl font-semibold text-[#094323] mb-6">Other Industry Solutions</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all">
            <ShoppingBag className="h-12 w-12 text-[#094323] mb-4" />
            <h4 className="text-xl font-semibold text-gray-800 mb-3">Retail Management</h4>
            <p className="text-gray-600 mb-4">
              Comprehensive solution for inventory management, POS, and customer relationship management.
            </p>
            <a 
              href="#contact" 
              className="text-[#094323] font-medium inline-flex items-center hover:underline"
            >
              Learn more <ArrowRight className="ml-1 h-4 w-4" />
            </a>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all">
            <Building className="h-12 w-12 text-[#094323] mb-4" />
            <h4 className="text-xl font-semibold text-gray-800 mb-3">Real Estate Suite</h4>
            <p className="text-gray-600 mb-4">
              Property management, tenant portal, and maintenance tracking system for real estate businesses.
            </p>
            <a 
              href="#contact" 
              className="text-[#094323] font-medium inline-flex items-center hover:underline"
            >
              Learn more <ArrowRight className="ml-1 h-4 w-4" />
            </a>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all">
            <Briefcase className="h-12 w-12 text-[#094323] mb-4" />
            <h4 className="text-xl font-semibold text-gray-800 mb-3">Business Intelligence</h4>
            <p className="text-gray-600 mb-4">
              Data analytics and reporting tools to help businesses make informed decisions.
            </p>
            <a 
              href="#contact" 
              className="text-[#094323] font-medium inline-flex items-center hover:underline"
            >
              Learn more <ArrowRight className="ml-1 h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Products;