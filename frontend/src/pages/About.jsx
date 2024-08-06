import React from 'react';
import Navbar from '../components/Navbar';


export default function About() {
  return (
    <>
      <Navbar />
    <div className="bg-gradient-to-br from-blue-300 to-indigo-700 min-h-screen p-8">
      <div className="container mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="bg-indigo-500 p-8">
          <h1 className="text-3xl font-bold text-white">About ParcelPoa</h1>
        </div>
        <div className="p-8">
          <h2 className="text-2xl font-bold mb-4">Who We Are</h2>
          <p className="mb-6 text-gray-700">
            ParcelPoa is a leading delivery service provider dedicated to connecting businesses and individuals through reliable and efficient delivery solutions. Founded in 2023, our mission is to make package delivery as easy and convenient as possible.
          </p>

          <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
          <p className="mb-6 text-gray-700">
            Our mission is to provide top-notch delivery services that exceed our customers' expectations. We aim to ensure timely, safe, and cost-effective delivery solutions for businesses and individuals alike.
          </p>

          <h2 className="text-2xl font-bold mb-4">What We Offer</h2>
          <ul className="list-disc list-inside mb-6 text-gray-700">
            <li>Same-day delivery</li>
            <li>Express delivery services</li>
            <li>International shipping</li>
            <li>Real-time tracking</li>
            <li>Secure packaging</li>
          </ul>

          <h2 className="text-2xl font-bold mb-4">Our Values</h2>
          <p className="mb-6 text-gray-700">
            At ParcelPoa, we are committed to:
          </p>
          <ul className="list-disc list-inside mb-6 text-gray-700">
            <li><strong>Customer Satisfaction:</strong> We prioritize our customers' needs and strive to exceed their expectations.</li>
            <li><strong>Integrity:</strong> We conduct our business with honesty and transparency.</li>
            <li><strong>Innovation:</strong> We continuously seek new ways to improve our services and deliver value.</li>
            <li><strong>Community:</strong> We are dedicated to making a positive impact in the communities we serve.</li>
          </ul>

          <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
          <p className="mb-6 text-gray-700">
            Have questions or need assistance? Reach out to our customer support team at <a href="mailto:support@parcelpoa.com" className="text-yellow-500 hover:underline">support@parcelpoa.com</a> or call us at <a href="tel:+123456789" className="text-yellow-500 hover:underline">+123-456-789</a>.
          </p>
        </div>
      </div>
    </div>
    </>
  );
}
