import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCartIcon, UserIcon, QuestionMarkCircleIcon } from '@heroicons/react/24/outline';

export default function Header() {
  return (
    <header className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <img src="/src/assets/Logo.png" alt="Logo" className="logo" />
        </Link>
        <div className="flex space-x-4 items-center">
          {/* Login Button */}
          <Link to="/login" className="text-white hover:text-gray-300 transition-colors">
            <UserIcon className="h-6 w-6" />
          </Link>
          {/* Messages */}
          <Link to="/messages-list" className="text-white hover:text-gray-300 transition-colors">
            <QuestionMarkCircleIcon className="h-6 w-6" />
          </Link>
          {/* Cart */}
          <Link to="/order-list" className="text-white hover:text-gray-300 transition-colors">
            <ShoppingCartIcon className="h-6 w-6" />
          </Link>
        </div>
      </div>
    </header>
  );
}
