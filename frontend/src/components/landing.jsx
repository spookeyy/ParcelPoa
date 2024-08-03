import React from 'react';

export default function Landing() {
  return (
    <div className="bg-white">
      <header className="py-6 px-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="font-bold text-2xl text-blue-500">ParcelPoa</h1>
          <nav className="flex space-x-6">
            <a href="#" className="text-gray-700 hover:text-gray-900">Services</a>
            <a href="#" className="text-gray-700 hover:text-gray-900">Agents</a>
            <a href="/create-account" className="bg-purple-500 text-white font-medium py-2 px-4 rounded-full hover:bg-purple-600">Sign Up</a>
            <a href="/login" className="bg-purple-500 text-white font-medium py-2 px-4 rounded-full hover:bg-purple-600">Log In</a>
          </nav>
        </div>
      </header>
      <main className="py-16 px-4">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2">
            <h2 className="text-4xl font-bold mb-4 text-blue-500">Deliver your Order</h2>
            <h3 className="text-3xl font-bold mb-8 text-blue-800">in a Different Way</h3>
            <p className="text-gray-700 mb-6">The delivery company you need.</p>
            <div className="flex space-x-4 justify-center md:justify-start">
              <button className="bg-blue-500 text-white font-medium py-2 px-4 rounded-full hover:bg-blue-600">Get Started</button>
              <button className="bg-gray-500 text-white font-medium py-2 px-4 rounded-full hover:bg-gray-600">Track Package</button>
            </div>
          </div>
          <div className="md:w-1/2 mt-8 md:mt-0">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhlz_hCsL6YVEtcaxL8L_0r3wCWLz9lEvYgA&s"
              alt="Delivery Person"
              className="rounded-lg"
            />
          </div>
        </div>
      </main>
    </div>
  );
}
