import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import DeliveryConfirmation from './DeliveryConfirmation'; // Import the component

export default function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showDeliveryConfirmation, setShowDeliveryConfirmation] = useState(false);
  const [data, setData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Deliveries Over Time',
        data: [],
        borderColor: '#4F46E5',
        backgroundColor: 'rgba(79, 70, 229, 0.1)',
      },
    ],
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Replace with your data fetching logic
        const fetchedData = {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
          datasets: [
            {
              label: 'Deliveries Over Time',
              data: [65, 59, 80, 81, 56],
              borderColor: '#4F46E5',
              backgroundColor: 'rgba(79, 70, 229, 0.1)',
            },
          ],
        };
        if (fetchedData && fetchedData.datasets) {
          setData(fetchedData);
        } else {
          console.error('Fetched data is missing datasets');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="relative min-h-screen bg-gray-100 p-6">
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 w-64 h-full bg-white shadow-lg transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300`}
      >
        <button
          onClick={() => setIsSidebarOpen(false)}
          className="absolute top-4 right-4 text-2xl"
        >
          &times;
        </button>
        
        <nav className="mt-16">
          <ul className="space-y-4 px-4">
            {/* Add icons here */}
            <li>
              <Link to="/manage-deliveries" className="flex items-center text-lg text-gray-700 hover:text-blue-600">
                <i className="fas fa-box"></i> Manage Deliveries
              </Link>
            </li>
            <li>
              <Link to="/communication-tools" className="flex items-center text-lg text-gray-700 hover:text-blue-600">
                <i className="fas fa-comments"></i> Communication Tools
              </Link>
            </li>
            <li>
              <Link to="/agent-login" className="flex items-center text-lg text-gray-700 hover:text-blue-600">
                <i className="fas fa-sign-in-alt"></i> Login
              </Link>
            </li>
            <li>
              <Link to="/agent-register" className="flex items-center text-lg text-gray-700 hover:text-blue-600">
                <i className="fas fa-user-plus"></i> Register
              </Link>
            </li>
            <li>
              <button
                onClick={() => navigate('/dashboard')}
                className="flex items-center text-lg text-gray-700 hover:text-blue-600"
              >
                <i className="fas fa-home"></i> Go to Dashboard
              </button>
            </li>
            {/* Other items */}
          </ul>
        </nav>
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="bg-blue-500 text-white px-4 py-2 rounded shadow mb-6 mx-4"
        >
          Back
        </button>
      </div>

      {/* Toggle Button */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="fixed top-6 right-6 bg-yellow-300 text-white p-3 rounded-full shadow-lg hover:bg-blue-600 transition"
      >
        ☰
      </button>

      {/* Dashboard Content */}
      <div className={`p-6 ${isSidebarOpen ? 'ml-64' : ''}`}>
        <div className="max-w-4xl mx-auto bg-white p-6 rounded shadow">
          <header className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold">Delivery Agent Dashboard</h1>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/add-delivery')}
                className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600"
              >
                Create New Delivery
              </button>
              <button
                onClick={() => navigate('/update-parcel-status')}
                className="bg-green-500 text-white px-4 py-2 rounded shadow hover:bg-green-600"
              >
                Update Parcel Status
              </button>
              <button
                onClick={() => setShowDeliveryConfirmation(true)}
                className="bg-yellow-500 text-white px-4 py-2 rounded shadow hover:bg-yellow-600"
              >
                Confirm Delivery
              </button>
            </div>
          </header>

          {/* Overview Widgets */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded shadow">
              <h3 className="text-xl font-semibold">Total Deliveries</h3>
              <p className="text-2xl">125</p>
            </div>
            <div className="bg-white p-6 rounded shadow">
              <h3 className="text-xl font-semibold">Pending Requests</h3>
              <p className="text-2xl">32</p>
            </div>
            <div className="bg-white p-6 rounded shadow">
              <h3 className="text-xl font-semibold">Recent Activities</h3>
              <ul className="list-disc list-inside ml-4">
                <li>Delivery #123 updated status</li>
                <li>New request received from Business X</li>
              </ul>
            </div>
          </div>

          {/* Data Visualization */}
          <div className="bg-white p-6 rounded shadow mb-8">
            <h3 className="text-xl font-semibold mb-4">Deliveries Over Time</h3>
            <Line data={data} options={{ responsive: true }} />
          </div>

          {/* Detailed Sections */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Key Features</h2>
            <ul className="list-disc list-inside ml-6 space-y-2">
              <li className="bg-gray-100 p-4 shadow rounded hover:bg-gray-200">
                <Link to="/manage-deliveries" className="text-lg font-medium text-gray-700">Manage Deliveries</Link>
                <p className="text-gray-600">An efficient portal for managing deliveries and updating parcel statuses.</p>
              </li>
              {/* Other items */}
            </ul>
          </div>

          <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">Enhanced Features</h2>
            <ul className="list-disc list-inside ml-6 space-y-2">
              <li className="bg-gray-100 p-4 shadow rounded hover:bg-gray-200">
                <Link to="/dashboard-overview" className="text-lg font-medium text-gray-700">Dashboard Overview</Link>
                <p className="text-gray-600">Access a dashboard to view and manage all assigned deliveries.</p>
              </li>
              {/* Other items */}
            </ul>
          </div>
        </div>
      </div>

      {/* Delivery Confirmation Form */}
      {showDeliveryConfirmation && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-md relative w-full max-w-lg">
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
