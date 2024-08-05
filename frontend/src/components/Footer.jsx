import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-4 sm:py-6 md:py-8">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <h3 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6">Why Shop With Us</h3>
          <div className="flex flex-wrap gap-4 sm:gap-6 md:gap-8 justify-center lg:grid lg:grid-cols-3 lg:gap-8">
            <div className="bg-gray-800 p-4 sm:p-6 rounded-lg shadow-lg transition-transform duration-300 hover:scale-105 w-full sm:w-1/2 lg:w-auto">
              <div className="flex items-center mb-3 sm:mb-4">
                <i className="fas fa-user-cog text-xl sm:text-2xl mr-2 sm:mr-3 text-indigo-400"></i>
                <h5 className="text-sm sm:text-lg font-semibold">Personalized for You</h5>
              </div>
              <p className="text-xs sm:text-sm text-gray-300">Experience tailored recommendations and a shopping experience just for you.</p>
            </div>
            <div className="bg-gray-800 p-4 sm:p-6 rounded-lg shadow-lg transition-transform duration-300 hover:scale-105 w-full sm:w-1/2 lg:w-auto">
              <div className="flex items-center mb-3 sm:mb-4">
                <i className="fas fa-truck text-xl sm:text-2xl mr-2 sm:mr-3 text-green-400"></i>
                <h5 className="text-sm sm:text-lg font-semibold">Fast Reliable Deliveries</h5>
              </div>
              <p className="text-xs sm:text-sm text-gray-300">Enjoy swift and dependable delivery services right to your doorstep.</p>
            </div>
            <div className="bg-gray-800 p-4 sm:p-6 rounded-lg shadow-lg transition-transform duration-300 hover:scale-105 w-full sm:w-1/2 lg:w-auto">
              <div className="flex items-center mb-3 sm:mb-4">
                <i className="fas fa-check-circle text-xl sm:text-2xl mr-2 sm:mr-3 text-blue-400"></i>
                <h5 className="text-sm sm:text-lg font-semibold">Guaranteed Product Quality</h5>
              </div>
              <p className="text-xs sm:text-sm text-gray-300">We ensure top-notch quality for all the products we offer.</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
