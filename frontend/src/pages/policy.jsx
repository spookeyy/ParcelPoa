import React from 'react';

export default function PrivacyPolicy() {
  return (
    <div className="bg-gradient-to-br from-blue-300 to-indigo-700 min-h-screen p-8">
      <div className="container mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="bg-indigo-500 p-8">
          <h1 className="text-3xl font-bold text-white">Privacy Policy</h1>
        </div>
        <div className="p-8">
          <h2 className="text-2xl font-bold mb-4">Your Privacy</h2>
          <p className="mb-6 text-gray-700">
            We value your privacy and are committed to protecting your personal information. This policy explains how we collect, use, and safeguard your data.
          </p>
          <h3 className="text-xl font-bold mb-2">Information Collection</h3>
          <p className="mb-4 text-gray-700">
            We collect information that you provide to us directly, such as when you create an account, make a purchase, or contact us.
          </p>
          <h3 className="text-xl font-bold mb-2">Use of Information</h3>
          <p className="mb-4 text-gray-700">
            We use your information to provide, maintain, and improve our services, as well as to communicate with you.
          </p>
          <h3 className="text-xl font-bold mb-2">Data Security</h3>
          <p className="mb-4 text-gray-700">
            We implement a variety of security measures to maintain the safety of your personal information.
          </p>
        </div>
      </div>
    </div>
  );
}
