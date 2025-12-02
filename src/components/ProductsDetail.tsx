import React from 'react';
import { ArrowRight, Utensils, Monitor, Database, Cloud, Lock, Headphones, Smartphone, ShoppingCart, MapPin, Users, Menu, Calendar, CheckCircle2, Zap, Shield, BarChart3 } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const FeatureCard: React.FC<{ icon: React.ReactNode; title: string; description: string }> = ({ icon, title, description }) => (
  <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl transition-all hover:-translate-y-1 duration-300">
    <div className="bg-cyan-50 inline-flex p-4 rounded-xl text-cyan-600 mb-6">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-slate-900 mb-3">{title}</h3>
    <p className="text-slate-600 leading-relaxed">{description}</p>
  </div>
);

const ModuleCard: React.FC<{ icon: React.ReactNode; title: string; description: string; subModules: string[] }> = ({ icon, title, description, subModules }) => (
  <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl transition-all group">
    <div className="flex items-start gap-4 mb-6">
      <div className="bg-cyan-50 p-3 rounded-xl text-cyan-600 group-hover:bg-cyan-600 group-hover:text-white transition-colors">
        {icon}
      </div>
      <div>
        <h3 className="text-2xl font-bold text-slate-900 mb-2">{title}</h3>
        <p className="text-slate-600 text-sm">{description}</p>
      </div>
    </div>
    <div className="bg-slate-50 rounded-xl p-6">
      <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">Key Features</h4>
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {subModules.map((sub, index) => (
          <li key={index} className="flex items-center gap-2 text-slate-700 text-sm">
            <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full"></div>
            {sub}
          </li>
        ))}
      </ul>
    </div>
  </div>
);

const AppCard: React.FC<{ icon: React.ReactNode; title: string; description: string; features: string[] }> = ({ icon, title, description, features }) => (
  <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100 hover:shadow-2xl transition-all text-center relative overflow-hidden group">
    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 to-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
    <div className="bg-slate-50 inline-flex p-4 rounded-full text-slate-700 mb-6 group-hover:scale-110 transition-transform duration-300">
      {icon}
    </div>
    <h3 className="text-2xl font-bold text-slate-900 mb-3">{title}</h3>
    <p className="text-slate-600 mb-8">{description}</p>
    <ul className="space-y-3 text-left bg-slate-50 p-6 rounded-xl">
      {features.map((feature, index) => (
        <li key={index} className="flex items-start">
          <CheckCircle2 className="h-5 w-5 text-cyan-500 mr-3 flex-shrink-0" />
          <span className="text-slate-700 text-sm font-medium">{feature}</span>
        </li>
      ))}
    </ul>
  </div>
);

const ProductsDetail: React.FC = () => {
  return (
    <div className="font-sans bg-slate-50 min-h-screen">
      <Navbar />
      <div className="pt-20">
        {/* Hero Section */}
        <section className="py-24 bg-white relative overflow-hidden">
          <div className="absolute inset-0 bg-slate-900/5 skew-y-3 transform origin-top-left scale-110"></div>
          <div className="container mx-auto px-6 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-50 text-cyan-700 font-bold text-sm mb-6">
                  <Zap className="h-4 w-4" />
                  <span>Next-Gen Restaurant Management</span>
                </div>
                <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-8 leading-tight">
                  Unavu<span className="text-cyan-600">+</span> Restaurant Management System
                </h1>
                <p className="text-xl text-slate-600 mb-10 leading-relaxed">
                  Transform your restaurant operations with Unavu+, a comprehensive cloud-based solution by TMCyberTech. Streamline orders, manage inventory, and boost revenue with advanced features designed for modern restaurants.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link
                    to="/contact"
                    className="bg-slate-900 hover:bg-slate-800 text-white py-4 px-8 rounded-xl font-bold transition-all flex items-center shadow-lg hover:shadow-slate-900/25"
                  >
                    Start Free Trial <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                  <Link
                    to="/contact"
                    className="bg-white hover:bg-slate-50 text-slate-900 border border-slate-200 py-4 px-8 rounded-xl font-bold transition-all hover:border-slate-300"
                  >
                    Schedule Demo
                  </Link>
                </div>
              </div>
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl opacity-20 blur-2xl animate-pulse"></div>
                <img
                  src="https://images.pexels.com/photos/2253643/pexels-photo-2253643.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt="Unavu+ Dashboard"
                  className="rounded-2xl shadow-2xl w-full h-full object-cover relative z-10 border border-slate-100"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Introduction Section */}
        <section className="py-24 bg-slate-50">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">What is Unavu+?</h2>
              <p className="text-xl text-slate-600 mb-10 leading-relaxed">
                Unavu+ by TMCyberTech is an advanced online food ordering and restaurant management system designed to automate and optimize restaurant operations. It allows restaurants to manage POS billing, inventory, staff, online orders, and more, breaking barriers to reach an unlimited pool of customers.
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center text-cyan-600 font-bold hover:text-cyan-700 text-lg group"
              >
                Explore Unavu+ Features <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </section>

        {/* Core Features Section */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-6">
            <div className="text-center mb-20">
              <span className="text-cyan-600 font-bold tracking-wider uppercase text-sm">Powerful Capabilities</span>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mt-4 mb-6">Core Features</h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Everything you need to manage your restaurant efficiently
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { icon: <Monitor className="h-6 w-6" />, title: 'Cloud-based POS', description: 'Fast and reliable point-of-sale system accessible from anywhere, anytime.' },
                { icon: <Database className="h-6 w-6" />, title: 'Inventory Management', description: 'Track ingredients, manage stock levels, and reduce waste effectively.' },
                { icon: <Cloud className="h-6 w-6" />, title: 'Online Ordering', description: 'Accept orders through your website and mobile app seamlessly.' },
                { icon: <Utensils className="h-6 w-6" />, title: 'Kitchen Management', description: 'Streamline kitchen operations with digital order tracking and management.' },
                { icon: <Smartphone className="h-6 w-6" />, title: 'Mobile Apps', description: 'Dedicated apps for customers, kitchen staff, and waiters.' },
                { icon: <Headphones className="h-6 w-6" />, title: '24/7 Support', description: 'Round-the-clock technical support and assistance whenever you need it.' },
                { icon: <ShoppingCart className="h-6 w-6" />, title: 'QR Code Ordering', description: 'Enable contactless ordering with QR code scanning.' },
                { icon: <MapPin className="h-6 w-6" />, title: 'Location Tracking', description: 'Track delivery locations for seamless third-party integration.' },
              ].map((feature, index) => (
                <FeatureCard key={index} icon={feature.icon} title={feature.title} description={feature.description} />
              ))}
            </div>
          </div>
        </section>

        {/* Detailed Features Section */}
        <section className="py-24 bg-slate-900 text-white">
          <div className="container mx-auto px-6">
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Remarkable Features</h2>
              <p className="text-xl text-slate-400 max-w-3xl mx-auto">
                Discover the powerful features that make Unavu+ unique and dynamic
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { title: 'Exclusive Webpage', description: 'Get a dedicated webpage for online food ordering.' },
                { title: 'Social Media Integration', description: 'Seamlessly connect with various social media platforms.' },
                { title: 'Pre-Order Facilities', description: 'Allow customers to place orders in advance.' },
                { title: 'Take Away Ordering', description: 'Support for take-away orders with ease.' },
                { title: 'Contactless QR Scanner', description: 'Enable contactless ordering with QR code scanning.' },
                { title: 'Multiple Payment Gateways', description: 'Integrate with multiple secure payment options.' },
                { title: 'Location Tracking Engine', description: 'Track delivery locations for third-party services.' },
                { title: 'Marketing Tactics', description: 'Record and implement restaurant marketing strategies.' },
                { title: 'Unlimited Order Processing', description: 'Handle unlimited orders with smooth automation.' },
                { title: 'Chronological Order Recording', description: 'Receive and record orders in a systematic timeline.' },
                { title: 'Google Analytics Integration', description: 'Gain insights with strong Google Analytics integration.' },
                { title: 'Catering Order Support', description: 'Facilitate online food catering orders.' },
                { title: 'Multiple Delivery Methods', description: 'Choose convenient food delivery services.' },
                { title: '24/7 Customer Support', description: 'Access round-the-clock customer management and support.' },
                { title: 'Mobile App Integration', description: 'Fast and seamless mobile app integration.' },
                { title: 'Instantaneous Chat-Bot', description: 'Engage customers with a responsive chatbot.' },
              ].map((feature, index) => (
                <div key={index} className="bg-slate-800 p-6 rounded-2xl hover:bg-slate-700 transition-colors border border-slate-700">
                  <div className="w-10 h-10 bg-cyan-500/10 rounded-lg flex items-center justify-center text-cyan-400 mb-4">
                    <CheckCircle2 className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                  <p className="text-slate-400 text-sm">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Fundamental Modules Section */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-6">
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">Fundamental Modules</h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Explore the essential modules that transform your restaurant operations
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  icon: <Monitor className="h-6 w-6" />,
                  title: 'Counter Dashboard',
                  description: 'Displays real-time data like food preparation status, counter data, and estimated times to keep customers and delivery personnel informed.',
                  subModules: ['Table Number', 'Ordering Time', 'Remaining Time', 'Status', 'Order Number'],
                },
                {
                  icon: <Menu className="h-6 w-6" />,
                  title: 'Kitchen Dashboard',
                  description: 'Designed for kitchen staff to manage orders, including order details, menu board, and preparation timelines.',
                  subModules: ['Menu Board', 'Order Details'],
                },
                {
                  icon: <ShoppingCart className="h-6 w-6" />,
                  title: 'POS Billing Automation',
                  description: 'Streamlines billing with integration to menu management, order management, and delivery systems, supporting multiple payment methods.',
                  subModules: ['POS Billing', 'Cash On Delivery', 'Card Payment', 'Razor Pay', 'Paypal'],
                },
                {
                  icon: <Cloud className="h-6 w-6" />,
                  title: 'Online Order Management',
                  description: 'Manages all incoming orders chronologically, handling new, pending, pre-orders, cancellations, and completed orders.',
                  subModules: ['New Order', 'Pending Order', 'Pre-Order', 'Cancel Order', 'Order List', 'Complete Order'],
                },
                {
                  icon: <Users className="h-6 w-6" />,
                  title: 'Customer Management (CRM)',
                  description: 'Handles customer interactions from order placement to delivery, including feedback and loyalty programs.',
                  subModules: ['Add Customer', 'Customer Feedback', 'Customer Details', 'Loyalty Program'],
                },
                {
                  icon: <Menu className="h-6 w-6" />,
                  title: 'Menu Management System',
                  description: 'Allows customization of menus, setting specials, and automatic updates to avoid miscommunication.',
                  subModules: ['Add Item', 'Add Chief Special or Today’s Special', 'Discounted Item', 'Unavailable Item'],
                },
                {
                  icon: <Smartphone className="h-6 w-6" />,
                  title: 'App & Website Integration',
                  description: 'Provides seamless integration with customer, kitchen, and waiter apps, alongside a powerful website.',
                  subModules: ['Customer App', 'Kitchen App', 'Waiter App'],
                },
                {
                  icon: <MapPin className="h-6 w-6" />,
                  title: 'Food Delivery System',
                  description: 'Manages delivery locations, methods, and tracking, with flexible delivery fee settings.',
                  subModules: ['Add Delivery Location', 'Delivery Method', 'Track Location'],
                },
              ].map((module, index) => (
                <ModuleCard key={index} icon={module.icon} title={module.title} description={module.description} subModules={module.subModules} />
              ))}
            </div>
          </div>
        </section>

        {/* Unavu+ Apps Section */}
        <section className="py-24 bg-slate-50">
          <div className="container mx-auto px-6">
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">Apps for Every Role</h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Dedicated apps to streamline operations for customers, waiters, and kitchen staff
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: <Users className="h-8 w-8" />,
                  title: 'Customer App',
                  description: 'Allows customers to view menus, place orders, reserve tables, and access offers.',
                  features: [
                    'View The Menu Card',
                    'Place The Order',
                    'Reserve Their Desire Corner',
                    'Favourite Box',
                    'Offer & Discount Box',
                  ],
                },
                {
                  icon: <Smartphone className="h-8 w-8" />,
                  title: 'Waiter App',
                  description: 'Enables waiters to manage orders, notifications, and payments efficiently.',
                  features: [
                    'Receive The Order',
                    'Handles The Notification Of New Orders',
                    'Manages The List Of Processing Orders',
                    'Handles The Cancelled Orders',
                    'List Of Complete Order And Payment Confirmation',
                  ],
                },
                {
                  icon: <Menu className="h-8 w-8" />,
                  title: 'Kitchen App',
                  description: 'Helps kitchen staff accept orders, update statuses, and manage delivery times.',
                  features: [
                    'Accept The Order From The Admin Or Waiter',
                    'Update The Food Status',
                    'Handle The Notification Of The Food Status',
                    'Delivery Time',
                  ],
                },
              ].map((app, index) => (
                <AppCard key={index} icon={app.icon} title={app.title} description={app.description} features={app.features} />
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-6">
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">Why Choose Unavu+?</h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Discover how Unavu+ can transform your restaurant business
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="bg-slate-50 p-10 rounded-3xl border border-slate-100">
                <div className="flex items-center gap-4 mb-8">
                  <div className="p-3 bg-cyan-100 text-cyan-700 rounded-xl">
                    <BarChart3 className="h-8 w-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900">For Restaurant Owners</h3>
                </div>
                <ul className="space-y-4">
                  {[
                    'Increase operational efficiency',
                    'Reduce food wastage',
                    'Real-time business insights',
                    'Manage multiple locations',
                    'Device Compatibility across all platforms',
                    'Personalized Design for branding',
                    'Budget-Friendly pricing for all restaurant sizes',
                    'Smooth Billing System for secure transactions',
                  ].map((benefit, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="h-6 w-6 text-cyan-500 flex-shrink-0" />
                      <span className="text-slate-700 font-medium">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-slate-50 p-10 rounded-3xl border border-slate-100">
                <div className="flex items-center gap-4 mb-8">
                  <div className="p-3 bg-blue-100 text-blue-700 rounded-xl">
                    <Users className="h-8 w-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900">For Your Customers</h3>
                </div>
                <ul className="space-y-4">
                  {[
                    'Easy online ordering',
                    'Table reservations',
                    'Loyalty rewards',
                    'Multiple payment options',
                    'In-Built Reward System for purchases',
                    'Coupon & Discount Engine for offers',
                    'User-Friendly interface',
                    '24/7 Support for assistance',
                  ].map((benefit, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="h-6 w-6 text-blue-500 flex-shrink-0" />
                      <span className="text-slate-700 font-medium">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Where Unavu+ Can Be Used Section */}
        <section className="py-24 bg-slate-50">
          <div className="container mx-auto px-6">
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">Versatile Applications</h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Unavu+ is versatile and can be used across various types of restaurants and kitchens
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              {[
                'Fine Dine Restaurant',
                'Quick Service Restaurant',
                'Canteen Management',
                'Food Court',
                'Juice Bar',
                'Café/Coffee Shop',
                'Catering Service',
                'Pizza Restaurant',
                'Franchise Management',
                'Bakery & Confectionaries',
                'Burger & Sandwich Shop',
                'Seafood Restaurant',
                'Cloud Kitchen',
                'Food Truck',
              ].map((place, index) => (
                <div key={index} className="bg-white px-6 py-3 rounded-full shadow-sm border border-slate-200 text-slate-700 font-medium hover:bg-cyan-50 hover:text-cyan-700 hover:border-cyan-200 transition-all cursor-default">
                  {place}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-slate-900 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-900/20 to-blue-900/20"></div>
          <div className="container mx-auto px-6 text-center relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
              Ready to Transform Your Restaurant?
            </h2>
            <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
              Start your 21-day free trial today and experience the power of Unavu+
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/contact"
                className="bg-cyan-500 hover:bg-cyan-400 text-white py-4 px-8 rounded-xl font-bold transition-all shadow-lg hover:shadow-cyan-500/25"
              >
                Start Free Trial
              </Link>
              <Link
                to="/contact"
                className="bg-transparent hover:bg-white/10 text-white border border-white/20 py-4 px-8 rounded-xl font-bold transition-all"
              >
                Contact Sales
              </Link>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default ProductsDetail;