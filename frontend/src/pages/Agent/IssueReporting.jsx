import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function IssueReporting() {
  const [issueDescription, setIssueDescription] = useState('');
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch existing issues when component mounts
  useEffect(() => {
    const fetchIssues = async () => {
      try {
        // Replace with your API call
        const response = await fetch('/api/issues');
        const data = await response.json();
        setIssues(data);
      } catch (error) {
        console.error('Error fetching issues:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchIssues();
  }, []);

  // Handle issue reporting
  const handleReportIssue = async (e) => {
    e.preventDefault();
    try {
      // Replace with your API call
      const response = await fetch('/api/report-issue', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ description: issueDescription }),
      });
      if (response.ok) {
        // Clear the form field and refresh the issue list
        setIssueDescription('');
        const newIssue = await response.json();
        setIssues((prevIssues) => [newIssue, ...prevIssues]);
      } else {
        console.error('Failed to report issue');
      }
    } catch (error) {
      console.error('Error reporting issue:', error);
    }
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
      <form onSubmit={handleReportIssue} className="bg-white p-6 rounded shadow mb-8">
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
