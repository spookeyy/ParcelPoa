import React from "react";
import { Link, Outlet } from "react-router-dom";
import {
  FaUsers,
  FaUserPlus,
  FaBuilding,
  FaMapMarkerAlt,
  FaTachometerAlt,
} from "react-icons/fa";

function AdminDashboard() {
  const dashboardItems = [
    { title: "Dashboard", icon: <FaTachometerAlt />, link: "/admin/dashboard" },
    { title: "Agents", icon: <FaUsers />, link: "/admin/agents" },
    { title: "Agent Requests", icon: <FaUserPlus />, link: "/admin/requests" },
    { title: "Businesses", icon: <FaBuilding />, link: "/admin/businesses" },
    {
      title: "Pickup Stations",
      icon: <FaMapMarkerAlt />,
      link: "/admin/pickup-stations",
    },
  ];

  return (
    <div>
      <div className="p-6 bg-gray-100 min-h-screen">
        <h1 className="text-3xl font-bold mb-8 text-gray-800 text-center">
          Admin Dashboard
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dashboardItems.map((item, index) => (
            <Link
              key={index}
              to={item.link}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col items-center justify-center"
            >
              <div className="text-4xl mb-4 text-yellow-500">{item.icon}</div>
              <h2 className="text-xl font-semibold text-gray-700">
                {item.title}
              </h2>
            </Link>
          ))}
        </div>
      </div>

      <Outlet />
    </div>
  );
}

export default AdminDashboard;
