import React, { useState, useEffect } from 'react';
import { Menu, X, Monitor, Server } from 'lucide-react';
import { Link } from './Link';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-[#094323] shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <Server className="h-8 w-8 text-white" />
              <span className="ml-2 text-xl font-bold text-white">TM Cyber Tech</span>
            </div>
          </div>
          
          <nav className="hidden md:block">
            <ul className="flex space-x-8">
              <li><Link href="#home" className="text-white hover:text-green-200">Home</Link></li>
              <li><Link href="#services" className="text-white hover:text-green-200">Services</Link></li>
              <li><Link href="#products" className="text-white hover:text-green-200">Products</Link></li>
              <li><Link href="#blog" className="text-white hover:text-green-200">Blog</Link></li>
              <li><Link href="#contact" className="text-white hover:text-green-200">Contact</Link></li>
            </ul>
          </nav>
          
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-green-200 focus:outline-none"
            >
              {isOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-[#094323]">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link href="#home" className="block px-3 py-2 text-white hover:text-green-200" onClick={() => setIsOpen(false)}>Home</Link>
            <Link href="#services" className="block px-3 py-2 text-white hover:text-green-200" onClick={() => setIsOpen(false)}>Services</Link>
            <Link href="#products" className="block px-3 py-2 text-white hover:text-green-200" onClick={() => setIsOpen(false)}>Products</Link>
            <Link href="#blog" className="block px-3 py-2 text-white hover:text-green-200" onClick={() => setIsOpen(false)}>Blog</Link>
            <Link href="#contact" className="block px-3 py-2 text-white hover:text-green-200" onClick={() => setIsOpen(false)}>Contact</Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;