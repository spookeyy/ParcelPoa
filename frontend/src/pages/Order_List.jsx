import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';

// Sample data
const initialOrders = [
  { id: '1', date: '2024-07-20', name: 'John Doe', address: '123 Elm St', status: 'Pending', type: 'Online' },
  { id: '2', date: '2024-07-22', name: 'Jane Smith', address: '456 Oak St', status: 'Approved', type: 'In-Store' },
  // Add more sample orders as needed
];

// Filter Component
const FilterBar = ({ onFilterChange, onReset }) => (
  <div className="bg-gray-100 p-4 rounded-lg shadow-md mb-6 flex flex-wrap gap-4 items-center">
    <button
      onClick={() => alert('Filter Icon Clicked')}
      className="text-gray-700 hover:text-gray-900"
      aria-label="Open filter options"
    >
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 10l5 5 5-5H7z"></path>
      </svg>
    </button>
    <select
      onChange={(e) => onFilterChange('date', e.target.value)}
      className="border rounded p-2"
      aria-label="Filter by date"
    >
      <option value="">Select Date</option>
      <option value="2024-07-20">2024-07-20</option>
      <option value="2024-07-22">2024-07-22</option>
      {/* Add more options */}
    </select>
    <select
      onChange={(e) => onFilterChange('type', e.target.value)}
      className="border rounded p-2"
      aria-label="Filter by type"
    >
      <option value="">Select Type</option>
      <option value="Online">Online</option>
      <option value="In-Store">In-Store</option>
    </select>
    <select
      onChange={(e) => onFilterChange('status', e.target.value)}
      className="border rounded p-2"
      aria-label="Filter by status"
    >
      <option value="">Select Status</option>
      <option value="Pending">Pending</option>
      <option value="Approved">Approved</option>
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

// Main Order List Component
export default function Order_List() {
  const [orders, setOrders] = useState(initialOrders);
  const [filters, setFilters] = useState({ date: '', type: '', status: '' });
  const navigate = useNavigate();

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const resetFilters = () => {
    setFilters({ date: '', type: '', status: '' });
  };

  const handleApprove = (id) => {
    setOrders(prevOrders => 
      prevOrders.map(order => 
        order.id === id ? { ...order, status: 'Approved' } : order
      )
    );
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this order?')) {
      setOrders(prevOrders => 
        prevOrders.filter(order => order.id !== id)
      );
    }
  };

  const handleEdit = (id) => {
    navigate(`/order/${id}`);
  };

  // Apply filters
  const filteredOrders = orders.filter(order => {
    return (
      (!filters.date || order.date === filters.date) &&
      (!filters.type || order.type === filters.type) &&
      (!filters.status || order.status === filters.status)
    );
  });

  return (
    <div className="p-6">
      {/* Title */}
      <h1 className="text-2xl font-semibold mb-4">Order List</h1>

      <FilterBar onFilterChange={handleFilterChange} onReset={resetFilters} />
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-100 text-gray-600">
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Order ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Address</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {filteredOrders.map(order => (
              <tr key={order.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm">{order.id}</td>
                <td className="px-6 py-4 text-sm">{order.date}</td>
                <td className="px-6 py-4 text-sm">{order.name}</td>
                <td className="px-6 py-4 text-sm">{order.address}</td>
                <td className="px-6 py-4 text-sm">{order.status}</td>
                <td className="px-6 py-4 text-sm">{order.type}</td>
                <td className="px-6 py-4 text-sm flex items-center gap-2">
                  <button
                    onClick={() => handleEdit(order.id)}
                    className="text-blue-500 hover:text-blue-700"
                    aria-label={`Edit Order ID: ${order.id}`}
                  >
                    <PencilIcon className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(order.id)}
                    className="text-red-500 hover:text-red-700"
                    aria-label={`Delete Order ID: ${order.id}`}
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
