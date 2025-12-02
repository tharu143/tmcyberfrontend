import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Utensils, ShoppingBag, Building, Briefcase, Smartphone, Coffee, Warehouse, CheckCircle } from 'lucide-react';

const Products: React.FC = () => {
  return (
    <section id="products" className="py-24 bg-slate-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <span className="text-cyan-600 font-medium tracking-wider uppercase text-sm">Our Products</span>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mt-4 mb-6">
            Software that <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600">Empowers</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Innovative solutions designed to streamline operations and drive growth.
          </p>
        </div>

        {/* Featured Product: Unavu+ */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden mb-24 border border-slate-100">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="p-12 lg:p-16 flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-100 text-cyan-700 w-fit mb-6 font-medium text-sm">
                <Utensils className="h-4 w-4" />
                Flagship Product
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">Unavu+ Restaurant Application</h3>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                A comprehensive restaurant management ecosystem designed to streamline operations, enhance customer experience, and boost revenue through intelligent automation.
              </p>

              <ul className="space-y-4 mb-10">
                {[
                  "Smart Order Management & KDS",
                  "Real-time Inventory Tracking",
                  "AI-Powered Customer Loyalty",
                  "Advanced Analytics Dashboard"
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-cyan-500 flex-shrink-0" />
                    <span className="text-slate-700 font-medium">{item}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-4">
                <Link
                  to="/products/unavu"
                  className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white py-4 px-8 rounded-xl font-semibold transition-all shadow-lg hover:shadow-cyan-500/25 flex items-center gap-2"
                >
                  Request Demo <ArrowRight className="h-5 w-5" />
                </Link>
                <Link
                  to="/contact"
                  className="bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 py-4 px-8 rounded-xl font-semibold transition-all"
                >
                  Contact Sales
                </Link>
              </div>
            </div>

            <div className="relative h-96 lg:h-auto bg-slate-100">
              <img
                src="https://images.pexels.com/photos/2253643/pexels-photo-2253643.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="Restaurant management system"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent flex items-end p-8">
                <div className="text-white">
                  <div className="text-sm font-medium opacity-90">Trusted by</div>
                  <div className="text-2xl font-bold">500+ Restaurants</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mb-12">
          <h3 className="text-2xl font-bold text-slate-900">Specialized Industry Solutions</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              icon: <ShoppingBag className="h-8 w-8" />,
              title: "Retail Management",
              desc: "Complete POS and inventory system for modern retail stores.",
              link: "/products/retail-management"
            },
            {
              icon: <Building className="h-8 w-8" />,
              title: "Real Estate Suite",
              desc: "Property management and tenant portal for real estate agencies.",
              link: "/products/real-estate-suite"
            },
            {
              icon: <Briefcase className="h-8 w-8" />,
              title: "Business Intelligence",
              desc: "Data analytics tools to transform raw data into actionable insights.",
              link: "/products/business-intelligence"
            },
            {
              icon: <Smartphone className="h-8 w-8" />,
              title: "Mobile Shop POS",
              desc: "Specialized billing and repair tracking for mobile phone retailers.",
              link: "/products/mobile-shop-retail-management"
            },
            {
              icon: <Coffee className="h-8 w-8" />,
              title: "Cafe & Tea Shop",
              desc: "Quick-service billing solution optimized for high-volume cafes.",
              link: "/products/tea-shop-billing"
            },
            {
              icon: <Warehouse className="h-8 w-8" />,
              title: "Wholesale Manager",
              desc: "Bulk inventory and B2B sales management for distributors.",
              link: "/products/wholesale-stock-management"
            }
          ].map((product, index) => (
            <div key={index} className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all border border-slate-100 group">
              <div className="w-14 h-14 bg-slate-50 rounded-xl flex items-center justify-center text-cyan-600 mb-6 group-hover:bg-cyan-500/10 transition-colors">
                {product.icon}
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-3">{product.title}</h4>
              <p className="text-slate-500 mb-6 leading-relaxed">
                {product.desc}
              </p>
              <Link
                to={product.link}
                className="text-cyan-600 font-semibold inline-flex items-center hover:text-cyan-700 transition-colors"
              >
                Learn more <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Products;