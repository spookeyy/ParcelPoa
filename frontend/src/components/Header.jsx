import React from 'react';
import { ShoppingCartIcon, UserIcon, QuestionMarkCircleIcon } from '@heroicons/react/24/outline';

export default function Header() {
  return (
    <header className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <h1 className="text-3xl font-bold">ParcelPoa</h1>
        <div className="flex space-x-4 items-center">
          <a href="#cart" className="text-white hover:text-gray-300 transition-colors">
            <ShoppingCartIcon className="h-6 w-6" />
          </a>
          <a href="#login" className="text-white hover:text-gray-300 transition-colors">
            <UserIcon className="h-6 w-6" />
          </a>
          <a href="#help" className="text-white hover:text-gray-300 transition-colors">
            <QuestionMarkCircleIcon className="h-6 w-6" />
          </a>
        </div>
      </div>
    </header>
  );
}
