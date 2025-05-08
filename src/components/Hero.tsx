import React from 'react';
import { useNavigate } from 'react-router-dom';

const Hero: React.FC = () => {
  const navigate = useNavigate();

  // Smooth scroll to section
  const scrollToSection = (sectionId: string) => {
    // Always navigate to homepage first
    navigate('/');
    setTimeout(() => {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100); // Delay to ensure navigation completes
  };

  return (
    <section
      id="hero"
      className="relative h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')",
      }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative text-center text-white z-10">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Innovate Your Future with TM Cyber Tech
        </h1>
        <p className="text-xl md:text-2xl mb-8">
          We provide cutting-edge IT solutions to empower your business.
        </p>
        <div className="space-x-4">
          <button
            onClick={() => scrollToSection('contact')}
            className="bg-[#094323] hover:bg-[#0d5c31] text-white py-3 px-8 rounded-md font-medium transition-all"
          >
            Get Started
          </button>
          <button
            onClick={() => scrollToSection('contact')}
            className="bg-transparent border-2 border-white hover:bg-white hover:text-[#094323] text-white py-3 px-8 rounded-md font-medium transition-all"
          >
            Book a Demo Today
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;