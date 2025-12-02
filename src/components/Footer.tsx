import React from 'react';
import { Facebook, Twitter, Linkedin, Instagram, Server, Mail, Phone, MapPin, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-900">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Company Info */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-6 group">
              <div className="p-2 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg group-hover:shadow-lg group-hover:shadow-cyan-500/25 transition-all">
                <Server className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold text-white tracking-tight">TM Cyber Tech</span>
            </Link>
            <p className="text-slate-400 mb-6 leading-relaxed">
              Empowering businesses with next-generation IT solutions. From ERPNext implementation to advanced cybersecurity, we are your trusted technology partner.
            </p>
            <div className="flex gap-4">
              {[
                { icon: <Facebook className="h-5 w-5" />, href: "https://facebook.com" },
                { icon: <Twitter className="h-5 w-5" />, href: "https://twitter.com" },
                { icon: <Linkedin className="h-5 w-5" />, href: "https://www.linkedin.com/in/tharun-kumar-k-a76185252" },
                { icon: <Instagram className="h-5 w-5" />, href: "https://www.instagram.com/tm_cyber_tech" }
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-slate-400 hover:bg-cyan-500 hover:text-white transition-all duration-300"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {[
                { label: "Home", path: "/" },
                { label: "Services", path: "/services" },
                { label: "Products", path: "/products" },
                { label: "Blog", path: "/blog" },
                { label: "Careers", path: "/#careers" }, // Updated to anchor link
                { label: "Contact", path: "/contact" }
              ].map((link, index) => (
                <li key={index}>
                  {link.path.startsWith('/#') ? (
                    <a
                      href={link.path}
                      className="text-slate-400 hover:text-cyan-400 transition-colors flex items-center gap-2 group"
                    >
                      <ArrowRight className="h-3 w-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      to={link.path}
                      className="text-slate-400 hover:text-cyan-400 transition-colors flex items-center gap-2 group"
                    >
                      <ArrowRight className="h-3 w-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6">Our Expertise</h3>
            <ul className="space-y-3">
              {[
                "ERPNext Implementation",
                "Mobile App Development",
                "Web Development",
                "Cloud Solutions",
                "Cyber Security",
                "IT Consulting"
              ].map((service, index) => (
                <li key={index}>
                  <Link
                    to="/services"
                    className="text-slate-400 hover:text-cyan-400 transition-colors block"
                  >
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-cyan-500 mt-1 flex-shrink-0" />
                <div>
                  <div className="text-slate-400 text-sm">Phone</div>
                  <a href="tel:+918428193191" className="text-white hover:text-cyan-400 transition-colors font-medium">
                    +91 84281 93191
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-cyan-500 mt-1 flex-shrink-0" />
                <div>
                  <div className="text-slate-400 text-sm">Email</div>
                  <a href="mailto:tmcybertech.in@proton.me" className="text-white hover:text-cyan-400 transition-colors font-medium">
                    tmcybertech.in@proton.me
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-cyan-500 mt-1 flex-shrink-0" />
                <div>
                  <div className="text-slate-400 text-sm">Headquarters</div>
                  <p className="text-white">
                    106, RC School Street,<br />
                    Erasakkanayackanur, Theni,<br />
                    Tamil Nadu, India
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
          <p>
            © {currentYear} TM Cyber Tech. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link to="/app-privacy-policy" className="hover:text-cyan-400 transition-colors">Privacy Policy</Link>
            <a href="#" className="hover:text-cyan-400 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-cyan-400 transition-colors">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;