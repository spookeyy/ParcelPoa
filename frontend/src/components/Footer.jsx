import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-yellow-600 text-white py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left mb-4">
          <nav className="mb-4 md:mb-0 w-full md:w-auto">
            <ul className="flex flex-row flex-wrap justify-center md:justify-start space-x-2 space-y-0">
              <li>
                <Link
                  to="/about"
                  className="hover:text-gray-400 transition duration-300 text-sm"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/contact-us"
                  className="hover:text-gray-400 transition duration-300 text-sm"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy-policy"
                  className="hover:text-gray-400 transition duration-300 text-sm"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className="hover:text-gray-400 transition duration-300 text-sm"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  to="/returns"
                  className="hover:text-gray-400 transition duration-300 text-sm"
                >
                  Returns
                </Link>
              </li>
            </ul>
          </nav>
          <div className="text-center md:text-right">
            <p className="text-xs mb-1">
              Customer Support:{" "}
              <a
                href="mailto:support@parcelpoa.com"
                className="hover:text-gray-400 transition duration-300"
              >
                support@parcelpoa.com
              </a>
            </p>
            <p className="text-xs">
              Call us:{" "}
              <a
                href="tel:+18001234567"
                className="hover:text-gray-400 transition duration-300"
              >
                +1 (800) 123-4567
              </a>
            </p>
          </div>
        </div>

        <div className="text-center">
          <h3 className="text-lg font-semibold mb-4">Why Deliver With Us</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-gray-800 p-4 rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105">
              <div className="flex items-center mb-2">
                <i className="fas fa-user-cog text-xl mr-2 text-indigo-400"></i>
                <h5 className="text-sm font-semibold">Personalized for You</h5>
              </div>
              <p className="text-xs text-gray-300">
                Experience tailored recommendations and a shopping experience
                just for you.
              </p>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105">
              <div className="flex items-center mb-2">
                <i className="fas fa-truck text-xl mr-2 text-green-400"></i>
                <h5 className="text-sm font-semibold">
                  Fast Reliable Deliveries
                </h5>
              </div>
              <p className="text-xs text-gray-300">
                Enjoy swift and dependable delivery services right to your
                doorstep.
              </p>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105">
              <div className="flex items-center mb-2">
                <i className="fas fa-check-circle text-xl mr-2 text-blue-400"></i>
                <h5 className="text-sm font-semibold">
                  Guaranteed Product Quality
                </h5>
              </div>
              <p className="text-xs text-gray-300">
                We ensure top-notch quality for all the products we offer.
              </p>
            </div>
          </div>
        </div>
        <br />
        <div className="text-center">
          <p className="text-xs opacity-75">
            &copy; 2024 ParcelPoa. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
