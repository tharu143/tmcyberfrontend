import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ChevronRight } from 'lucide-react';
import logo from '../assest/logo.png';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navbarBgClass = isScrolled || !isHomePage
    ? 'bg-slate-900/95 backdrop-blur-md shadow-lg py-3'
    : 'bg-transparent py-5';

  const scrollToSection = (sectionId: string) => {
    if (!isHomePage) {
      navigate('/');
      setTimeout(() => {
        const section = document.getElementById(sectionId);
        if (section) section.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const section = document.getElementById(sectionId);
      if (section) section.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  const NavLink = ({ to, children, isScrollLink = false }: { to: string; children: React.ReactNode; isScrollLink?: boolean }) => {
    const isActive = location.pathname === to || (isScrollLink && location.hash === `#${to}`);

    if (isScrollLink) {
      return (
        <button
          onClick={() => scrollToSection(to)}
          className={`text-sm font-medium transition-all duration-300 hover:text-cyan-400 ${isActive ? 'text-cyan-400' : 'text-slate-300'
            }`}
        >
          {children}
        </button>
      );
    }

    return (
      <Link
        to={to}
        className={`text-sm font-medium transition-all duration-300 hover:text-cyan-400 ${isActive ? 'text-cyan-400' : 'text-slate-300'
          }`}
      >
        {children}
      </Link>
    );
  };

  return (
    <nav className={`fixed w-full top-0 z-50 transition-all duration-300 ${navbarBgClass}`}>
      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <img src={logo} alt="TM Cyber Tech" className="w-10 h-10 rounded-lg shadow-lg group-hover:shadow-cyan-500/50 transition-all" />
          <span className="text-xl font-bold text-white tracking-tight">
            TM Cyber <span className="text-cyan-400">Tech</span>
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/services">Services</NavLink>
          <NavLink to="/products">Products</NavLink>
          <NavLink to="/blog">Blog</NavLink>
          <NavLink to="careers" isScrollLink>Careers</NavLink>
          <button
            onClick={() => scrollToSection('contact')}
            className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white px-6 py-2 rounded-full text-sm font-medium transition-all shadow-lg hover:shadow-cyan-500/25 flex items-center gap-2 group"
          >
            Contact Us
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white p-2 focus:outline-none"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden absolute w-full bg-slate-900 border-t border-slate-800 transition-all duration-300 overflow-hidden ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="container mx-auto px-6 py-4 flex flex-col space-y-4">
          <Link to="/" onClick={() => setIsOpen(false)} className="text-slate-300 hover:text-cyan-400 py-2">Home</Link>
          <Link to="/services" onClick={() => setIsOpen(false)} className="text-slate-300 hover:text-cyan-400 py-2">Services</Link>
          <Link to="/products" onClick={() => setIsOpen(false)} className="text-slate-300 hover:text-cyan-400 py-2">Products</Link>
          <Link to="/blog" onClick={() => setIsOpen(false)} className="text-slate-300 hover:text-cyan-400 py-2">Blog</Link>
          <button onClick={() => scrollToSection('careers')} className="text-slate-300 hover:text-cyan-400 py-2 text-left">Careers</button>
          <button onClick={() => scrollToSection('contact')} className="text-cyan-400 font-medium py-2 text-left">Contact Us</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;