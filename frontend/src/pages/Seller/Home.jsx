import React from "react";
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine, faShoppingCart, faDollarSign, faClock } from '@fortawesome/free-solid-svg-icons';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function Home() {
  // Sample data for the dashboard
  const salesTrend = {
    title: "Sales Trend",
    value: "$12,345",
    description: "Track the trend of sales over time",
    icon: faChartLine,
  };

  const numberOfOrders = {
    title: "Total Orders",
    value: "1,234",
    description: "Number of orders processed",
    icon: faShoppingCart,
  };

  const totalSales = {
    title: "Total Sales",
    value: "$98,765",
    description: "Total revenue generated",
    icon: faDollarSign,
  };

  const totalPending = {
    title: "Pending Orders",
    value: "56",
    description: "Number of orders pending delivery",
    icon: faClock,
  };

  // Sample data for the graph
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Sales Over Time',
        data: [10, 20, 15, 25, 30, 20, 35],
        fill: false,
        borderColor: '#3b82f6',
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `${context.dataset.label}: $${context.raw}`;
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Month',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Sales ($)',
        },
      },
    },
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-gray-200">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {/* Sales Trend Card */}
        <div className="bg-white p-4 shadow-lg rounded-lg flex flex-col items-center text-center space-y-4">
          <FontAwesomeIcon icon={salesTrend.icon} className="text-4xl text-blue-500" />
          <div>
            <h2 className="text-lg sm:text-xl font-semibold mb-1">{salesTrend.title}</h2>
            <p className="text-xl sm:text-2xl font-bold mb-1">{salesTrend.value}</p>
            <p className="text-gray-600 text-sm sm:text-base">{salesTrend.description}</p>
          </div>
        </div>
        {/* Total Orders Card */}
        <div className="bg-white p-4 shadow-lg rounded-lg flex flex-col items-center text-center space-y-4">
          <FontAwesomeIcon icon={numberOfOrders.icon} className="text-4xl text-green-500" />
          <div>
            <h2 className="text-lg sm:text-xl font-semibold mb-1">{numberOfOrders.title}</h2>
            <p className="text-xl sm:text-2xl font-bold mb-1">{numberOfOrders.value}</p>
            <p className="text-gray-600 text-sm sm:text-base">{numberOfOrders.description}</p>
          </div>
        </div>
        {/* Total Sales Card */}
        <div className="bg-white p-4 shadow-lg rounded-lg flex flex-col items-center text-center space-y-4">
          <FontAwesomeIcon icon={totalSales.icon} className="text-4xl text-yellow-500" />
          <div>
            <h2 className="text-lg sm:text-xl font-semibold mb-1">{totalSales.title}</h2>
            <p className="text-xl sm:text-2xl font-bold mb-1">{totalSales.value}</p>
            <p className="text-gray-600 text-sm sm:text-base">{totalSales.description}</p>
          </div>
        </div>
        {/* Pending Orders Card */}
        <div className="bg-white p-4 shadow-lg rounded-lg flex flex-col items-center text-center space-y-4">
          <FontAwesomeIcon icon={totalPending.icon} className="text-4xl text-red-500" />
          <div>
            <h2 className="text-lg sm:text-xl font-semibold mb-1">{totalPending.title}</h2>
            <p className="text-xl sm:text-2xl font-bold mb-1">{totalPending.value}</p>
            <p className="text-gray-600 text-sm sm:text-base">{totalPending.description}</p>
          </div>
        </div>
      </div>
      {/* Graph Section */}
      <div className="mt-8">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold mb-4">Sales Trends</h2>
        <div className="bg-white p-4 shadow-lg rounded-lg">
          <Line data={data} options={options} />
        </div>
      </div>
    </div>
  );
}

export default Home;
