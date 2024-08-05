import React from 'react'

function Navbar() {
  return (
    <div>
        <header className="py-6 px-4 bg-indigo-200 shadow">
        <div className="container mx-auto flex justify-between items-center text-center">
          <h1 className="font-bold text-2xl text-indigo-500">ParcelPoa</h1>
          <nav className="flex items-center space-x-4">
            <div className="flex-grow flex justify-center space-x-4">
              <a href="/contact" className="mx-2 text-gray-700 hover:text-gray-900">Contact Us</a>
              <a href="/contact" className="mx-2 text-gray-700 hover:text-gray-900">About Us</a>
            </div>
            <div className="flex space-x-4">
              <a href="/create-account" className="bg-indigo-500 text-white font-medium py-2 px-4 rounded-full hover:bg-indigo-600">Sign Up</a>
              <a href="/login" className="bg-transparent hover:bg-indigo-500 text-indigo-700 font-semibold hover:text-white py-2 px-4 rounded-full border border-indigo-500 hover:border-transparent">Log In</a>
            </div>
          </nav>
        </div>
      </header>
    </div>
  )
}

export default Navbar