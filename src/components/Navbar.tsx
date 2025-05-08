import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Determine if we're on the homepage
  const isHomePage = location.pathname === '/';

  // Handle scroll event to change background
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Ensure Navbar is visible on homepage and has a background when scrolled or on other pages
  const navbarBgClass = isHomePage
    ? isScrolled
      ? 'bg-[#094323] shadow-md'
      : 'bg-transparent'
    : 'bg-[#094323] shadow-md';

  // Smooth scroll to section
  const scrollToSection = (sectionId: string) => {
    // If not on homepage, navigate to homepage first
    if (!isHomePage) {
      navigate('/');
      setTimeout(() => {
        const section = document.getElementById(sectionId);
        if (section) {
          section.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100); // Delay to ensure navigation completes
    } else {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsOpen(false); // Close mobile menu after clicking
  };

  return (
    <nav
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${navbarBgClass}`}
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Title/Logo */}
        <Link to="/" className="text-2xl font-bold text-white">
          TM Cyber Tech
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8">
          <Link
            to="/"
            className={`text-lg font-medium ${
              location.pathname === '/'
                ? 'text-white border-b-2 border-white'
                : 'text-gray-200 hover:text-white'
            }`}
          >
            Home
          </Link>
          <Link
            to="/services"
            className={`text-lg font-medium ${
              location.pathname === '/services'
                ? 'text-white border-b-2 border-white'
                : 'text-gray-200 hover:text-white'
            }`}
          >
            Services
          </Link>
          <Link
            to="/products"
            className={`text-lg font-medium ${
              location.pathname === '/products'
                ? 'text-white border-b-2 border-white'
                : 'text-gray-200 hover:text-white'
            }`}
          >
            Products
          </Link>
          <Link
            to="/blog"
            className={`text-lg font-medium ${
              location.pathname === '/blog'
                ? 'text-white border-b-2 border-white'
                : 'text-gray-200 hover:text-white'
            }`}
          >
            Blog
          </Link>
          <button
            onClick={() => scrollToSection('careers')}
            className={`text-lg font-medium ${
              location.hash === '#careers'
                ? 'text-white border-b-2 border-white'
                : 'text-gray-200 hover:text-white'
            }`}
          >
            Careers
          </button>
          <button
            onClick={() => scrollToSection('contact')}
            className={`text-lg font-medium ${
              location.hash === '#contact'
                ? 'text-white border-b-2 border-white'
                : 'text-gray-200 hover:text-white'
            }`}
          >
            Contact
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white focus:outline-none"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-[#094323] shadow-md">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <Link
              to="/"
              onClick={() => setIsOpen(false)}
              className={`text-lg font-medium ${
                location.pathname === '/'
                  ? 'text-white border-b-2 border-white'
                  : 'text-gray-200 hover:text-white'
              }`}
            >
              Home
            </Link>
            <Link
              to="/services"
              onClick={() => setIsOpen(false)}
              className={`text-lg font-medium ${
                location.pathname === '/services'
                  ? 'text-white border-b-2 border-white'
                  : 'text-gray-200 hover:text-white'
              }`}
            >
              Services
            </Link>
            <Link
              to="/products"
              onClick={() => setIsOpen(false)}
              className={`text-lg font-medium ${
                location.pathname === '/products'
                  ? 'text-white border-b-2 border-white'
                  : 'text-gray-200 hover:text-white'
              }`}
            >
              Products
            </Link>
            <Link
              to="/blog"
              onClick={() => setIsOpen(false)}
              className={`text-lg font-medium ${
                location.pathname === '/blog'
                  ? 'text-white border-b-2 border-white'
                  : 'text-gray-200 hover:text-white'
              }`}
            >
              Blog
            </Link>
            <button
              onClick={() => scrollToSection('careers')}
              className={`text-lg font-medium text-left ${
                location.hash === '#careers'
                  ? 'text-white border-b-2 border-white'
                  : 'text-gray-200 hover:text-white'
              }`}
            >
              Careers
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className={`text-lg font-medium text-left ${
                location.hash === '#contact'
                  ? 'text-white border-b-2 border-white'
                  : 'text-gray-200 hover:text-white'
              }`}
            >
              Contact
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;