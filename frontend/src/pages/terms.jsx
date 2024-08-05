import React from 'react';

export default function TermsOfService() {
  return (
    <div className="bg-gradient-to-br from-blue-300 to-indigo-700 min-h-screen p-8">
      <div className="container mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="bg-indigo-500 p-8">
          <h1 className="text-3xl font-bold text-white">Terms of Service</h1>
        </div>
        <div className="p-8">
          <h2 className="text-2xl font-bold mb-4">Introduction</h2>
          <p className="mb-6 text-gray-700">
            Welcome to our service. By using our service, you agree to comply with and be bound by the following terms and conditions.
          </p>
          <h3 className="text-xl font-bold mb-2">User Responsibilities</h3>
          <p className="mb-4 text-gray-700">
            You agree to use our service only for lawful purposes and in a way that does not infringe the rights of, restrict, or inhibit anyone else's use of the service.
          </p>
          <h3 className="text-xl font-bold mb-2">Service Availability</h3>
          <p className="mb-4 text-gray-700">
            We do not guarantee that our service will be available at all times. We may experience interruptions or downtime.
          </p>
          <h3 className="text-xl font-bold mb-2">Amendments</h3>
          <p className="mb-4 text-gray-700">
            We reserve the right to amend these terms at any time. Any changes will be posted on this page.
          </p>
        </div>
      </div>
    </div>
  );
}
