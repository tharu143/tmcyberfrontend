import React from 'react';
import { Calendar, ClipboardList, Code, Rocket, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const Process: React.FC = () => {
  const steps = [
    {
      icon: <Calendar className="h-6 w-6" />,
      title: "Discovery & Consultation",
      description: "We begin by understanding your business goals, challenges, and requirements through in-depth consultation sessions.",
      step: "01"
    },
    {
      icon: <ClipboardList className="h-6 w-6" />,
      title: "Strategy & Planning",
      description: "Our experts devise a comprehensive roadmap, selecting the right technologies and architecture for your solution.",
      step: "02"
    },
    {
      icon: <Code className="h-6 w-6" />,
      title: "Development & Testing",
      description: "We build your solution using agile methodologies, ensuring regular updates and rigorous testing at every stage.",
      step: "03"
    },
    {
      icon: <Rocket className="h-6 w-6" />,
      title: "Deployment & Support",
      description: "We launch your solution smoothly and provide ongoing maintenance and support to ensure optimal performance.",
      step: "04"
    },
  ];

  return (
    <section id="process" className="py-24 bg-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-0 w-64 h-64 bg-cyan-50 rounded-full blur-3xl -ml-32 opacity-60"></div>
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-blue-50 rounded-full blur-3xl -mr-48 opacity-60"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <span className="text-cyan-600 font-medium tracking-wider uppercase text-sm">How We Work</span>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mt-4 mb-6">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600">Process</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            A proven methodology to deliver exceptional results, on time and within budget.
          </p>
        </div>

        <div className="relative">
          {/* Desktop Timeline Line */}
          <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-slate-200"></div>

          <div className="space-y-12 lg:space-y-0">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`flex flex-col lg:flex-row items-center ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                  }`}
              >
                {/* Content Side */}
                <div className={`w-full lg:w-1/2 px-6 ${index % 2 === 0 ? 'lg:text-right' : 'lg:text-left'}`}>
                  <div className={`bg-white p-8 rounded-2xl shadow-lg border border-slate-100 hover:shadow-xl transition-all duration-300 group relative ${index % 2 === 0 ? 'lg:mr-12' : 'lg:ml-12'
                    }`}>
                    <div className={`absolute top-0 ${index % 2 === 0 ? 'right-0 rounded-tr-2xl rounded-bl-2xl' : 'left-0 rounded-tl-2xl rounded-br-2xl'} w-16 h-16 bg-slate-50 flex items-center justify-center text-2xl font-bold text-slate-200 group-hover:text-cyan-100 group-hover:bg-cyan-600 transition-colors duration-300`}>
                      {step.step}
                    </div>

                    <div className={`inline-flex p-3 rounded-xl bg-cyan-50 text-cyan-600 mb-6 group-hover:bg-cyan-600 group-hover:text-white transition-colors duration-300 ${index % 2 === 0 ? 'lg:ml-auto' : ''
                      }`}>
                      {step.icon}
                    </div>

                    <h3 className="text-2xl font-bold text-slate-900 mb-3">{step.title}</h3>
                    <p className="text-slate-600 leading-relaxed">{step.description}</p>
                  </div>
                </div>

                {/* Center Dot (Desktop) */}
                <div className="hidden lg:flex absolute left-1/2 transform -translate-x-1/2 w-12 h-12 bg-white border-4 border-cyan-100 rounded-full items-center justify-center z-10 shadow-sm">
                  <div className="w-4 h-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full"></div>
                </div>

                {/* Empty Side (Desktop) */}
                <div className="hidden lg:block w-1/2"></div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-20">
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white py-4 px-10 rounded-xl font-semibold transition-all shadow-lg hover:shadow-slate-900/25"
          >
            Start Your Project <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Process;