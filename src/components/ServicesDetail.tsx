import React from 'react';
import { Smartphone, Monitor, Database, Cloud, Lock, Headphones, ArrowRight, Code, Layers, Edit, Globe, Brush, Server, FileText, Rocket } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const ServiceDetailCard: React.FC<{ icon: React.ReactNode; title: string; description: string; benefits: string[]; link: string; workProcess?: { title: string; description: string }[]; subsections?: { icon: React.ReactNode; title: string; description: string; image?: string }[] }> = ({ icon, title, description, benefits, link, workProcess, subsections }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all mb-12">
      <div className="bg-[#094323] inline-flex p-3 rounded-full text-white mb-4">
        {icon}
      </div>
      <h3 className="text-2xl font-semibold text-gray-800 mb-3">{title}</h3>
      <p className="text-gray-600 mb-6">{description}</p>

      {/* Benefits Section */}
      <h4 className="text-lg font-semibold text-gray-800 mb-3">Benefits</h4>
      <ul className="space-y-3 mb-8">
        {benefits.map((benefit, index) => (
          <li key={index} className="flex items-start">
            <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mr-3 mt-0.5">
              <span className="text-[#094323] font-bold">✓</span>
            </div>
            <span className="text-gray-600">{benefit}</span>
          </li>
        ))}
      </ul>

      {/* Work Process Section (if provided) */}
      {workProcess && (
        <>
          <h4 className="text-lg font-semibold text-gray-800 mb-4">Our Work Process</h4>
          <div className="relative mb-8">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-[#094323] opacity-20"></div>
            {workProcess.map((step, index) => (
              <div
                key={index}
                className={`flex items-center mb-8 relative ${
                  index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                }`}
              >
                <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-[#094323] rounded-full z-10 flex items-center justify-center">
                  <div className="w-3 h-3 bg-white rounded-full"></div>
                </div>
                <div className={`w-1/2 px-4 ${index % 2 === 0 ? 'text-right' : 'text-left'}`}>
                  <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                    <h5 className="text-md font-semibold text-gray-800 mb-1">{`0${index + 1}. ${step.title}`}</h5>
                    <p className="text-gray-600 text-sm">{step.description}</p>
                  </div>
                </div>
                <div className="w-1/2"></div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Subsections (if provided) */}
      {subsections && (
        <div className="space-y-8">
          {subsections.map((section, index) => (
            <div key={index} className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
              <div>
                <div className="bg-[#094323] inline-flex p-2 rounded-full text-white mb-3">
                  {section.icon}
                </div>
                <h5 className="text-lg font-semibold text-gray-800 mb-2">{section.title}</h5>
                <p className="text-gray-600">{section.description}</p>
              </div>
              {section.image && (
                <div className="relative h-48 lg:h-60">
                  <img 
                    src={section.image} 
                    alt={section.title} 
                    className="w-full h-full object-cover rounded-lg shadow-md"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      <div className="mt-8">
        <Link
          to={link}
          className="text-[#094323] font-medium inline-flex items-center hover:underline"
        >
          Contact Us for More Info <ArrowRight className="ml-1 h-4 w-4" />
        </Link>
      </div>
    </div>
  );
};

const ServicesDetail: React.FC = () => {
  return (
    <div className="font-sans">
      <Navbar />
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#094323] mb-4">Our Services</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover our wide range of IT services designed to help your business thrive in the digital era.
            </p>
          </div>

          <div className="space-y-12">
            {/* Mobile App Development */}
            <ServiceDetailCard
              icon={<Smartphone className="h-6 w-6" />}
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
                  description: "A prototype is built for defining the experience of the app from the user’s point of view. A detailed blueprint is created on the basis of how it works, how it flows. This wireframe gives a rough idea of the direction of the process.",
                },
                {
                  title: "Implementation",
                  description: "Once the aforementioned process gets completed, it’s the time for us to build the app. We design all the features to be included in the app to stay ahead of the competition. Also, we ensure database design gets synchronized with the backend servers.",
                },
                {
                  title: "Testing",
                  description: "User experience testing is performed to ensure that there aren’t issues in the app flow. Also, beta testing is performed by launching a trial version so that any flaws found by users in a real-world environment can be addressed.",
                },
                {
                  title: "Publish",
                  description: "This is where your app gets launched by submitting to the app store for approval. However, this is not the end of the process as there is always room for updates and adding new features based on user requirements.",
                },
              ]}
              subsections={[
                {
                  icon: <Code className="h-5 w-5" />,
                  title: "Customized Solutions",
                  description: "We believe in the power of tailored solutions. Our mobile app development process starts with a thorough analysis of your needs and objectives. We then design and develop a custom app that reflects your brand identity, meets your specific requirements, and delivers a seamless user experience.",
                  image: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                },
                {
                  icon: <Layers className="h-5 w-5" />,
                  title: "Native & Cross-Platform Development",
                  description: "Whether you need an app for iOS, Android, or both, we have you covered. Our expertise includes native app development, where we leverage the unique capabilities of each platform, as well as cross-platform development using frameworks like React Native or Flutter, which enable efficient code sharing and faster development cycles.",
                  image: "https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                },
                {
                  icon: <Edit className="h-5 w-5" />,
                  title: "User-Centric Design",
                  description: "We prioritize user experience in every aspect of our app development process. Our designers create intuitive interfaces, easy navigation, and visually appealing designs that engage users and keep them coming back. We focus on delivering a seamless and enjoyable experience that converts users into loyal customers.",
                  image: "https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                },
                {
                  icon: <Rocket className="h-5 w-5" />,
                  title: "Performance and Scalability",
                  description: "We understand the importance of performance and scalability in mobile apps. Our developers employ best practices and optimize code to ensure fast loading times, smooth performance, and efficient resource management. We build apps that can handle increasing user demands and scale as your business grows.",
                  image: "https://images.pexels.com/photos/3184325/pexels-photo-3184325.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                },
                {
                  icon: <Code className="h-5 w-5" />,
                  title: "Quality Assurance and Testing",
                  description: "We have a rigorous quality assurance process in place to ensure that our mobile apps meet the highest standards. We conduct thorough testing, including functional testing, usability testing, performance testing, and security testing, to identify and address any issues before the app reaches the hands of users.",
                  image: "https://images.pexels.com/photos/1181359/pexels-photo-1181359.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                },
                {
                  icon: <Headphones className="h-5 w-5" />,
                  title: "Ongoing Support and Maintenance",
                  description: "Our commitment to our clients doesn’t end with the launch of the app. We provide ongoing support and maintenance services to ensure that your app remains up-to-date, secure, and optimized for the ever-evolving mobile landscape. We are here to assist you with any updates, enhancements, or technical issues that may arise.",
                  image: "https://images.pexels.com/photos/3184296/pexels-photo-3184296.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                },
              ]}
              link="/contact"
            />

            {/* Web Development */}
            <ServiceDetailCard
              icon={<Monitor className="h-6 w-6" />}
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
                  icon: <Brush className="h-5 w-5" />,
                  title: "Development from the Front End",
                  description: "Our front-end developers are experts at turning concepts into dynamic, eye-catching websites. For optimal efficiency and a flawless user research interface, we employ the newest technologies and industry best practices.",
                  image: "https://images.pexels.com/photos/1181271/pexels-photo-1181271.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                },
                {
                  icon: <Server className="h-5 w-5" />,
                  title: "Development on the Back End",
                  description: "The back-end infrastructure of a web application is its core. Strong, scalable back-end systems that manage intricate features and foster the expansion of your company are built by our talented engineers.",
                  image: "https://images.pexels.com/photos/1181352/pexels-photo-1181352.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                },
                {
                  icon: <FileText className="h-5 w-5" />,
                  title: "Content Management Systems (CMS)",
                  description: "You can easily maintain and update your website with our feature-rich and intuitive content management systems (CMS).",
                  image: "https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                },
                {
                  icon: <Globe className="h-5 w-5" />,
                  title: "Development of Web Applications",
                  description: "We provide web app ideas that improve user testing experiences and optimize your business operations, ranging from CRM systems to bespoke web-based solutions.",
                  image: "https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                },
              ]}
              link="/contact"
            />

            {/* Database Management */}
            <ServiceDetailCard
              icon={<Database className="h-6 w-6" />}
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
              icon={<Cloud className="h-6 w-6" />}
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
              icon={<Lock className="h-6 w-6" />}
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
              icon={<Headphones className="h-6 w-6" />}
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

          <div className="text-center mt-12">
            <Link
              to="/"
              className="bg-[#094323] hover:bg-[#0d5c31] text-white py-3 px-8 rounded-md font-medium transition-all inline-flex items-center mr-4"
            >
              Back to Home
            </Link>
            <Link
              to="/contact"
              className="bg-white hover:bg-gray-100 text-[#094323] border-2 border-[#094323] py-3 px-8 rounded-md font-medium transition-all inline-flex items-center"
            >
              Get Started – Take the First Step
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default ServicesDetail;