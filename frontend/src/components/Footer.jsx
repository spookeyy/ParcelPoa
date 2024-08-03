import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-4 sm:py-6 md:py-8">
    <footer className="bg-gray-900 text-white py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left mb-4">
          <nav className="mb-4 md:mb-0">
            <ul className="flex flex-col md:flex-row md:space-x-4 space-y-2 md:space-y-0">
              <li><a href="/about" className="hover:text-gray-400 transition duration-300 text-sm">About Us</a></li>
              <li><a href="/contact" className="hover:text-gray-400 transition duration-300 text-sm">Contact Us</a></li>
              <li><a href="/privacy-policy" className="hover:text-gray-400 transition duration-300 text-sm">Privacy Policy</a></li>
              <li><a href="/terms-of-service" className="hover:text-gray-400 transition duration-300 text-sm">Terms of Service</a></li>
              <li><a href="/returns" className="hover:text-gray-400 transition duration-300 text-sm">Returns</a></li>
            </ul>
          </nav>
          <div className="text-center md:text-right">
            <p className="text-xs mb-1">Customer Support: <a href="mailto:support@parcelpoa.com" className="hover:text-gray-400 transition duration-300">support@parcelpoa.com</a></p>
            <p className="text-xs">Call us: <a href="tel:+18001234567" className="hover:text-gray-400 transition duration-300">+1 (800) 123-4567</a></p>
          </div>
        </div>

        <div className="text-center">
          <h3 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6">Why Shop With Us</h3>
          <div className="flex flex-wrap gap-4 sm:gap-6 md:gap-8 justify-center lg:grid lg:grid-cols-3 lg:gap-8">
            <div className="bg-gray-800 p-4 sm:p-6 rounded-lg shadow-lg transition-transform duration-300 hover:scale-105 w-full sm:w-1/2 lg:w-auto">
              <div className="flex items-center mb-3 sm:mb-4">
                <i className="fas fa-user-cog text-xl sm:text-2xl mr-2 sm:mr-3 text-indigo-400"></i>
                <h5 className="text-sm sm:text-lg font-semibold">Personalized for You</h5>
          <h3 className="text-lg font-semibold mb-4">Why Deliver With Us</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-gray-800 p-4 rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105">
              <div className="flex items-center mb-2">
                <i className="fas fa-user-cog text-xl mr-2 text-indigo-400"></i>
                <h5 className="text-sm font-semibold">Personalized for You</h5>
              </div>
              <p className="text-xs sm:text-sm text-gray-300">Experience tailored recommendations and a shopping experience just for you.</p>
              <p className="text-xs text-gray-300">Experience tailored recommendations and a shopping experience just for you.</p>
            </div>
            <div className="bg-gray-800 p-4 sm:p-6 rounded-lg shadow-lg transition-transform duration-300 hover:scale-105 w-full sm:w-1/2 lg:w-auto">
              <div className="flex items-center mb-3 sm:mb-4">
                <i className="fas fa-truck text-xl sm:text-2xl mr-2 sm:mr-3 text-green-400"></i>
                <h5 className="text-sm sm:text-lg font-semibold">Fast Reliable Deliveries</h5>
            <div className="bg-gray-800 p-4 rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105">
              <div className="flex items-center mb-2">
                <i className="fas fa-truck text-xl mr-2 text-green-400"></i>
                <h5 className="text-sm font-semibold">Fast Reliable Deliveries</h5>
              </div>
              <p className="text-xs sm:text-sm text-gray-300">Enjoy swift and dependable delivery services right to your doorstep.</p>
              <p className="text-xs text-gray-300">Enjoy swift and dependable delivery services right to your doorstep.</p>
            </div>
            <div className="bg-gray-800 p-4 sm:p-6 rounded-lg shadow-lg transition-transform duration-300 hover:scale-105 w-full sm:w-1/2 lg:w-auto">
              <div className="flex items-center mb-3 sm:mb-4">
                <i className="fas fa-check-circle text-xl sm:text-2xl mr-2 sm:mr-3 text-blue-400"></i>
                <h5 className="text-sm sm:text-lg font-semibold">Guaranteed Product Quality</h5>
            <div className="bg-gray-800 p-4 rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105">
              <div className="flex items-center mb-2">
                <i className="fas fa-check-circle text-xl mr-2 text-blue-400"></i>
                <h5 className="text-sm font-semibold">Guaranteed Product Quality</h5>
              </div>
              <p className="text-xs sm:text-sm text-gray-300">We ensure top-notch quality for all the products we offer.</p>
              <p className="text-xs text-gray-300">We ensure top-notch quality for all the products we offer.</p>
            </div>
          </div>
        </div>
        <br />
        <div className="text-center">
          <p className="text-xs opacity-75">&copy; 2024 ParcelPoa. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
