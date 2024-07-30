import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const initialOrders = [
  { id: '1', date: '2024-07-20', name: 'John Doe', address: '123 Elm St', status: 'Pending', type: 'Online' },
  { id: '2', date: '2024-07-22', name: 'Jane Smith', address: '456 Oak St', status: 'Approved', type: 'In-Store' },
  // Add more sample orders as needed
];

const Order_Details = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const order = initialOrders.find(order => order.id === id);

  if (!order) {
    return <p className="text-red-500">Order not found</p>;
  }

  const handleApprove = () => {
    navigate(`/invoice/${id}`, { state: { order } });
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-gray-50 rounded-lg shadow-md border border-gray-200">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Order Details</h1>
      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Order ID: {order.id}</h2>
            <p className="text-gray-600"><strong>Date:</strong> {order.date}</p>
            <p className="text-gray-600"><strong>Name:</strong> {order.name}</p>
            <p className="text-gray-600"><strong>Address:</strong> {order.address}</p>
            <p className="text-gray-600"><strong>Status:</strong> {order.status}</p>
            <p className="text-gray-600"><strong>Type:</strong> {order.type}</p>
          </div>
          <div className="flex items-center justify-center">
            <img src="https://via.placeholder.com/300x200" alt="Order Preview" className="w-full h-auto rounded-lg shadow-md" />
          </div>
        </div>
        <div className="mt-6 flex justify-end">
          <button
            onClick={handleApprove}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-150"
          >
            Approve Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default Order_Details;
