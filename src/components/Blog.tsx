import React from 'react';
import { Calendar, User, ArrowRight } from 'lucide-react';

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
    excerpt: "Explore the latest trends and technologies shaping the future of mobile application development.",
    date: "May 15, 2025",
    author: "TM Cyber Tech",
    image: "https://images.pexels.com/photos/3184454/pexels-photo-3184454.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    category: "Mobile Development"
  },
  {
    id: 2,
    title: "How AI is Transforming IT Infrastructure Management",
    excerpt: "Discover how artificial intelligence is revolutionizing the way businesses manage their IT infrastructure.",
    date: "April 28, 2025",
    author: "TM Cyber Tech",
    image: "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    category: "AI & Technology"
  },
  {
    id: 3,
    title: "Essential Cybersecurity Practices for Small Businesses",
    excerpt: "Learn the fundamental cybersecurity measures every small business should implement to protect their data.",
    date: "April 10, 2025",
    author: "TM Cyber Tech",
    image: "https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    category: "Cybersecurity"
  },
];

const Blog: React.FC = () => {
  return (
    <section id="blog" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#094323] mb-4">Latest from Our Blog</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Stay updated with the latest technology trends, insights, and best practices
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                <h3 className="text-xl font-semibold text-gray-800 mb-3 hover:text-[#094323] transition-colors">
                  <a href="#blog">{post.title}</a>
                </h3>
                
                <p className="text-gray-600 mb-4">
                  {post.excerpt}
                </p>
                
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
                
                <a 
                  href="#blog" 
                  className="text-[#094323] font-medium inline-flex items-center hover:underline"
                >
                  Read more <ArrowRight className="ml-1 h-4 w-4" />
                </a>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <a 
            href="#blog" 
            className="inline-flex items-center bg-white hover:bg-gray-100 text-[#094323] border-2 border-[#094323] py-3 px-8 rounded-md font-medium transition-all"
          >
            View All Posts <ArrowRight className="ml-2 h-5 w-5" />
          </a>
        </div>
        
        <div className="mt-20 bg-white p-8 rounded-lg shadow-md">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-semibold text-[#094323] mb-2">IT Knowledge Center</h3>
            <p className="text-gray-600">
              Explore our collection of IT resources, guides, and tutorials
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <a href="#blog" className="block p-4 border border-gray-200 rounded-lg hover:border-[#094323] hover:shadow-md transition-all">
              <h4 className="font-semibold text-gray-800 mb-2">Cloud Computing</h4>
              <p className="text-gray-600 text-sm">Learn about cloud infrastructure, migration, and management</p>
            </a>
            
            <a href="#blog" className="block p-4 border border-gray-200 rounded-lg hover:border-[#094323] hover:shadow-md transition-all">
              <h4 className="font-semibold text-gray-800 mb-2">Mobile Development</h4>
              <p className="text-gray-600 text-sm">Resources for iOS and Android app development</p>
            </a>
            
            <a href="#blog" className="block p-4 border border-gray-200 rounded-lg hover:border-[#094323] hover:shadow-md transition-all">
              <h4 className="font-semibold text-gray-800 mb-2">Cybersecurity</h4>
              <p className="text-gray-600 text-sm">Best practices and guides for securing your business</p>
            </a>
            
            <a href="#blog" className="block p-4 border border-gray-200 rounded-lg hover:border-[#094323] hover:shadow-md transition-all">
              <h4 className="font-semibold text-gray-800 mb-2">Business Intelligence</h4>
              <p className="text-gray-600 text-sm">Data analytics and reporting for informed decision making</p>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Blog;