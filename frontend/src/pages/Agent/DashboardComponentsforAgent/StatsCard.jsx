import React from "react";
import { FaChartLine, FaTruck, FaHourglassHalf, FaTruckLoading } from "react-icons/fa";

const iconMap = {
  "fa-chart-line": <FaChartLine />,
  "fa-truck": <FaTruck />,
  "fa-hourglass-half": <FaHourglassHalf />,
  "fa-truck-loading": <FaTruckLoading />
};

export default function StatsCard({ icon, title, count, color }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 flex items-center space-x-4 w-72 h-32">
      <div className={`text-4xl ${color} p-4 bg-gray-100 rounded-full`}>
        {iconMap[icon]}
      </div>
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-1">{title}</h3>
        <p className="text-2xl font-bold text-gray-900">{count}</p>
      </div>
    </div>
  );
}
