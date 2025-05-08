import React from 'react';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  image: string;
  category: string;
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "The Future of Mobile App Development in 2025",
    excerpt: "Explore the latest trends and technologies shaping the future of mobile application development.",
    content: "Mobile app development is evolving rapidly with the introduction of new technologies like AI, AR/VR, and 5G. In 2025, we expect to see a significant shift towards more personalized and immersive user experiences. Developers will leverage AI to create smarter apps that adapt to user behavior, while AR/VR will enable more interactive applications, especially in gaming and education. Additionally, 5G will allow for faster data transfer, enabling real-time features like live streaming and instant updates. At TM Cyber Tech, we’re at the forefront of these trends, helping businesses build cutting-edge mobile apps that meet the demands of the future.",
    date: "May 15, 2025",
    author: "TM Cyber Tech",
    image: "https://images.pexels.com/photos/3184454/pexels-photo-3184454.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    category: "Mobile Development",
  },
  {
    id: 2,
    title: "How AI is Transforming IT Infrastructure Management",
    excerpt: "Discover how artificial intelligence is revolutionizing the way businesses manage their IT infrastructure.",
    content: "Artificial Intelligence (AI) is transforming IT infrastructure management by automating routine tasks, predicting system failures, and optimizing resource allocation. With AI-driven tools, businesses can monitor their IT systems in real-time, identify potential issues before they occur, and automatically allocate resources to handle peak loads. For example, AI can predict server downtime and initiate preventive measures, reducing the risk of outages. At TM Cyber Tech, we integrate AI into our IT solutions to help businesses achieve higher efficiency, reduce costs, and improve system reliability.",
    date: "April 28, 2025",
    author: "TM Cyber Tech",
    image: "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    category: "AI & Technology",
  },
  {
    id: 3,
    title: "Essential Cybersecurity Practices for Small Businesses",
    excerpt: "Learn the fundamental cybersecurity measures every small business should implement to protect their data.",
    content: "Small businesses are increasingly becoming targets for cyberattacks due to their limited resources and often lax security measures. Essential cybersecurity practices include implementing strong passwords, using multi-factor authentication (MFA), regularly updating software, and training employees on phishing awareness. Additionally, small businesses should invest in firewalls, antivirus software, and regular data backups to protect against ransomware. At TM Cyber Tech, we offer tailored cybersecurity solutions for small businesses, helping them safeguard their data and maintain customer trust.",
    date: "April 10, 2025",
    author: "TM Cyber Tech",
    image: "https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    category: "Cybersecurity",
  },
];

const BlogDetail: React.FC = () => {
  return (
    <div className="font-sans">
      <Navbar />
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#094323] mb-4">Our Blog</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Stay updated with the latest technology trends, insights, and best practices from TM Cyber Tech.
            </p>
          </div>

          <div className="space-y-12">
            {blogPosts.map((post) => (
              <div key={post.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all">
                <div className="relative h-60">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4 bg-[#094323] text-white text-sm font-medium px-3 py-1 rounded-full">
                    {post.category}
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">{post.title}</h3>
                  <p className="text-gray-600 mb-4">{post.content}</p>
                  
                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <div className="flex items-center mr-4">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>{post.date}</span>
                    </div>
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-1" />
                      <span>{post.author}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
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

export default BlogDetail;