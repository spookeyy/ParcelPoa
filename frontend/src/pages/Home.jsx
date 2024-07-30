import React from "react";
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

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
  };

  const numberOfOrders = {
    title: "Total Orders",
    value: "1,234",
    description: "Number of orders processed",
  };

  const totalSales = {
    title: "Total Sales",
    value: "$98,765",
    description: "Total revenue generated",
  };

  const totalPending = {
    title: "Pending Orders",
    value: "56",
    description: "Number of orders pending delivery",
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
    <>
     
      <div className="p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Sales Trend Card */}
          <div className="bg-white p-4 shadow-lg rounded-lg">
            <h2 className="text-xl font-semibold mb-2">{salesTrend.title}</h2>
            <p className="text-3xl font-bold mb-2">{salesTrend.value}</p>
            <p className="text-gray-600">{salesTrend.description}</p>
          </div>
          {/* Total Orders Card */}
          <div className="bg-white p-4 shadow-lg rounded-lg">
            <h2 className="text-xl font-semibold mb-2">{numberOfOrders.title}</h2>
            <p className="text-3xl font-bold mb-2">{numberOfOrders.value}</p>
            <p className="text-gray-600">{numberOfOrders.description}</p>
          </div>
          {/* Total Sales Card */}
          <div className="bg-white p-4 shadow-lg rounded-lg">
            <h2 className="text-xl font-semibold mb-2">{totalSales.title}</h2>
            <p className="text-3xl font-bold mb-2">{totalSales.value}</p>
            <p className="text-gray-600">{totalSales.description}</p>
          </div>
          {/* Pending Orders Card */}
          <div className="bg-white p-4 shadow-lg rounded-lg">
            <h2 className="text-xl font-semibold mb-2">{totalPending.title}</h2>
            <p className="text-3xl font-bold mb-2">{totalPending.value}</p>
            <p className="text-gray-600">{totalPending.description}</p>
          </div>
        </div>
        {/* Graph Section */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Sales Trends</h2>
          <div className="bg-white p-4 shadow-lg rounded-lg">
            <Line data={data} options={options} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
