import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
import DeliveryConfirmation from "./DeliveryConfirmation"; // Import the DeliveryConfirmation component

// DeliveryCard component code
function DeliveryCard({
  orderID,
  payment,
  product,
  trackingNumber,
  status,
  orderDate,
}) {
  const statusColor =
    {
      Delivered: "bg-green-500",
      Pending: "bg-yellow-500",
      "In Transit": "bg-blue-500",
    }[status] || "bg-gray-500";

  return (
    <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200 flex flex-col items-center">
      <div className="text-sm font-semibold text-gray-800">
        ORDER ID: {orderID}
      </div>
      <div className="text-sm font-semibold text-gray-800">
        Payment: {payment}
      </div>
      <div className="flex items-center">
        <img
          src="/path/to/your/product/image.png"
          alt="Product Image"
          className="w-16 h-16 rounded-full"
        />
        <div className="ml-4">
          <p className="text-sm">{product}</p>
        </div>
      </div>
      <div className="text-sm font-semibold text-gray-800">
        Tracking Number: {trackingNumber}
      </div>
      <div className="text-sm font-semibold text-gray-800">
        Order Date: {orderDate}
      </div>
      <div className="flex items-center mt-2">
        <div
          className={`${statusColor} text-white px-4 py-2 rounded-lg shadow-sm`}
        >
          {status}
        </div>
      </div>
    </div>
  );
}

// Deliveries component code
function Deliveries() {
  const [activeTab, setActiveTab] = useState("all");

  const deliveries = [
    {
      orderID: "764",
      payment: "Tocipopas x 7",
      product: "Product Image",
      trackingNumber: "DB7YTE",
      status: "in transit",
      orderDate: "MAY 11, 2023, 04:30 PM",
    },
    {
      orderID: "765",
      payment: "Tocipopas x 3",
      product: "Product Image",
      trackingNumber: "DB8YTE",
      status: "delivered",
      orderDate: "JUNE 5, 2023, 10:00 AM",
    },
    {
      orderID: "766",
      payment: "Tocipopas x 1",
      product: "Product Image",
      trackingNumber: "DB9YTE",
      status: "pending",
      orderDate: "JULY 2, 2023, 01:30 PM",
    },
    // Add more delivery data here
  ];

  const handleViewAll = () => {
    setActiveTab("all");
  };

  return (
    <div className="flex flex-col items-center mt-8">
      <div className="flex justify-between w-full mb-4">
        <h2 className="text-2xl font-bold">Deliveries</h2>
        <button
          onClick={handleViewAll}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-sm"
        >
          View All
        </button>
      </div>
      <div className="flex space-x-4 mb-4">
        <button
          onClick={() => setActiveTab("pending")}
          className={`px-4 py-2 rounded-lg ${
            activeTab === "pending"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          Pending
        </button>
        <button
          onClick={() => setActiveTab("in transit")}
          className={`px-4 py-2 rounded-lg ${
            activeTab === "in transit"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          In Transit
        </button>
        <button
          onClick={() => setActiveTab("delivered")}
          className={`px-4 py-2 rounded-lg ${
            activeTab === "delivered"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          Delivered
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        {deliveries
          .filter(
            (delivery) => activeTab === "all" || delivery.status === activeTab
          )
          .map((delivery, index) => (
            <DeliveryCard key={index} {...delivery} />
          ))}
      </div>
    </div>
  );
}

// Dashboard component code
export default function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showDeliveryConfirmation, setShowDeliveryConfirmation] =
    useState(false);
  const [data, setData] = useState({
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Deliveries Over Time",
        data: [12, 19, 3, 5, 2, 3, 9],
        borderColor: "#4F46E5",
        backgroundColor: "rgba(79, 70, 229, 0.1)",
      },
    ],
  });

  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    fetch("/api/deliveries-data")
      .then((response) => response.json())
      .then((fetchedData) => {
        if (fetchedData && fetchedData.datasets) {
          setData(fetchedData);
        } else {
          console.error("Fetched data is missing datasets");
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  return (
    <div className="relative min-h-screen bg-gray-100 p-6">
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 w-64 h-full bg-white shadow-lg transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 z-40`}
      >
        <div className="bg-blue-600 text-white p-4 flex items-center justify-between">
          <span className="text-2xl font-bold">Dashboard</span>
          <button onClick={() => setIsSidebarOpen(false)} className="text-2xl">
            &times;
          </button>
        </div>

        <nav className="mt-6">
          <ul className="space-y-4 px-4">
            <li>
              <Link
                to="/manage-deliveries"
                className="flex items-center text-lg text-gray-700 hover:text-blue-600 hover:bg-gray-100 p-2 rounded transition"
              >
                <i className="fas fa-box mr-3"></i> Manage Deliveries
              </Link>
            </li>
            <li>
              <Link
                to="/communication-tools"
                className="flex items-center text-lg text-gray-700 hover:text-blue-600 hover:bg-gray-100 p-2 rounded transition"
              >
                <i className="fas fa-comments mr-3"></i> Communication Tools
              </Link>
            </li>
            <li>
              <Link
                to="/agent-login"
                className="flex items-center text-lg text-gray-700 hover:text-blue-600 hover:bg-gray-100 p-2 rounded transition"
              >
                <i className="fas fa-sign-in-alt mr-3"></i> Login
              </Link>
            </li>
            <li>
              <Link
                to="/agent-register"
                className="flex items-center text-lg text-gray-700 hover:text-blue-600 hover:bg-gray-100 p-2 rounded transition"
              >
                <i className="fas fa-user-plus mr-3"></i> Register
              </Link>
            </li>
            <li>
              <Link
                to="/agent-profile"
                className="flex items-center text-lg text-gray-700 hover:text-blue-600 hover:bg-gray-100 p-2 rounded transition"
              >
                <i className="fas fa-user mr-3"></i> Profile
              </Link>
            </li>
            <li>
              <button
                onClick={() => navigate("/dashboard")}
                className="flex items-center text-lg text-gray-700 hover:text-blue-600 hover:bg-gray-100 p-2 rounded transition"
              >
                <i className="fas fa-home mr-3"></i> Go to Dashboard
              </button>
            </li>
            <li>
              <button
                onClick={() => navigate("/add-delivery")}
                className="flex items-center text-lg text-gray-700 hover:text-blue-600 hover:bg-gray-100 p-2 rounded transition"
              >
                <i className="fas fa-plus mr-3"></i> Create New Delivery
              </button>
            </li>
            <li>
              <button
                onClick={() => navigate("/update-parcel-status")}
                className="flex items-center text-lg text-gray-700 hover:text-blue-600 hover:bg-gray-100 p-2 rounded transition"
              >
                <i className="fas fa-edit mr-3"></i> Update Parcel Status
              </button>
            </li>
            <li>
              <button
                onClick={() => setShowDeliveryConfirmation(true)}
                className="flex items-center text-lg text-gray-700 hover:text-blue-600 hover:bg-gray-100 p-2 rounded transition"
              >
                <i className="fas fa-check-circle mr-3"></i> Confirm Delivery
              </button>
            </li>
          </ul>
        </nav>
        <button
          onClick={() => navigate("/dashboard")}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md mb-6 mx-4 absolute bottom-4 left-4"
        >
          Back
        </button>
      </div>

      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="fixed top-6 left-6 bg-yellow-300 text-white p-3 rounded-full shadow-lg hover:bg-yellow-400 transition"
      >
        ☰
      </button>

      <div className="max-w-6xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <header className="flex items-center justify-center mb-6">
          <h1 className="text-4xl font-bold text-gray-900">Agent Dashboard</h1>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 flex flex-col items-center">
            <i className="fas fa-truck text-2xl text-gray-500 mb-2"></i>
            <h3 className="text-xl font-semibold text-gray-800">
              Total Deliveries
            </h3>
            <p className="text-3xl font-bold text-gray-900">125</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 flex flex-col items-center">
            <i className="fas fa-check-circle text-2xl text-green-500 mb-2"></i>
            <h3 className="text-xl font-semibold text-gray-800">Delivered</h3>
            <p className="text-3xl font-bold text-gray-900">51</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 flex flex-col items-center">
            <i className="fas fa-clock text-2xl text-yellow-500 mb-2"></i>
            <h3 className="text-xl font-semibold text-gray-800">
              Pending Deliveries
            </h3>
            <p className="text-3xl font-bold text-gray-900">3</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 flex flex-col items-center">
            <i className="fas fa-shipping-fast text-2xl text-blue-500 mb-2"></i>
            <h3 className="text-xl font-semibold text-gray-800">In Transit</h3>
            <p className="text-3xl font-bold text-gray-900">3</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md mb-8 border border-gray-200">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Deliveries Over Time
          </h3>
          <Line data={data} options={{ responsive: true }} />
        </div>

        <Deliveries />
      </div>

      {showDeliveryConfirmation && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg relative w-full max-w-lg">
            <button
              onClick={() => setShowDeliveryConfirmation(false)}
              className="absolute top-4 right-4 text-2xl text-gray-700"
            >
              &times;
            </button>
            <DeliveryConfirmation />
          </div>
        </div>
      )}
    </div>
  );
}
