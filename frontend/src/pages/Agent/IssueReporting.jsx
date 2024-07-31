// src/pages/IssueReporting.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function IssueReporting() {
  const [issueDescription, setIssueDescription] = useState('');
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch existing issues when component mounts
  useEffect(() => {
    fetchIssues();
  }, []);

  // Fetch issues using plain fetch API
  const fetchIssues = () => {
    // Simulate data fetching
    const fetchedIssues = [
      { id: 1, description: 'Delayed delivery', status: 'Open' },
      { id: 2, description: 'Parcel damaged', status: 'Resolved' },
    ];

    // Simulate an API call using setTimeout
    setTimeout(() => {
      setIssues(fetchedIssues);
      setLoading(false);
    }, 1000);

    // Uncomment below code when you have API endpoint ready
    // fetch('/api/issues')
    //   .then((response) => {
    //     if (!response.ok) {
    //       throw new Error('Network response was not ok');
    //     }
    //     return response.json();
    //   })
    //   .then((data) => {
    //     setIssues(data);
    //     setLoading(false);
    //   })
    //   .catch((error) => {
    //     console.error('Error fetching issues:', error);
    //     setLoading(false);
    //   });
  };

  // Handle issue reporting
  const handleReportIssue = (e) => {
    e.preventDefault();

    // Simulate reporting issue
    const newIssue = {
      id: issues.length + 1,
      description: issueDescription,
      status: 'Open',
    };

    setIssueDescription('');
    setIssues((prevIssues) => [newIssue, ...prevIssues]);

    // Uncomment below code when you have API endpoint ready
    // fetch('/api/report-issue', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ description: issueDescription }),
    // })
    //   .then((response) => {
    //     if (!response.ok) {
    //       throw new Error('Failed to report issue');
    //     }
    //     return response.json();
    //   })
    //   .then((newIssue) => {
    //     setIssueDescription('');
    //     setIssues((prevIssues) => [newIssue, ...prevIssues]);
    //   })
    //   .catch((error) => {
    //     console.error('Error reporting issue:', error);
    //   });
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen relative">
      {/* Go Back to Dashboard Button */}
      <button
        onClick={() => navigate('/dashboard')}
        className="absolute top-4 right-4 bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600"
      >
        Go Back to Dashboard
      </button>

      <h1 className="text-3xl font-bold mb-6">Issue Reporting</h1>
      <p className="mb-8">Report and manage issues related to deliveries.</p>

      {/* Issue Reporting Form */}
      <form
        onSubmit={handleReportIssue}
        className="bg-white p-6 rounded shadow mb-8"
      >
        <h2 className="text-2xl font-semibold mb-4">Report a New Issue</h2>
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

      {/* Issue List */}
      {loading ? (
        <p>Loading issues...</p>
      ) : (
        <div>
          <h2 className="text-2xl font-semibold mb-4">Reported Issues</h2>
          {issues.length === 0 ? (
            <p>No issues reported yet.</p>
          ) : (
            <ul className="list-disc list-inside ml-6 space-y-4">
              {issues.map((issue) => (
                <li key={issue.id} className="bg-white p-4 rounded shadow">
                  <p className="font-semibold">Issue ID: {issue.id}</p>
                  <p className="mt-2">{issue.description}</p>
                  <p className="mt-2 text-sm text-gray-600">Status: {issue.status}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
