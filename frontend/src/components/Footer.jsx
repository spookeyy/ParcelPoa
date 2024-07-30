import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left mb-8">
          <div className="mb-6 md:mb-0">
            <h4 className="text-2xl font-extrabold mb-2">ParcelPoa</h4>
            <p className="text-sm opacity-75">&copy; 2024 ParcelPoa. All rights reserved.</p>
          </div>

          <nav className="mb-6 md:mb-0">
            <ul className="flex flex-col md:flex-row md:space-x-8 space-y-3 md:space-y-0">
              <li><a href="/about-us" className="hover:text-gray-400 transition duration-300 text-lg">About Us</a></li>
              <li><a href="/contact-us" className="hover:text-gray-400 transition duration-300 text-lg">Contact Us</a></li>
              <li><a href="/privacy-policy" className="hover:text-gray-400 transition duration-300 text-lg">Privacy Policy</a></li>
              <li><a href="/terms-of-service" className="hover:text-gray-400 transition duration-300 text-lg">Terms of Service</a></li>
              <li><a href="/returns" className="hover:text-gray-400 transition duration-300 text-lg">Returns</a></li>
            </ul>
          </nav>

          <div className="text-center md:text-right">
            <p className="text-sm mb-1">Customer Support: <a href="mailto:support@parcelpoa.com" className="hover:text-gray-400 transition duration-300">support@parcelpoa.com</a></p>
            <p className="text-sm">Call us: <a href="tel:+18001234567" className="hover:text-gray-400 transition duration-300">+1 (800) 123-4567</a></p>
          </div>
        </div>

        <div className="text-center">
          <h3 className="text-xl font-semibold mb-6">Why Shop With Us</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105">
              <div className="flex items-center mb-4">
                <i className="fas fa-user-cog text-2xl mr-3 text-indigo-400"></i>
                <h5 className="text-lg font-semibold">Personalized for You</h5>
              </div>
              <p className="text-sm text-gray-300">Experience tailored recommendations and a shopping experience just for you.</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105">
              <div className="flex items-center mb-4">
                <i className="fas fa-truck text-2xl mr-3 text-green-400"></i>
                <h5 className="text-lg font-semibold">Fast Reliable Deliveries</h5>
              </div>
              <p className="text-sm text-gray-300">Enjoy swift and dependable delivery services right to your doorstep.</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105">
              <div className="flex items-center mb-4">
                <i className="fas fa-check-circle text-2xl mr-3 text-blue-400"></i>
                <h5 className="text-lg font-semibold">Guaranteed Product Quality</h5>
              </div>
              <p className="text-sm text-gray-300">We ensure top-notch quality for all the products we offer.</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
