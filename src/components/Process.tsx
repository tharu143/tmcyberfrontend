import React from 'react';
import { Calendar, ClipboardList, Code, Rocket, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Process: React.FC = () => {
  const steps = [
    {
      icon: <Calendar className="h-8 w-8 text-white" />,
      title: "Schedule a Free Consultation",
      description: "Have a chat with our founder Josh to discuss your needs.",
    },
    {
      icon: <ClipboardList className="h-8 w-8 text-white" />,
      title: "Custom Strategy Plan",
      description: "We’ll create a tailored plan to transform your website.",
    },
    {
      icon: <Code className="h-8 w-8 text-white" />,
      title: "Website Development",
      description: "Our team of designers and developers will bring your vision to life in under 4 weeks.",
    },
    {
      icon: <Rocket className="h-8 w-8 text-white" />,
      title: "Launch and Grow",
      description: "Be the envy of your competitors with a website that attracts, engages, and converts visitors into customers.",
    },
  ];

  return (
    <section id="process" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#094323] mb-4">Our Process</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A seamless journey to transform your business with a stunning website
          </p>
        </div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-[#094323] opacity-20"></div>

          {steps.map((step, index) => (
            <div
              key={index}
              className={`flex items-center mb-12 relative ${
                index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
              }`}
            >
              {/* Timeline Dot */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-[#094323] rounded-full z-10 flex items-center justify-center">
                <div className="w-3 h-3 bg-white rounded-full"></div>
              </div>

              {/* Step Content */}
              <div className={`w-1/2 px-6 ${index % 2 === 0 ? 'text-right' : 'text-left'}`}>
                <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                  <div className="bg-[#094323] inline-flex p-3 rounded-full mb-4">
                    {step.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              </div>

              {/* Spacer */}
              <div className="w-1/2"></div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            to="/contact"
            className="bg-[#094323] hover:bg-[#0d5c31] text-white py-3 px-8 rounded-md font-medium transition-all inline-flex items-center mr-4"
          >
            Get Started Now <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
          <Link
            to="/"
            className="bg-white hover:bg-gray-100 text-[#094323] border-2 border-[#094323] py-3 px-8 rounded-md font-medium transition-all inline-flex items-center"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Process;