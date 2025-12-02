import React from 'react';
import { Calendar, User, ArrowRight, Clock, Tag } from 'lucide-react';
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
  readTime: string;
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
    readTime: "5 min read",
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
    readTime: "7 min read",
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
    readTime: "6 min read",
  },
];

const BlogDetail: React.FC = () => {
  return (
    <div className="font-sans bg-slate-50 min-h-screen">
      <Navbar />
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <span className="text-cyan-600 font-bold tracking-wider uppercase text-sm">Insights & Updates</span>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mt-4 mb-6">Our Blog</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Stay updated with the latest technology trends, insights, and best practices from TM Cyber Tech.
            </p>
          </div>

          <div className="max-w-5xl mx-auto space-y-16">
            {blogPosts.map((post) => (
              <article key={post.id} className="bg-white rounded-3xl overflow-hidden shadow-xl border border-slate-100 flex flex-col md:flex-row hover:shadow-2xl transition-all duration-300 group">
                <div className="md:w-2/5 relative overflow-hidden">
                  <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-colors z-10"></div>
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4 z-20">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-white/90 text-cyan-700 backdrop-blur-sm shadow-sm">
                      <Tag className="w-3 h-3 mr-1" />
                      {post.category}
                    </span>
                  </div>
                </div>

                <div className="p-8 md:p-10 md:w-3/5 flex flex-col justify-center">
                  <div className="flex items-center gap-4 text-sm text-slate-500 mb-4">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4 text-cyan-500" />
                      <span>{post.date}</span>
                    </div>
                    <div className="w-1 h-1 bg-slate-300 rounded-full"></div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4 text-cyan-500" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-cyan-700 transition-colors">
                    {post.title}
                  </h3>

                  <p className="text-slate-600 mb-6 leading-relaxed line-clamp-3">
                    {post.content}
                  </p>

                  <div className="flex items-center justify-between mt-auto pt-6 border-t border-slate-100">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
                        <User className="h-4 w-4" />
                      </div>
                      <span className="text-sm font-medium text-slate-700">{post.author}</span>
                    </div>
                    <button className="text-cyan-600 font-bold text-sm inline-flex items-center group-hover:translate-x-1 transition-transform">
                      Read More <ArrowRight className="ml-1 h-4 w-4" />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="text-center mt-20">
            <Link
              to="/"
              className="inline-flex items-center bg-slate-900 text-white hover:bg-slate-800 py-4 px-8 rounded-xl font-bold transition-all shadow-lg hover:shadow-slate-900/25"
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