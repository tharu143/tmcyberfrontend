import React from 'react';
import { Smartphone, Monitor, Database, Cloud, Lock, Headphones, ArrowRight, Code, Layers, Edit, Globe, Brush, Server, FileText, Rocket, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const ServiceDetailCard: React.FC<{ icon: React.ReactNode; title: string; description: string; benefits: string[]; link: string; workProcess?: { title: string; description: string }[]; subsections?: { icon: React.ReactNode; title: string; description: string; image?: string }[] }> = ({ icon, title, description, benefits, link, workProcess, subsections }) => {
  return (
    <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden mb-16">
      <div className="p-8 md:p-12">
        <div className="flex items-center gap-6 mb-8">
          <div className="w-16 h-16 bg-cyan-50 rounded-2xl flex items-center justify-center text-cyan-600">
            {icon}
          </div>
          <h3 className="text-3xl font-bold text-slate-900">{title}</h3>
        </div>

        <p className="text-xl text-slate-600 mb-10 leading-relaxed">{description}</p>

        {/* Benefits Section */}
        <div className="bg-slate-50 rounded-2xl p-8 mb-12">
          <h4 className="text-lg font-bold text-slate-900 mb-6 uppercase tracking-wider">Key Benefits</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-start gap-3">
                <CheckCircle2 className="h-6 w-6 text-cyan-500 flex-shrink-0" />
                <span className="text-slate-700 font-medium">{benefit}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Work Process Section (if provided) */}
        {workProcess && (
          <div className="mb-12">
            <h4 className="text-2xl font-bold text-slate-900 mb-8">Our Process</h4>
            <div className="relative">
              <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 h-full w-0.5 bg-slate-200"></div>
              {workProcess.map((step, index) => (
                <div
                  key={index}
                  className={`flex flex-col md:flex-row items-start md:items-center mb-12 relative pl-12 md:pl-0 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                    }`}
                >
                  <div className="absolute left-4 md:left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white border-4 border-cyan-500 rounded-full z-10"></div>

                  <div className={`w-full md:w-1/2 md:px-12 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                      <span className="text-cyan-600 font-bold text-sm uppercase tracking-wider mb-2 block">Step 0{index + 1}</span>
                      <h5 className="text-xl font-bold text-slate-900 mb-3">{step.title}</h5>
                      <p className="text-slate-600">{step.description}</p>
                    </div>
                  </div>
                  <div className="hidden md:block w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Subsections (if provided) */}
        {subsections && (
          <div className="space-y-12">
            {subsections.map((section, index) => (
              <div key={index} className={`flex flex-col lg:flex-row gap-8 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                <div className="flex-1">
                  <div className="inline-flex p-3 rounded-xl bg-cyan-50 text-cyan-600 mb-4">
                    {section.icon}
                  </div>
                  <h5 className="text-2xl font-bold text-slate-900 mb-4">{section.title}</h5>
                  <p className="text-slate-600 leading-relaxed text-lg">{section.description}</p>
                </div>
                {section.image && (
                  <div className="flex-1 w-full">
                    <div className="relative rounded-2xl overflow-hidden shadow-lg group">
                      <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-colors z-10"></div>
                      <img
                        src={section.image}
                        alt={section.title}
                        className="w-full h-64 lg:h-80 object-cover transform group-hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        <div className="mt-12 pt-8 border-t border-slate-100 flex justify-end">
          <Link
            to={link}
            className="inline-flex items-center gap-2 text-cyan-600 font-bold hover:text-cyan-700 transition-colors text-lg group"
          >
            Start Your Project <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
};

const ServicesDetail: React.FC = () => {
  return (
    <div className="font-sans bg-slate-50 min-h-screen">
      <Navbar />
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <span className="text-cyan-600 font-medium tracking-wider uppercase text-sm">Comprehensive Solutions</span>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mt-4 mb-6">
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600">Services</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Discover our wide range of IT services designed to help your business thrive in the digital era.
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            {/* Mobile App Development */}
            <ServiceDetailCard
              icon={<Smartphone className="h-8 w-8" />}
              title="Mobile App Development"
              description="Custom iOS & Android mobile applications designed to meet your specific business requirements and user needs."
              benefits={[
                "Cross-platform compatibility",
                "User-friendly interfaces",
                "Scalable and secure apps",
                "Integration with existing systems",
              ]}
              workProcess={[
                {
                  title: "Wireframe",
                  description: "A prototype is built for defining the experience of the app from the user’s point of view. A detailed blueprint is created on the basis of how it works, how it flows.",
                },
                {
                  title: "Implementation",
                  description: "Once the aforementioned process gets completed, it’s the time for us to build the app. We design all the features to be included in the app to stay ahead of the competition.",
                },
                {
                  title: "Testing",
                  description: "User experience testing is performed to ensure that there aren’t issues in the app flow. Also, beta testing is performed by launching a trial version.",
                },
                {
                  title: "Publish",
                  description: "This is where your app gets launched by submitting to the app store for approval. However, this is not the end of the process as there is always room for updates.",
                },
              ]}
              subsections={[
                {
                  icon: <Code className="h-6 w-6" />,
                  title: "Customized Solutions",
                  description: "We believe in the power of tailored solutions. Our mobile app development process starts with a thorough analysis of your needs and objectives. We then design and develop a custom app that reflects your brand identity.",
                  image: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                },
                {
                  icon: <Layers className="h-6 w-6" />,
                  title: "Native & Cross-Platform",
                  description: "Whether you need an app for iOS, Android, or both, we have you covered. Our expertise includes native app development as well as cross-platform development using frameworks like React Native or Flutter.",
                  image: "https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                },
                {
                  icon: <Edit className="h-6 w-6" />,
                  title: "User-Centric Design",
                  description: "We prioritize user experience in every aspect of our app development process. Our designers create intuitive interfaces, easy navigation, and visually appealing designs that engage users.",
                  image: "https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                },
                {
                  icon: <Rocket className="h-6 w-6" />,
                  title: "Performance & Scalability",
                  description: "We understand the importance of performance and scalability. Our developers employ best practices and optimize code to ensure fast loading times and smooth performance.",
                  image: "https://images.pexels.com/photos/3184325/pexels-photo-3184325.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                },
              ]}
              link="/contact"
            />

            {/* Web Development */}
            <ServiceDetailCard
              icon={<Monitor className="h-8 w-8" />}
              title="Web Development"
              description="Responsive and user-friendly websites optimized for performance and conversion to help your business stand out."
              benefits={[
                "SEO-optimized websites",
                "Responsive design for all devices",
                "Fast loading times",
                "Customizable features",
              ]}
              subsections={[
                {
                  icon: <Brush className="h-6 w-6" />,
                  title: "Front-End Development",
                  description: "Our front-end developers are experts at turning concepts into dynamic, eye-catching websites. For optimal efficiency and a flawless user research interface, we employ the newest technologies.",
                  image: "https://images.pexels.com/photos/1181271/pexels-photo-1181271.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                },
                {
                  icon: <Server className="h-6 w-6" />,
                  title: "Back-End Development",
                  description: "The back-end infrastructure of a web application is its core. Strong, scalable back-end systems that manage intricate features and foster the expansion of your company are built by our talented engineers.",
                  image: "https://images.pexels.com/photos/1181352/pexels-photo-1181352.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                },
                {
                  icon: <FileText className="h-6 w-6" />,
                  title: "CMS Solutions",
                  description: "You can easily maintain and update your website with our feature-rich and intuitive content management systems (CMS). We specialize in WordPress, Strapi, and custom CMS solutions.",
                  image: "https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                },
                {
                  icon: <Globe className="h-6 w-6" />,
                  title: "Web Applications",
                  description: "We provide web app ideas that improve user testing experiences and optimize your business operations, ranging from CRM systems to bespoke web-based solutions.",
                  image: "https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                },
              ]}
              link="/contact"
            />

            {/* Database Management */}
            <ServiceDetailCard
              icon={<Database className="h-8 w-8" />}
              title="Database Management"
              description="Efficient database design, implementation, and management to ensure your data is secure and accessible."
              benefits={[
                "Optimized data storage",
                "Enhanced data security",
                "Real-time data access",
                "Scalable database solutions",
              ]}
              link="/contact"
            />

            {/* Cloud Solutions */}
            <ServiceDetailCard
              icon={<Cloud className="h-8 w-8" />}
              title="Cloud Solutions"
              description="Secure and scalable cloud infrastructure to optimize your operations and reduce costs."
              benefits={[
                "Cost-effective infrastructure",
                "High availability and uptime",
                "Data backup and recovery",
                "Seamless scalability",
              ]}
              link="/contact"
            />

            {/* Cyber Security */}
            <ServiceDetailCard
              icon={<Lock className="h-8 w-8" />}
              title="Cyber Security"
              description="Comprehensive security solutions to protect your business from emerging threats and vulnerabilities."
              benefits={[
                "Proactive threat detection",
                "Data encryption",
                "Regular security audits",
                "24/7 monitoring",
              ]}
              link="/contact"
            />

            {/* IT Support */}
            <ServiceDetailCard
              icon={<Headphones className="h-8 w-8" />}
              title="IT Support"
              description="24/7 technical support and maintenance to keep your systems running smoothly and efficiently."
              benefits={[
                "Round-the-clock support",
                "Quick issue resolution",
                "System maintenance",
                "Technical consultation",
              ]}
              link="/contact"
            />
          </div>

          <div className="text-center mt-20">
            <Link
              to="/"
              className="inline-flex items-center bg-white text-slate-900 border border-slate-200 hover:bg-slate-50 py-4 px-8 rounded-xl font-bold transition-all mr-4"
            >
              Back to Home
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center bg-slate-900 text-white hover:bg-slate-800 py-4 px-8 rounded-xl font-bold transition-all shadow-lg hover:shadow-slate-900/25"
            >
              Get Started Now <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default ServicesDetail;