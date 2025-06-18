import React from 'react';
import { Facebook, Twitter, Linkedin, Instagram, Server } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#094323] text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="flex items-center mb-4">
              <Server className="h-8 w-8 text-white" />
              <span className="ml-2 text-xl font-bold">TM Cyber Tech</span>
            </Link>
            <p className="text-gray-300 mb-6">
              Transforming businesses through innovative technology solutions and expert IT services.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" className="text-white hover:text-gray-300 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="https://twitter.com" className="text-white hover:text-gray-300 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="https://www.linkedin.com/in/tharun-kumar-k-a76185252?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app" className="text-white hover:text-gray-300 transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="https://www.instagram.com/tm_cyber_tech/profilecard/?igsh=bXN1bGo0am1waDYw" className="text-white hover:text-gray-300 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-300 hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/services" className="text-gray-300 hover:text-white transition-colors">Services</Link></li>
              <li><Link to="/products" className="text-gray-300 hover:text-white transition-colors">Products</Link></li>
              <li><Link to="/blog" className="text-gray-300 hover:text-white transition-colors">Blog</Link></li>
              <li><Link to="/contact" className="text-gray-300 hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li><Link to="/services" className="text-gray-300 hover:text-white transition-colors">Mobile App Development</Link></li>
              <li><Link to="/services" className="text-gray-300 hover:text-white transition-colors">Web Development</Link></li>
              <li><Link to="/services" className="text-gray-300 hover:text-white transition-colors">Cloud Solutions</Link></li>
              <li><Link to="/services" className="text-gray-300 hover:text-white transition-colors">Cyber Security</Link></li>
              <li><Link to="/services" className="text-gray-300 hover:text-white transition-colors">IT Support</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="text-gray-300">Phone: +91 8428193191</li>
              <li className="text-gray-300">WhatsApp: +91 9751846484</li>
              <li className="text-gray-300">Email: tmcybertech.in@proton.me</li>
              <li className="text-gray-300">
                106,RC School Street, Erasakkanayackanur, Theni, Tamil Nadu, India
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-700 text-center md:flex md:justify-between md:text-left">
          <p className="text-gray-300">
            © {new Date().getFullYear()} TM Cyber Tech. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0 space-x-4">
            <a href="#" className="text-gray-300 hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="text-gray-300 hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;