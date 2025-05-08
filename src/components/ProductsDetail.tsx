import React from 'react';
import { ArrowRight, Utensils, ShoppingBag, Building, Briefcase, Smartphone, Coffee, Cake, Warehouse } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const ProductDetailCard: React.FC<{ icon: React.ReactNode; title: string; description: string; features: string[]; link: string; image: string }> = ({ icon, title, description, features, link, image }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all mb-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center mb-6">
        <div>
          <div className="bg-[#094323] inline-flex p-3 rounded-full text-white mb-4">
            {icon}
          </div>
          <h3 className="text-2xl font-semibold text-gray-800 mb-3">{title}</h3>
          <p className="text-gray-600 mb-4">{description}</p>
          <ul className="space-y-3 mb-6">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mr-3 mt-0.5">
                  <span className="text-[#094323] font-bold">✓</span>
                </div>
                <span className="text-gray-600">{feature}</span>
              </li>
            ))}
          </ul>
          <Link
            to={link}
            className="text-[#094323] font-medium inline-flex items-center hover:underline"
          >
            Request a Demo <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
        <div className="relative h-60 lg:h-80">
          <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover rounded-lg shadow-md"
          />
        </div>
      </div>
    </div>
  );
};

const ProductsDetail: React.FC = () => {
  return (
    <div className="font-sans">
      <Navbar />
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#094323] mb-4">Our Products</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore our innovative software solutions designed to streamline operations and enhance productivity across various industries.
            </p>
          </div>

          <div className="space-y-12">
            <ProductDetailCard
              icon={<Utensils className="h-6 w-6" />}
              title="Unavu+ Restaurant Application"
              description="A comprehensive restaurant management system designed to streamline operations, enhance customer experience, and boost revenue."
              features={[
                "Order management and processing",
                "Inventory tracking and management",
                "Customer loyalty programs",
                "Analytics and reporting dashboard",
              ]}
              link="/contact"
              image="https://images.pexels.com/photos/2253643/pexels-photo-2253643.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            />

            <ProductDetailCard
              icon={<ShoppingBag className="h-6 w-6" />}
              title="Retail Management"
              description="Comprehensive solution for inventory management, POS, and customer relationship management in retail businesses."
              features={[
                "Point of Sale (POS) system",
                "Inventory tracking",
                "Customer relationship management",
                "Sales analytics",
              ]}
              link="/contact"
              image="https://images.pexels.com/photos/264636/pexels-photo-264636.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            />

            <ProductDetailCard
              icon={<Building className="h-6 w-6" />}
              title="Real Estate Suite"
              description="Property management, tenant portal, and maintenance tracking system for real estate businesses."
              features={[
                "Property listing and management",
                "Tenant portal for payments and requests",
                "Maintenance scheduling",
                "Financial reporting",
              ]}
              link="/contact"
              image="https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            />

            <ProductDetailCard
              icon={<Briefcase className="h-6 w-6" />}
              title="Business Intelligence"
              description="Data analytics and reporting tools to help businesses make informed decisions."
              features={[
                "Real-time data analytics",
                "Customizable dashboards",
                "Predictive insights", // Added comma here to fix the syntax error
                "Integration with existing systems",
              ]}
              link="/contact"
              image="https://images.pexels.com/photos/669615/pexels-photo-669615.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            />

            <ProductDetailCard
              icon={<Smartphone className="h-6 w-6" />}
              title="Mobile Shop Retail Management"
              description="Mobile app for managing inventory, sales, and billing in mobile shops."
              features={[
                "Inventory management for mobile devices",
                "Sales and billing system",
                "Customer purchase history",
                "Daily sales reports",
              ]}
              link="/contact"
              image="https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            />

            <ProductDetailCard
              icon={<Coffee className="h-6 w-6" />}
              title="Tea Shop Billing"
              description="Mobile app for efficient billing and order management in tea shops."
              features={[
                "Quick billing for tea orders",
                "Order tracking",
                "Daily sales summary",
                "Customer order history",
              ]}
              link="/contact"
              image="https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            />

            <ProductDetailCard
              icon={<Cake className="h-6 w-6" />}
              title="Bakery Billing Software"
              description="Mobile app for billing, inventory tracking, and sales in bakeries."
              features={[
                "Product-wise billing",
                "Inventory for bakery items",
                "Sales analytics",
                "Order customization",
              ]}
              link="/contact"
              image="https://images.pexels.com/photos/205961/pexels-photo-205961.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            />

            <ProductDetailCard
              icon={<Warehouse className="h-6 w-6" />}
              title="Wholesale Stock Management"
              description="Mobile app for stock entry, returns, and sales reporting for wholesalers."
              features={[
                "Stock entry and tracking",
                "Returns management",
                "Sales reporting",
                "Supplier management",
              ]}
              link="/contact"
              image="https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            />
          </div>

          <div className="text-center mt-12">
            <Link
              to="/"
              className="bg-[#094323] hover:bg-[#0d5c31] text-white py-3 px-8 rounded-md font-medium transition-all inline-flex items-center"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default ProductsDetail;