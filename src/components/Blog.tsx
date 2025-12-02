import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User, ArrowRight, Tag } from 'lucide-react';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  image: string;
  category: string;
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "The Future of Mobile App Development in 2025",
    excerpt: "Explore the latest trends and technologies shaping the future of mobile application development, from 5G integration to AI-driven experiences.",
    date: "May 15, 2025",
    author: "TM Cyber Tech",
    image: "https://images.pexels.com/photos/3184454/pexels-photo-3184454.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    category: "Mobile Development"
  },
  {
    id: 2,
    title: "How AI is Transforming IT Infrastructure Management",
    excerpt: "Discover how artificial intelligence is revolutionizing the way businesses manage their IT infrastructure, predicting failures before they happen.",
    date: "April 28, 2025",
    author: "TM Cyber Tech",
    image: "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    category: "AI & Technology"
  },
  {
    id: 3,
    title: "Essential Cybersecurity Practices for Small Businesses",
    excerpt: "Learn the fundamental cybersecurity measures every small business should implement to protect their data and maintain customer trust.",
    date: "April 10, 2025",
    author: "TM Cyber Tech",
    image: "https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    category: "Cybersecurity"
  },
];

const Blog: React.FC = () => {
  return (
    <section id="blog" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <span className="text-cyan-600 font-medium tracking-wider uppercase text-sm">Insights & News</span>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mt-4 mb-6">
            Latest from Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600">Blog</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Stay updated with the latest technology trends, insights, and best practices.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {blogPosts.map((post) => (
            <div key={post.id} className="group bg-white rounded-3xl overflow-hidden shadow-lg border border-slate-100 hover:shadow-2xl transition-all duration-300 flex flex-col h-full">
              <div className="relative h-64 overflow-hidden">
                <div className="absolute inset-0 bg-slate-900/20 group-hover:bg-slate-900/10 transition-colors z-10"></div>
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4 z-20">
                  <span className="bg-white/90 backdrop-blur-sm text-cyan-700 text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wide flex items-center gap-1">
                    <Tag className="h-3 w-3" />
                    {post.category}
                  </span>
                </div>
              </div>

              <div className="p-8 flex flex-col flex-grow">
                <div className="flex items-center text-sm text-slate-500 mb-4 gap-4">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="h-4 w-4 text-cyan-500" />
                    <span>{post.date}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <User className="h-4 w-4 text-cyan-500" />
                    <span>{post.author}</span>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-cyan-600 transition-colors line-clamp-2">
                  <Link to="/blog">{post.title}</Link>
                </h3>

                <p className="text-slate-600 mb-6 line-clamp-3 flex-grow">
                  {post.excerpt}
                </p>

                <Link
                  to="/blog"
                  className="inline-flex items-center text-cyan-600 font-semibold group-hover:translate-x-1 transition-transform"
                >
                  Read Article <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link
            to="/blog"
            className="inline-flex items-center bg-slate-50 hover:bg-slate-100 text-slate-900 border border-slate-200 py-4 px-10 rounded-xl font-semibold transition-all"
          >
            View All Posts <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>

        <div className="mt-24 bg-slate-900 rounded-3xl p-10 md:p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/20 rounded-full blur-3xl -mr-32 -mt-32"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl -ml-32 -mb-32"></div>

          <div className="relative z-10">
            <div className="text-center mb-10">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">IT Knowledge Center</h3>
              <p className="text-slate-300 max-w-2xl mx-auto">
                Explore our curated collection of resources, guides, and tutorials designed to help you navigate the digital landscape.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: "Cloud Computing", desc: "Infrastructure & Migration" },
                { title: "Mobile Development", desc: "iOS & Android Best Practices" },
                { title: "Cybersecurity", desc: "Protection & Compliance" },
                { title: "Business Intelligence", desc: "Analytics & Reporting" }
              ].map((item, index) => (
                <Link key={index} to="/blog" className="block bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl p-6 transition-all hover:-translate-y-1 group">
                  <h4 className="font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">{item.title}</h4>
                  <p className="text-slate-400 text-sm">{item.desc}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Blog;