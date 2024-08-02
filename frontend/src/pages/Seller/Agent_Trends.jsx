import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// Sample data to simulate API response or database content
const agentData = {
  '1': {
    profileImage: 'https://via.placeholder.com/150',
    name: 'John Doe',
    contact: 'johndoe@example.com',
    phone: '+1234567890',
    address: '123 Main St, Springfield',
    deliveries: 5,
    successRate: 80, // Changed to number for chart purposes
    recentActivities: [
      'Completed delivery to 123 Main St',
      'Scheduled meeting with client',
      'Received positive feedback'
    ],
  },
  '2': {
    profileImage: 'https://via.placeholder.com/150',
    name: 'Jane Smith',
    contact: 'janesmith@example.com',
    phone: '+0987654321',
    address: '456 Elm St, Springfield',
    deliveries: 8,
    successRate: 90, // Changed to number for chart purposes
    recentActivities: [
      'Completed delivery to 456 Elm St',
      'Updated client information',
      'Received new delivery request'
    ],
  },
  // Add more sample agents as needed
};

export default function AgentTrends() {
  const { id } = useParams();
  const [agent, setAgent] = useState(null);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [review, setReview] = useState('');

  useEffect(() => {
    setAgent(agentData[id] || null);
  }, [id]);

  const handleReviewChange = (e) => {
    setReview(e.target.value);
  };

  const handleReviewSubmit = () => {
    // Handle review submission (e.g., send to API or database)
    console.log('Review submitted:', review);
    setReview('');
    setShowReviewForm(false);
  };

  if (!agent) {
    return <div className="p-6 text-center text-gray-500">Loading agent data...</div>;
  }

  // Chart Data
  const chartData = {
    labels: ['Deliveries', 'Success Rate'],
    datasets: [
      {
        label: 'Performance Metrics',
        data: [agent.deliveries, agent.successRate],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function(tooltipItem) {
            if (tooltipItem.label === 'Success Rate') {
              return `Success Rate: ${tooltipItem.raw}%`;
            }
            return `${tooltipItem.label}: ${tooltipItem.raw}`;
          },
        },
      },
    },
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value) {
            if (Number.isInteger(value)) {
              return value;
            }
          },
        },
      },
    },
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-semibold mb-6 border-b border-gray-200 pb-2">Agent Trends</h1>

      {/* Agent Profile Information */}
      <div className="flex items-center gap-6 mb-8 border-b border-gray-200 pb-6">
        <img 
          src={agent.profileImage} 
          alt={`${agent.name}'s profile`} 
          className="w-32 h-32 rounded-full border border-gray-300 object-cover" 
        />
        <div>
          <h2 className="text-2xl font-bold mb-2">{agent.name}</h2>
          <p className="text-gray-600 mb-1"><strong>Contact:</strong> {agent.contact}</p>
          <p className="text-gray-600 mb-1"><strong>Phone:</strong> {agent.phone}</p>
          <p className="text-gray-600 mb-1"><strong>Address:</strong> {agent.address}</p>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="mb-8 border-b border-gray-200 pb-6">
        <h3 className="text-xl font-semibold mb-3">Performance Metrics</h3>
        <p className="text-gray-700 mb-1"><strong>Total Deliveries:</strong> {agent.deliveries}</p>
        <p className="text-gray-700"><strong>Success Rate:</strong> {agent.successRate}%</p>
      </div>

      {/* Chart */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-3">Performance Chart</h3>
        <Bar data={chartData} options={chartOptions} />
      </div>

      {/* Recent Activities */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-3">Recent Activities</h3>
        <ul className="list-disc list-inside pl-5 text-gray-700">
          {agent.recentActivities.map((activity, index) => (
            <li key={index} className="mb-2">{activity}</li>
          ))}
        </ul>
      </div>

      {/* Review Section */}
      <div className="mt-6">
        <button 
          onClick={() => setShowReviewForm(!showReviewForm)}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
        >
          {showReviewForm ? 'Cancel Review' : 'Add Review'}
        </button>

        {showReviewForm && (
          <div className="mt-4 p-4 border border-gray-300 rounded bg-gray-50">
            <h4 className="text-lg font-semibold mb-2">Submit a Review</h4>
            <textarea
              value={review}
              onChange={handleReviewChange}
              rows="4"
              className="w-full border border-gray-300 rounded p-2 mb-4"
              placeholder="Enter your review here..."
            />
            <button
              onClick={handleReviewSubmit}
              className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition"
            >
              Submit Review
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
