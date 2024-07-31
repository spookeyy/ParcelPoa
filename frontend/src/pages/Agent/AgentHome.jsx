import React from 'react';
import { Link } from 'react-router-dom';

export default function AgentHome() {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Agent Dashboard</h1>
      <p className="text-lg mb-6">Welcome to the agent side of ParcelPoa!</p>
      
      <div className="flex flex-wrap justify-center gap-4">
        <Link to="/dashboard">
          <button className="bg-blue-500 text-white px-6 py-3 rounded shadow hover:bg-blue-600">Dashboard</button>
        </Link>
        <Link to="/agent-list">
          <button className="bg-blue-500 text-white px-6 py-3 rounded shadow hover:bg-blue-600">Agent List</button>
        </Link>
        <Link to="/agent-requests">
          <button className="bg-blue-500 text-white px-6 py-3 rounded shadow hover:bg-blue-600">Agent Requests</button>
        </Link>
        <Link to="/invoice">
          <button className="bg-blue-500 text-white px-6 py-3 rounded shadow hover:bg-blue-600">Invoices</button>
        </Link>
        <Link to="/messages-list">
          <button className="bg-blue-500 text-white px-6 py-3 rounded shadow hover:bg-blue-600">Messages</button>
        </Link>
        <Link to="/order-list">
          <button className="bg-blue-500 text-white px-6 py-3 rounded shadow hover:bg-blue-600">Orders</button>
        </Link>
        <Link to="/reset-password">
          <button className="bg-blue-500 text-white px-6 py-3 rounded shadow hover:bg-blue-600">Reset Password</button>
        </Link>
      </div>
    </div>
  );
}

