import React from "react";
import { useNavigate } from "react-router-dom";
import { FaCalendarAlt, FaBox, FaMapMarkerAlt, FaUsers } from "react-icons/fa";

function BusinessDashboard() {
  const navigate = useNavigate();

  const dashboardItems = [
    {
      title: "Create Order",
      icon: <FaCalendarAlt className="text-yellow-500 text-4xl mb-4" />,
      link: "/business/schedule-pickup",
    },
    {
      title: "Order Management",
      icon: <FaBox className="text-yellow-500 text-4xl mb-4" />,
      link: "/business/orders",
    },
    {
      title: "Parcel Tracking",
      icon: <FaMapMarkerAlt className="text-yellow-500 text-4xl mb-4" />,
      link: "/business/parcel-tracking",
    },
    {
      title: "Agents",
      icon: <FaUsers className="text-yellow-500 text-4xl mb-4" />,
      link: "/business/agents",
    },
  ];

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-center">
        {/* Business Dashboard */}
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {dashboardItems.map((item, index) => (
          <button
            key={index}
            onClick={() => navigate(item.link)}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col items-center justify-center"
          >
            {item.icon}
            <h3 className="text-xl font-semibold text-gray-800">
              {item.title}
            </h3>
          </button>
        ))}
      </div>
    </div>
  );
}

export default BusinessDashboard;
