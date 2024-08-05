import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

// Sample data
const initialOrders = [
  {
    id: '1',
    date: '2024-07-20',
    name: 'John Doe',
    address: '123 Elm St',
    status: 'Pending',
    type: 'Online',
    email: 'john.doe@example.com',
    products: [
      { productId: 'P001', name: 'Product A', price: 29.99, quantity: 2 },
      { productId: 'P002', name: 'Product B', price: 49.99, quantity: 1 },
    ],
    trackingNumber: 'TN123456789',
  },
  {
    id: '2',
    date: '2024-07-22',
    name: 'Jane Smith',
    address: '456 Oak St',
    status: 'Approved',
    type: 'In-Store',
    email: 'jane.smith@example.com',
    products: [
      { productId: 'P003', name: 'Product C', price: 19.99, quantity: 3 },
    ],
    trackingNumber: 'TN987654321',
  },
  // More sample orders
];

const Order_Details = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const order = initialOrders.find(order => order.id === id);

  if (!order) {
    return <p className="text-red-500 text-center font-bold text-lg">Order not found</p>;
  }

  const handleApprove = () => {
    navigate(`/invoice/${id}`, { state: { order } });
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto bg-gray-50 rounded-xl shadow-lg border border-gray-200">
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold mb-4 sm:mb-6 lg:mb-8 text-indigo-800">Order Details</h1>
      <div className="bg-white p-4 sm:p-6 lg:p-8 rounded-xl shadow-md border border-gray-300">
        <div className="flex flex-col sm:flex-row gap-6 mb-6">
          <div className="flex-1">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4">Order ID: {order.id}</h2>
            <div className="space-y-4">
              <div className="bg-gray-200 p-4 rounded-lg shadow-sm border border-gray-300">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3">Client Information</h3>
                <div className="space-y-2">
                  <p className="text-gray-700"><strong>Date:</strong> {order.date}</p>
                  <p className="text-gray-700"><strong>Name:</strong> {order.name}</p>
                  <p className="text-gray-700"><strong>Address:</strong> {order.address}</p>
                  <p className="text-gray-700"><strong>Status:</strong> {order.status}</p>
                  <p className="text-gray-700"><strong>Type:</strong> {order.type}</p>
                  <p className="text-gray-700"><strong>Email:</strong> {order.email}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex-1 flex items-center justify-center">
            <img
              src="/src/assets/Logo.png"
              alt="Order Preview"
              className="w-full max-w-xs sm:max-w-md lg:max-w-sm h-auto rounded-lg border border-gray-300 shadow-md"
            />
          </div>
        </div>
        <div className="mb-6">
          <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">Product Details</h3>
          <div className="bg-gray-200 p-4 rounded-lg border border-gray-300">
            {order.products.map((product, index) => (
              <div key={index} className="border-b border-gray-300 py-3 last:border-b-0">
                <p className="text-gray-800 mb-1"><strong>Product:</strong> {product.name}</p>
                <p className="text-gray-800 mb-1"><strong>Price:</strong> ${product.price.toFixed(2)}</p>
                <p className="text-gray-800"><strong>Quantity:</strong> {product.quantity}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="mb-6">
          <p className="text-gray-800"><strong>Tracking Number:</strong> {order.trackingNumber}</p>
        </div>
        <div className="flex justify-end">
          <button
            onClick={handleApprove}
            className="bg-teal-600 text-white py-2 px-4 sm:py-3 sm:px-6 rounded-lg shadow-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-150"
          >
            Approve Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default Order_Details;
