import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function PerformanceMetrics() {
  const [issueDescription, setIssueDescription] = useState('');
  const navigate = useNavigate();

  const handleReportIssue = (e) => {
    e.preventDefault();
    // Handle issue reporting logic here
    console.log('Reporting issue:', issueDescription);

    // Clear the form field
    setIssueDescription('');

    // Optionally navigate to another page or show a success message
    navigate('/dashboard');
  };

  return (
    <div className="p-6 bg-white rounded shadow-md relative min-h-screen">
      {/* Back Button */}
      <button
        onClick={() => navigate('/dashboard')}
        className="absolute bottom-4 left-4 bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600"
      >
        Back
      </button>

      <h1 className="text-3xl font-bold mb-6">Performance Metrics</h1>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Key Performance Indicators:</h2>
        <ul className="list-disc list-inside ml-6 space-y-2">
          <li className="bg-gray-100 p-4 shadow rounded">Delivery Accuracy: 95%</li>
          <li className="bg-gray-100 p-4 shadow rounded">On-Time Deliveries: 90%</li>
          <li className="bg-gray-100 p-4 shadow rounded">Customer Satisfaction: 88%</li>
          <li className="bg-gray-100 p-4 shadow rounded">Average Delivery Time: 45 mins</li>
        </ul>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-4">Report an Issue:</h2>
        <form onSubmit={handleReportIssue} className="space-y-6">
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Describe the Issue:</label>
            <textarea
              value={issueDescription}
              onChange={(e) => setIssueDescription(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              rows="6"
              placeholder="Enter details about the performance issue"
              required
            />
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600"
          >
            Report Issue
          </button>
        </form>
      </div>
    </div>
  );
}

