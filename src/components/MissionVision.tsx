import React from 'react';

const MissionVision: React.FC = () => {
  return (
    <section id="mission-vision" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#094323] mb-4">Mission & Vision</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover our purpose and aspirations as we strive to innovate and empower through mobile app solutions.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Chessboard Image */}
          <div className="relative h-80 lg:h-96">
            <img
              src="https://images.pexels.com/photos/1048248/pexels-photo-1048248.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt="Chessboard with Queen Attacking"
              className="w-full h-full object-cover rounded-lg shadow-md"
            />
            <div className="absolute inset-0 bg-[#094323] opacity-10 rounded-lg"></div>
          </div>

          {/* Mission & Vision Content */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-3">Mission</h3>
              <p className="text-gray-600">
                Our mission is to empower businesses and individuals with innovative and impactful mobile app solutions that drive growth, enhance user experiences, and transform industries.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-3">Vision</h3>
              <p className="text-gray-600">
                Our vision is to be a leading provider of innovative and cutting-edge mobile app solutions that empower businesses and individuals to thrive in the digital world. We envision a future where mobile apps revolutionize industries, enhance user experiences, and connect people in ways never thought possible. Our goal is to harness the power of technology and creativity to create impactful mobile applications that make a difference.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionVision;