import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";

// Sample data with product images and additional details
const initialOrders = [
  {
    id: "1",
    date: "2024-07-20",
    name: "John Doe",
    address: "123 Elm St",
    status: "Pending",
    email: "john.doe@example.com",
    products: [
      {
        productId: "P001",
        name: "Product A",
        price: 29.99,
        quantity: 2,
        imageUrl: "https://via.placeholder.com/50",
      },
      {
        productId: "P002",
        name: "Product B",
        price: 49.99,
        quantity: 1,
        imageUrl: "https://via.placeholder.com/50",
      },
    ],
    trackingNumber: "TN123456789",
  },
  {
    id: "2",
    date: "2024-07-22",
    name: "Jane Smith",
    address: "456 Oak St",
    status: "Approved",
    email: "jane.smith@example.com",
    products: [
      {
        productId: "P003",
        name: "Product C",
        price: 19.99,
        quantity: 3,
        imageUrl: "https://via.placeholder.com/50",
      },
    ],
    trackingNumber: "TN987654321",
  },
  // Add more sample orders as needed
];

// Filter Component
const FilterBar = ({ onFilterChange, onReset }) => (
  <div className="bg-gray-100 p-4 rounded-lg shadow-md mb-6 flex flex-wrap gap-4 items-center">
    <button
      onClick={() => alert("Filter Icon Clicked")}
      className="text-gray-700 hover:text-gray-900"
      aria-label="Open filter options"
    >
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M7 10l5 5 5-5H7z"
        ></path>
      </svg>
    </button>
    <select
      onChange={(e) => onFilterChange("date", e.target.value)}
      className="border rounded p-2 bg-white shadow-sm focus:ring-2 focus:ring-blue-500"
      aria-label="Filter by date"
    >
      <option value="">Select Date</option>
      <option value="2024-07-20">2024-07-20</option>
      <option value="2024-07-22">2024-07-22</option>
      {/* Add more options */}
    </select>
    <select
      onChange={(e) => onFilterChange("status", e.target.value)}
      className="border rounded p-2 bg-white shadow-sm focus:ring-2 focus:ring-blue-500"
      aria-label="Filter by status"
    >
      <option value="">Select Status</option>
      <option value="Pending">Pending</option>
      <option value="Approved">Approved</option>
    </select>
    <button
      onClick={onReset}
      className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
      aria-label="Reset filters"
    >
      Reset Filter
    </button>
  </div>
);

// Main Order List Component
export default function Order_List() {
  const [orders, setOrders] = useState(initialOrders);
  const [filters, setFilters] = useState({ date: "", status: "" });
  const navigate = useNavigate();

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const resetFilters = () => {
    setFilters({ date: "", status: "" });
  };

  const handleApprove = (id) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === id ? { ...order, status: "Approved" } : order
      )
    );
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      setOrders((prevOrders) => prevOrders.filter((order) => order.id !== id));
    }
  };

  const handleEdit = (id) => {
    navigate(`/order/${id}`);
  };

  // Apply filters
  const filteredOrders = orders.filter((order) => {
    return (
      (!filters.date || order.date === filters.date) &&
      (!filters.status || order.status === filters.status)
    );
  });

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-gray-300 min-h-screen">
      {/* Title */}
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 text-gray-800">
        Order List
      </h1>

      <FilterBar onFilterChange={handleFilterChange} onReset={resetFilters} />

      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-200 text-gray-700">
            <tr>
              <th className="px-4 py-2 text-left text-xs font-semibold uppercase">
                Order ID
              </th>
              <th className="px-4 py-2 text-left text-xs font-semibold uppercase">
                Date
              </th>
              <th className="px-4 py-2 text-left text-xs font-semibold uppercase">
                Client Name
              </th>
              <th className="px-4 py-2 text-left text-xs font-semibold uppercase">
                Address
              </th>
              <th className="px-4 py-2 text-left text-xs font-semibold uppercase">
                Email
              </th>
              <th className="px-4 py-2 text-left text-xs font-semibold uppercase">
                Status
              </th>
              <th className="px-4 py-2 text-left text-xs font-semibold uppercase">
                Products
              </th>
              <th className="px-4 py-2 text-left text-xs font-semibold uppercase">
                Tracking Number
              </th>
              <th className="px-4 py-2 text-left text-xs font-semibold uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {filteredOrders.map((order) => (
              <tr
                key={order.id}
                className="hover:bg-gray-50 border-b border-gray-200"
              >
                <td className="px-4 py-2 text-sm">{order.id}</td>
                <td className="px-4 py-2 text-sm">{order.date}</td>
                <td className="px-4 py-2 text-sm">{order.name}</td>
                <td className="px-4 py-2 text-sm">{order.address}</td>
                <td className="px-4 py-2 text-sm">{order.email}</td>
                <td className="px-4 py-2 text-sm">
                  <span
                    className={`font-semibold ${
                      order.status === "Approved"
                        ? "text-green-600"
                        : "text-yellow-600"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="px-4 py-2 text-sm">
                  {order.products.map((product, index) => (
                    <div key={index} className="flex items-center gap-2 mb-2">
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="w-8 h-8 object-cover"
                      />
                      <span className="text-sm">
                        {product.name} (Price: ${product.price}, Quantity:{" "}
                        {product.quantity})
                      </span>
                    </div>
                  ))}
                </td>
                <td className="px-4 py-2 text-sm">{order.trackingNumber}</td>
                <td className="px-4 py-2 text-sm flex items-center gap-2">
                  <button
                    onClick={() => handleEdit(order.id)}
                    className="text-blue-600 hover:text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    aria-label={`Edit Order ID: ${order.id}`}
                  >
                    <PencilIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(order.id)}
                    className="text-red-600 hover:text-red-800 focus:outline-none focus:ring-2 focus:ring-red-500"
                    aria-label={`Delete Order ID: ${order.id}`}
                  >
                    <TrashIcon className="w-4 h-4 sm:w-5 sm:h-5" />
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
