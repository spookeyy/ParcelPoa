import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faReceipt, faUser, faInfoCircle } from '@fortawesome/free-solid-svg-icons';

export default function Header() {
  return (
    <header className="bg-gray-600 text-white shadow-lg rounded-lg mt-0.5 ml-1 mr-1">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <img src="/src/assets/Logo.png" alt="Logo" className="logo" />
        </Link>
        <div className="flex space-x-4 items-center">
          {/* Orders */}
          <Link to="/order-list" className="text-white hover:text-blue-700 transition-colors">
            <FontAwesomeIcon icon={faReceipt} className="h-8 w-8" />
          </Link>

          {/* General Information */}
          <Link to="dashboard-part" className="text-white hover:text-blue-700 transition-colors">
            <FontAwesomeIcon icon={faInfoCircle} className="h-8 w-8" />
          </Link>

          {/* Login Button */}
          <Link to="/login" className="text-white hover:text-blue-700 transition-colors">
            <FontAwesomeIcon icon={faUser} className="h-8 w-8" />
          </Link>

          {/* Login Button */}
          <Link to="/seller-profile" className="text-white hover:text-blue-700 transition-colors">
            <FontAwesomeIcon icon={faUser} className="h-8 w-8" />
          </Link>
        </div>
      </div>
    </header>
  );
}
