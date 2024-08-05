import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

// Sample data for agent requests (you might want to use a different data source)
const initialAgentRequests = [
  {
    id: '1',
    name: 'Alice Johnson',
    contact: 'alice.johnson@example.com',
    phone: '123-456-7890',
    address: '123 Maple Ave, Springfield, IL',
    profileImage: 'https://via.placeholder.com/150',
    status: 'Pending'
  },
  {
    id: '2',
    name: 'Bob Smith',
    contact: 'bob.smith@example.com',
    phone: '987-654-3210',
    address: '456 Oak St, Springfield, IL',
    profileImage: 'https://via.placeholder.com/150',
    status: 'Pending'
  },
  // Add more sample agent requests as needed
];

const Agent_Details = () => {
  const { id } = useParams();
  const [agent, setAgent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate a data fetch with a timeout
    const fetchAgent = () => {
      setLoading(true);
      setTimeout(() => {
        const foundAgent = initialAgentRequests.find(agent => agent.id === id);
        setAgent(foundAgent);
        setLoading(false);
      }, 2000); // Simulate network delay of 2 seconds
    };

    fetchAgent();
  }, [id]);

  const handleApprove = () => {
    setAgent(prevAgent => ({ ...prevAgent, status: 'Approved' }));
    // Optionally: Make an API call to update the agent's status in a database.
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="loader"></div>
      </div>
    );
  }

  if (!agent) {
    return <p className="text-red-500 text-center">Agent not found</p>;
  }

  return (
    <div className="p-8 max-w-3xl mx-auto bg-white rounded-lg shadow-lg border border-gray-200">
      <h1 className="text-4xl font-bold mb-6 text-gray-900">Agent Details</h1>
      <div className="bg-gray-50 p-6 rounded-lg shadow-md border border-gray-300">
        <div className="flex flex-col md:flex-row items-center md:items-start md:justify-between">
          <div className="flex-shrink-0 mb-4 md:mb-0">
            <img src={agent.profileImage} alt={`${agent.name}'s profile`} className="w-32 h-32 object-cover rounded-full shadow-lg border-2 border-gray-200" />
          </div>
          <div className="md:ml-6 flex-1">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">Agent ID: {agent.id}</h2>
            <p className="text-lg text-gray-700 mb-1"><strong>Name:</strong> {agent.name}</p>
            <p className="text-lg text-gray-700 mb-1"><strong>Contact:</strong> {agent.contact}</p>
            <p className="text-lg text-gray-700 mb-1"><strong>Phone:</strong> {agent.phone}</p>
            <p className="text-lg text-gray-700 mb-1"><strong>Address:</strong> {agent.address}</p>
            <p className="text-lg text-gray-700 mb-4"><strong>Status:</strong> {agent.status}</p>
            <button
              onClick={handleApprove}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${agent.status === 'Approved' ? 'bg-green-500 text-white cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
              disabled={agent.status === 'Approved'}
            >
              {agent.status === 'Approved' ? 'Approved' : 'Approve'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Agent_Details;
