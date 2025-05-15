import React from 'react';
import { ArrowRight, Utensils, Monitor, Database, Cloud, Lock, Headphones, Smartphone, ShoppingCart, MapPin, Users, Menu, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const FeatureCard: React.FC<{ icon: React.ReactNode; title: string; description: string }> = ({ icon, title, description }) => (
  <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all">
    <div className="bg-[#094323] inline-flex p-3 rounded-full text-white mb-4">
      {icon}
    </div>
    <h3 className="text-xl font-semibold text-gray-800 mb-3">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

const ModuleCard: React.FC<{ icon: React.ReactNode; title: string; description: string; subModules: string[] }> = ({ icon, title, description, subModules }) => (
  <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-all">
    <div className="bg-[#094323] inline-flex p-3 rounded-full text-white mb-4">
      {icon}
    </div>
    <h3 className="text-2xl font-semibold text-gray-800 mb-4">{title}</h3>
    <p className="text-gray-600 mb-4">{description}</p>
    <ul className="list-disc list-inside text-gray-600">
      {subModules.map((sub, index) => (
        <li key={index}>{sub}</li>
      ))}
    </ul>
    <div className="mt-4">
      <p className="text-sm italic">[Image Placeholder: A screenshot of the Unavu+ {title} showing relevant features]</p>
    </div>
  </div>
);

const AppCard: React.FC<{ icon: React.ReactNode; title: string; description: string; features: string[] }> = ({ icon, title, description, features }) => (
  <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all text-center">
    <div className="bg-[#094323] inline-flex p-3 rounded-full text-white mb-4">
      {icon}
    </div>
    <h3 className="text-xl font-semibold text-gray-800 mb-3">{title}</h3>
    <p className="text-gray-600 mb-4">{description}</p>
    <ul className="space-y-2 text-gray-600">
      {features.map((feature, index) => (
        <li key={index} className="flex items-start justify-center">
          <div className="flex-shrink-0 h-5 w-5 rounded-full bg-green-100 flex items-center justify-center mr-2">
            <span className="text-[#094323] font-bold">✓</span>
          </div>
          <span>{feature}</span>
        </li>
      ))}
    </ul>
    <div className="mt-4">
      <p className="text-sm italic">[Image Placeholder: A screenshot of the Unavu+ {title} interface]</p>
    </div>
  </div>
);

const ProductsDetail: React.FC = () => {
  return (
    <div className="font-sans">
      <Navbar />
      <div className="pt-20 bg-gray-50">
        {/* Hero Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-[#094323] mb-6">
                  Unavu+ Restaurant Management System
                </h1>
                <p className="text-xl text-gray-600 mb-8">
                  Transform your restaurant operations with Unavu+, a comprehensive cloud-based solution by TMCyberTech. Streamline orders, manage inventory, and boost revenue with advanced features designed for modern restaurants.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link
                    to="/contact"
                    className="bg-[#094323] hover:bg-[#0d5c31] text-white py-3 px-8 rounded-md font-medium transition-all flex items-center"
                  >
                    Start Free Trial <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                  <Link
                    to="/contact"
                    className="bg-white hover:bg-gray-100 text-[#094323] border-2 border-[#094323] py-3 px-8 rounded-md font-medium transition-all"
                  >
                    Schedule Demo
                  </Link>
                </div>
              </div>
              <div className="relative">
                <img
                  src="https://images.pexels.com/photos/2253643/pexels-photo-2253643.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt="Unavu+ Dashboard"
                  className="rounded-lg shadow-xl w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Introduction Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-[#094323] mb-4">What is Unavu+?</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Unavu+ by TMCyberTech is an advanced online food ordering and restaurant management system designed to automate and optimize restaurant operations. It allows restaurants to manage POS billing, inventory, staff, online orders, and more, breaking barriers to reach an unlimited pool of customers.
              </p>
            </div>
            <div className="flex justify-center">
              <Link
                to="/contact"
                className="bg-[#094323] hover:bg-[#0d5c31] text-white py-3 px-8 rounded-md font-medium transition-all flex items-center"
              >
                Explore Unavu+ Features <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </section>

        {/* Core Features Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-[#094323] mb-4">Core Features of Unavu+</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Everything you need to manage your restaurant efficiently
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { icon: <Monitor className="h-6 w-6" />, title: 'Cloud-based POS', description: 'Fast and reliable point-of-sale system accessible from anywhere, anytime.' },
                { icon: <Database className="h-6 w-6" />, title: 'Inventory Management', description: 'Track ingredients, manage stock levels, and reduce waste effectively.' },
                { icon: <Cloud className="h-6 w-6" />, title: 'Online Ordering', description: 'Accept orders through your website and mobile app seamlessly.' },
                { icon: <Lock className="h-6 w-6" />, title: 'Kitchen Management', description: 'Streamline kitchen operations with digital order tracking and management.' },
                { icon: <Smartphone className="h-6 w-6" />, title: 'Mobile Apps', description: 'Dedicated apps for customers, kitchen staff, and waiters.' },
                { icon: <Headphones className="h-6 w-6" />, title: '24/7 Support', description: 'Round-the-clock technical support and assistance whenever you need it.' },
                { icon: <ShoppingCart className="h-6 w-6" />, title: 'QR Code Ordering', description: 'Enable contactless ordering with QR code scanning.' },
                { icon: <MapPin className="h-6 w-6" />, title: 'Location Tracking', description: 'Track delivery locations for seamless third-party integration.' },
              ].map((feature, index) => (
                <FeatureCard key={index} icon={feature.icon} title={feature.title} description={feature.description} />
              ))}
            </div>
            <div className="mt-12 text-center">
              <p className="text-sm italic">[Image Placeholder: A collage of Unavu+ features like QR scanning, mobile app interface, and POS system]</p>
            </div>
          </div>
        </section>

        {/* Detailed Features Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-[#094323] mb-4">Remarkable Features of Unavu+</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
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
                <FeatureCard key={index} icon={<Utensils className="h-6 w-6" />} title={feature.title} description={feature.description} />
              ))}
            </div>
            <div className="mt-12 text-center">
              <p className="text-sm italic">[Image Placeholder: A graphic showcasing Unavu+ features like social media integration and chatbot]</p>
            </div>
          </div>
        </section>

        {/* Fundamental Modules Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-[#094323] mb-4">Fundamental Modules of Unavu+</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Explore the essential modules that transform your restaurant operations
              </p>
            </div>
            <div className="space-y-12">
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
                  title: 'POS Billing Automation System',
                  description: 'Streamlines billing with integration to menu management, order management, and delivery systems, supporting multiple payment methods.',
                  subModules: ['POS Billing', 'Cash On Delivery', 'Card Payment', 'Razor Pay', 'Paypal'],
                },
                {
                  icon: <Cloud className="h-6 w-6" />,
                  title: 'Online Order Management System',
                  description: 'Manages all incoming orders chronologically, handling new, pending, pre-orders, cancellations, and completed orders.',
                  subModules: ['New Order', 'Pending Order', 'Pre-Order', 'Cancel Order', 'Order List', 'Complete Order'],
                },
                {
                  icon: <Users className="h-6 w-6" />,
                  title: 'Customer Management System (CRM)',
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
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-[#094323] mb-4">Unavu+ Apps for Every Role</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Dedicated apps to streamline operations for customers, waiters, and kitchen staff
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: <Users className="h-6 w-6" />,
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
                  icon: <Smartphone className="h-6 w-6" />,
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
                  icon: <Menu className="h-6 w-6" />,
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
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-[#094323] mb-4">Why Choose Unavu+?</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Discover how Unavu+ can transform your restaurant business
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-gray-50 p-8 rounded-lg">
                <h3 className="text-2xl font-semibold text-gray-800 mb-6">For Restaurant Owners</h3>
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
                    <li key={index} className="flex items-start">
                      <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mr-3 mt-0.5">
                        <span className="text-[#094323] font-bold">✓</span>
                      </div>
                      <span className="text-gray-600">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-gray-50 p-8 rounded-lg">
                <h3 className="text-2xl font-semibold text-gray-800 mb-6">For Your Customers</h3>
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
                    <li key={index} className="flex items-start">
                      <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mr-3 mt-0.5">
                        <span className="text-[#094323] font-bold">✓</span>
                      </div>
                      <span className="text-gray-600">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="mt-12 text-center">
              <p className="text-sm italic">[Image Placeholder: A graphic showcasing Unavu+ benefits like rewards, discounts, and device compatibility]</p>
            </div>
          </div>
        </section>

        {/* Where Unavu+ Can Be Used Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-[#094323] mb-4">Where Can Unavu+ Be Used?</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Unavu+ is versatile and can be used across various types of restaurants and kitchens
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
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
                <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all text-center">
                  <p className="text-gray-600">{place}</p>
                </div>
              ))}
            </div>
            <div className="mt-12 text-center">
              <p className="text-sm italic">[Image Placeholder: A collage of different restaurant types using Unavu+]</p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-[#094323]">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Transform Your Restaurant with Unavu+?
            </h2>
            <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
              Start your 21-day free trial today and experience the power of Unavu+
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/contact"
                className="bg-white hover:bg-gray-100 text-[#094323] py-3 px-8 rounded-md font-medium transition-all"
              >
                Start Free Trial
              </Link>
              <Link
                to="/contact"
                className="bg-transparent hover:bg-[#0d5c31] text-white border-2 border-white py-3 px-8 rounded-md font-medium transition-all"
              >
                Contact Sales
              </Link>
            </div>
            <div className="mt-8">
              <p className="text-sm italic">[Image Placeholder: A promotional graphic for the 21-day free trial of Unavu+]</p>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default ProductsDetail;