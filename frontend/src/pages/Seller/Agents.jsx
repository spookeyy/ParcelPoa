import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';

// Sample data for agent requests with dynamic status based on deliveries
const getStatus = (deliveries) => deliveries > 5 ? 'Online' : 'Away';

const initialAgentRequests = [
  {
    id: '1',
    profileImage: 'https://via.placeholder.com/150',
    name: 'John Doe',
    contact: 'johndoe@example.com',
    phone: '+1234567890',
    address: '123 Main St, Springfield',
    deliveries: 5,
    status: getStatus(5),
  },
  {
    id: '2',
    profileImage: 'https://via.placeholder.com/150',
    name: 'Jane Smith',
    contact: 'janesmith@example.com',
    phone: '+0987654321',
    address: '456 Elm St, Springfield',
    deliveries: 8,
    status: getStatus(8),
  },
  {
    id: '3',
    profileImage: 'https://via.placeholder.com/150',
    name: 'Michael Johnson',
    contact: 'michaeljohnson@example.com',
    phone: '+1122334455',
    address: '789 Oak St, Springfield',
    deliveries: 3,
    status: getStatus(3),
  },
  {
    id: '4',
    profileImage: 'https://via.placeholder.com/150',
    name: 'Emily Davis',
    contact: 'emilydavis@example.com',
    phone: '+5566778899',
    address: '321 Pine St, Springfield',
    deliveries: 7,
    status: getStatus(7),
  },
  {
    id: '5',
    profileImage: 'https://via.placeholder.com/150',
    name: 'William Brown',
    contact: 'williambrown@example.com',
    phone: '+4433221100',
    address: '654 Maple St, Springfield',
    deliveries: 4,
    status: getStatus(4),
  },
];

const FilterBar = ({ filters, onFilterChange, onReset }) => (
  <div className="bg-gray-200 p-4 rounded-lg shadow-md mb-6 flex flex-wrap gap-4 items-center">
    <input
      type="text"
      value={filters.name}
      onChange={(e) => onFilterChange('name', e.target.value)}
      className="border rounded-md p-2 text-base w-64"
      placeholder="Filter by name"
      aria-label="Filter by name"
    />
    <select
      value={filters.status}
      onChange={(e) => onFilterChange('status', e.target.value)}
      className="border rounded-md p-2 text-base"
      aria-label="Filter by status"
    >
      <option value="">Select Status</option>
      <option value="Online">Online</option>
      <option value="Away">Away</option>
    </select>
    <button
      onClick={onReset}
      className="bg-red-600 text-white py-1 px-3 rounded-md text-base hover:bg-red-700"
      aria-label="Reset filters"
    >
      Reset Filter
    </button>
  </div>
);

export default function Agents() {
  const [agentRequests, setAgentRequests] = useState(initialAgentRequests);
  const [filters, setFilters] = useState({ name: '', status: '' });
  const navigate = useNavigate();

  const handleView = (id) => {
    navigate(`/agent-trends/${id}`);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this client request?')) {
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
  const filteredAgentRequests = agentRequests.filter(agent =>
    (!filters.name || agent.name.toLowerCase().includes(filters.name.toLowerCase())) &&
    (!filters.status || agent.status === filters.status)
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Title */}
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Agents List</h1>

      <FilterBar filters={filters} onFilterChange={handleFilterChange} onReset={resetFilters} />
      
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg">
          <thead>
            <tr className="bg-gray-100 text-gray-600 text-base">
              <th className="px-4 py-2 text-left font-medium">Profile Image</th>
              <th className="px-4 py-2 text-left font-medium">Agent ID</th>
              <th className="px-4 py-2 text-left font-medium">Name</th>
              <th className="px-4 py-2 text-left font-medium">Contact</th>
              <th className="px-4 py-2 text-left font-medium">Phone</th>
              <th className="px-4 py-2 text-left font-medium">Address</th>
              <th className="px-4 py-2 text-left font-medium">Deliveries</th>
              <th className="px-4 py-2 text-left font-medium">Status</th>
              <th className="px-4 py-2 text-left font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm">
            {filteredAgentRequests.map(agent => (
              <tr key={agent.id} className="hover:bg-gray-50 transition-colors duration-300">
                <td className="px-4 py-2">
                  <img src={agent.profileImage} alt={`${agent.name}'s profile`} className="w-12 h-12 rounded-full object-cover" />
                </td>
                <td className="px-4 py-2">{agent.id}</td>
                <td className="px-4 py-2">{agent.name}</td>
                <td className="px-4 py-2">{agent.contact}</td>
                <td className="px-4 py-2">{agent.phone}</td>
                <td className="px-4 py-2">{agent.address}</td>
                <td className="px-4 py-2">{agent.deliveries}</td>
                <td className="px-4 py-2">
                  <span
                    className={`inline-flex items-center px-3 py-1 text-sm font-medium rounded-full ${agent.status === 'Online' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}
                  >
                    {agent.status}
                  </span>
                </td>
                <td className="px-4 py-2 flex items-center gap-2">
                  <button
                    onClick={() => handleView(agent.id)}
                    className="text-blue-600 hover:text-blue-800 transition-colors duration-300 text-base"
                    aria-label={`View Agent ID: ${agent.id}`}
                  >
                    <PencilIcon className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(agent.id)}
                    className="text-gray-600 hover:text-gray-800 transition-colors duration-300 text-base"
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