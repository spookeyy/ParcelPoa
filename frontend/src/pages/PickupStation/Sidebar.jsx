import React from "react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();

  const navItems = [
    { path: "/pickup-station/dashboard", label: "Dashboard" },
    { path: "/pickup-station/parcels", label: "Manage Parcels" },
    // { path: "/pickup-station/status", label: "Update Status" },
  ];

  return (
    <aside className="bg-yellow-500 text-white w-64 min-h-screen p-4">
      <nav>
        <ul>
          {navItems.map((item) => (
            <li key={item.path} className="mb-2">
              <Link
                to={item.path}
                className={`block p-2 rounded-lg hover:bg-yellow-600 transition-colors ${
                  location.pathname === item.path ? "bg-yellow-600" : ""
                }`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
