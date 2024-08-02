import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PencilIcon, TrashIcon, CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';

// Sample data for agent requests
const initialAgentRequests = [
  {
    id: '1',
    name: 'Alice Johnson',
    contact: 'alice.johnson@example.com',
    phone: '123-456-7890',
    address: '123 Maple Ave, Springfield, IL',
    profileImage: 'https://via.placeholder.com/50',
    status: 'Pending'
  },
  {
    id: '2',
    name: 'Bob Smith',
    contact: 'bob.smith@example.com',
    phone: '987-654-3210',
    address: '456 Oak St, Springfield, IL',
    profileImage: 'https://via.placeholder.com/50',
    status: 'Pending'
  },
  // Add more sample agent requests as needed
];

// Filter Component
const FilterBar = ({ filters, onFilterChange, onReset }) => (
  <div className="bg-gray-100 p-4 rounded-lg shadow-md mb-6 flex flex-wrap gap-4 items-center">
    <input
      type="text"
      value={filters.name}
      onChange={(e) => onFilterChange('name', e.target.value)}
      className="border rounded p-2"
      placeholder="Filter by name"
      aria-label="Filter by name"
    />
    <select
      value={filters.status}
      onChange={(e) => onFilterChange('status', e.target.value)}
      className="border rounded p-2"
      aria-label="Filter by status"
    >
      <option value="">Select Status</option>
      <option value="Pending">Pending</option>
      <option value="Approved">Approved</option>
      <option value="Rejected">Rejected</option>
    </select>
    <button
      onClick={onReset}
      className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
      aria-label="Reset filters"
    >
      Reset Filter
    </button>
  </div>
);

// Main Agent Requests Component
export default function Agent_Requests() {
  const [agentRequests, setAgentRequests] = useState(initialAgentRequests);
  const [filters, setFilters] = useState({ name: '', status: '' });
  const navigate = useNavigate();

  const handleView = (id) => {
    navigate(`/agent/${id}`);
  };

  const handleApprove = (id) => {
    setAgentRequests(prevRequests =>
      prevRequests.map(agent =>
        agent.id === id ? { ...agent, status: 'Approved' } : agent
      )
    );
  };

  const handleReject = (id) => {
    setAgentRequests(prevRequests =>
      prevRequests.map(agent =>
        agent.id === id ? { ...agent, status: 'Rejected' } : agent
      )
    );
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this agent request?')) {
      setAgentRequests(prevRequests =>
        prevRequests.filter(agent => agent.id !== id)
      );
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const resetFilters = () => {
    setFilters({ name: '', status: '' });
  };

  // Apply filters
  const filteredAgentRequests = agentRequests.filter(agent => {
    return (
      (!filters.name || agent.name.toLowerCase().includes(filters.name.toLowerCase())) &&
      (!filters.status || agent.status === filters.status)
    );
  });

  return (
    <div className="p-6">
      {/* Title */}
      <h1 className="text-2xl font-semibold mb-4">Agent Requests</h1>

      <FilterBar filters={filters} onFilterChange={handleFilterChange} onReset={resetFilters} />
      
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-100 text-gray-600">
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Profile Image</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Agent ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Contact</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Phone</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Address</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {filteredAgentRequests.map(agent => (
              <tr key={agent.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm">
                  <img src={agent.profileImage} alt={`${agent.name}'s profile`} className="w-12 h-12 rounded-full object-cover" />
                </td>
                <td className="px-6 py-4 text-sm">{agent.id}</td>
                <td className="px-6 py-4 text-sm">{agent.name}</td>
                <td className="px-6 py-4 text-sm">{agent.contact}</td>
                <td className="px-6 py-4 text-sm">{agent.phone}</td>
                <td className="px-6 py-4 text-sm">{agent.address}</td>
                <td className="px-6 py-4 text-sm">
                  <span className={`inline-flex items-center px-3 py-1 text-sm font-medium rounded-full ${agent.status === 'Approved' ? 'bg-green-100 text-green-800' : agent.status === 'Rejected' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'}`}>
                    {agent.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm flex items-center gap-2">
                  <button
                    onClick={() => handleView(agent.id)}
                    className="text-blue-500 hover:text-blue-700"
                    aria-label={`View Agent ID: ${agent.id}`}
                  >
                    <PencilIcon className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleApprove(agent.id)}
                    className="text-green-500 hover:text-green-700"
                    aria-label={`Approve Agent ID: ${agent.id}`}
                  >
                    <CheckCircleIcon className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleReject(agent.id)}
                    className="text-red-500 hover:text-red-700"
                    aria-label={`Reject Agent ID: ${agent.id}`}
                  >
                    <XCircleIcon className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(agent.id)}
                    className="text-gray-500 hover:text-gray-700"
                    aria-label={`Delete Agent ID: ${agent.id}`}
                  >
                    <TrashIcon className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
