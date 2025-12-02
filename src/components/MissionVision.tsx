import React from 'react';
import { Target, Eye, Compass, Flag } from 'lucide-react';

const MissionVision: React.FC = () => {
  return (
    <section id="mission-vision" className="py-24 bg-slate-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <span className="text-cyan-600 font-medium tracking-wider uppercase text-sm">Our Purpose</span>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mt-4 mb-6">
            Driving <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600">Innovation</span> Forward
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            We are driven by a singular purpose: to transform businesses through technology.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Mission Card */}
          <div className="bg-white p-10 rounded-3xl shadow-xl border border-slate-100 relative overflow-hidden group hover:shadow-2xl transition-all duration-300">
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-50 rounded-full -mr-32 -mt-32 transition-transform group-hover:scale-150 duration-700"></div>

            <div className="relative z-10">
              <div className="w-16 h-16 bg-cyan-100 rounded-2xl flex items-center justify-center text-cyan-600 mb-8 group-hover:bg-cyan-600 group-hover:text-white transition-colors duration-300">
                <Target className="h-8 w-8" />
              </div>

              <h3 className="text-3xl font-bold text-slate-900 mb-6">Our Mission</h3>
              <p className="text-lg text-slate-600 leading-relaxed mb-8">
                To empower businesses and individuals with innovative and impactful software solutions that drive growth, enhance user experiences, and transform industries. We strive to bridge the gap between complex technology and user-friendly applications.
              </p>

              <ul className="space-y-4">
                {[
                  "Deliver excellence in every line of code",
                  "Prioritize user-centric design",
                  "Foster continuous innovation"
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-3 text-slate-700 font-medium">
                    <div className="w-2 h-2 rounded-full bg-cyan-500"></div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Vision Card */}
          <div className="bg-slate-900 p-10 rounded-3xl shadow-xl border border-slate-800 relative overflow-hidden group hover:shadow-2xl transition-all duration-300">
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-900/30 rounded-full -ml-32 -mb-32 transition-transform group-hover:scale-150 duration-700"></div>

            <div className="relative z-10">
              <div className="w-16 h-16 bg-slate-800 rounded-2xl flex items-center justify-center text-cyan-400 mb-8 group-hover:bg-cyan-500 group-hover:text-white transition-colors duration-300">
                <Eye className="h-8 w-8" />
              </div>

              <h3 className="text-3xl font-bold text-white mb-6">Our Vision</h3>
              <p className="text-lg text-slate-300 leading-relaxed mb-8">
                To be the global leader in digital transformation, creating a future where technology seamlessly integrates with daily life to solve real-world problems. We envision a world connected by intelligent, intuitive, and secure software solutions.
              </p>

              <ul className="space-y-4">
                {[
                  "Global technology leadership",
                  "Pioneering AI & Cloud solutions",
                  "Sustainable digital ecosystem"
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-3 text-slate-300 font-medium">
                    <div className="w-2 h-2 rounded-full bg-cyan-500"></div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Core Values */}
        <div className="mt-24">
          <div className="text-center mb-16">
            <h3 className="text-2xl font-bold text-slate-900">Our Core Values</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Compass className="h-6 w-6" />,
                title: "Integrity",
                desc: "We believe in transparent, honest, and ethical business practices in all our dealings."
              },
              {
                icon: <Flag className="h-6 w-6" />,
                title: "Excellence",
                desc: "We are committed to delivering the highest quality in every project we undertake."
              },
              {
                icon: <Target className="h-6 w-6" />,
                title: "Innovation",
                desc: "We constantly push boundaries to find new and better ways to solve problems."
              }
            ].map((value, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 text-center hover:-translate-y-1 transition-transform duration-300">
                <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center text-cyan-600 mx-auto mb-4">
                  {value.icon}
                </div>
                <h4 className="text-xl font-bold text-slate-900 mb-3">{value.title}</h4>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {value.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionVision;