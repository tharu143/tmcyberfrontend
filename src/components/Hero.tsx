import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Code, Shield, Zap, Globe } from 'lucide-react';

const Hero: React.FC = () => {
  const navigate = useNavigate();

  const scrollToSection = (sectionId: string) => {
    navigate('/');
    setTimeout(() => {
      const section = document.getElementById(sectionId);
      if (section) section.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center bg-slate-900 overflow-hidden pt-20">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop')] bg-cover bg-center opacity-10"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/95 to-slate-900/80"></div>

      {/* Animated Blobs */}
      <div className="absolute top-20 right-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 left-20 w-72 h-72 bg-cyan-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12">

          {/* Text Content */}
          <div className="lg:w-1/2 space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-cyan-400 text-sm font-medium">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
              </span>
              Leading IT Solutions Provider
            </div>

            <h1 className="text-5xl lg:text-7xl font-bold text-white leading-tight">
              Innovate Your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">
                Digital Future
              </span>
            </h1>

            <p className="text-xl text-slate-300 max-w-xl leading-relaxed">
              We transform businesses with cutting-edge ERPNext solutions, custom software development, and robust cybersecurity infrastructure.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => scrollToSection('contact')}
                className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white rounded-lg font-semibold shadow-lg hover:shadow-cyan-500/25 transition-all flex items-center justify-center gap-2 group"
              >
                Get Started
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => navigate('/services')}
                className="px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 rounded-lg font-semibold transition-all flex items-center justify-center gap-2"
              >
                Explore Services
              </button>
            </div>

            <div className="pt-8 border-t border-slate-800 grid grid-cols-3 gap-8">
              <div>
                <h3 className="text-3xl font-bold text-white">500+</h3>
                <p className="text-slate-400 text-sm">Projects Delivered</p>
              </div>
              <div>
                <h3 className="text-3xl font-bold text-white">98%</h3>
                <p className="text-slate-400 text-sm">Client Satisfaction</p>
              </div>
              <div>
                <h3 className="text-3xl font-bold text-white">24/7</h3>
                <p className="text-slate-400 text-sm">Support Available</p>
              </div>
            </div>
          </div>

          {/* Visual Content */}
          <div className="lg:w-1/2 relative hidden lg:block">
            <div className="relative w-full h-[600px] bg-slate-800/50 rounded-2xl border border-slate-700 backdrop-blur-sm p-6 shadow-2xl transform rotate-2 hover:rotate-0 transition-all duration-500">
              {/* Mockup Header */}
              <div className="flex items-center gap-2 mb-6 border-b border-slate-700 pb-4">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <div className="ml-4 px-3 py-1 bg-slate-900 rounded-md text-xs text-slate-400 font-mono">
                  dashboard.tmcybertech.com
                </div>
              </div>

              {/* Mockup Content Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 bg-slate-900/50 p-4 rounded-xl border border-slate-700/50">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-500/20 rounded-lg text-blue-400">
                        <Zap className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="text-sm text-slate-400">System Performance</div>
                        <div className="text-xl font-bold text-white">98.5%</div>
                      </div>
                    </div>
                    <div className="text-green-400 text-sm">+2.4%</div>
                  </div>
                  <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full w-[98.5%] bg-blue-500 rounded-full"></div>
                  </div>
                </div>

                <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-700/50">
                  <div className="p-2 bg-cyan-500/20 rounded-lg text-cyan-400 w-fit mb-3">
                    <Code className="w-6 h-6" />
                  </div>
                  <div className="text-sm text-slate-400">Active Projects</div>
                  <div className="text-2xl font-bold text-white">24</div>
                </div>

                <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-700/50">
                  <div className="p-2 bg-purple-500/20 rounded-lg text-purple-400 w-fit mb-3">
                    <Shield className="w-6 h-6" />
                  </div>
                  <div className="text-sm text-slate-400">Security Status</div>
                  <div className="text-2xl font-bold text-white">Secure</div>
                </div>

                <div className="col-span-2 bg-slate-900/50 p-4 rounded-xl border border-slate-700/50 h-48 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-grid-slate-700/20 [mask-image:linear-gradient(0deg,white,transparent)]"></div>
                  <div className="text-center z-10">
                    <Globe className="w-12 h-12 text-slate-600 mx-auto mb-2" />
                    <div className="text-slate-500 text-sm">Global Infrastructure Map</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-10 -right-10 p-4 bg-slate-800 rounded-xl border border-slate-700 shadow-xl animate-bounce delay-700">
              <Code className="w-8 h-8 text-cyan-400" />
            </div>
            <div className="absolute -bottom-5 -left-5 p-4 bg-slate-800 rounded-xl border border-slate-700 shadow-xl animate-bounce">
              <Shield className="w-8 h-8 text-blue-500" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;