import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";
import { UserContext } from "../../Context/UserContext";

const Sidebar = () => {
  const { logout } = useContext(UserContext);
  const location = useLocation();

  const navItems = [
    { path: "/pickup-station/dashboard", label: "Dashboard" },
    { path: "/pickup-station/parcels", label: "Manage Parcels" },
    // { path: "/pickup-station/status", label: "Update Status" },
  ];

  const handleLogout = () => {
    logout();
  };

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
        <div className="absolute bottom-0 left-0 p-5 ">
          <div
            className="flex items-center p-3 mb-2 rounded hover:bg-yellow-600
            transition-colors duration-200 hover:cursor-pointer"
            onClick={handleLogout}
          >
            <span className="mr-3 bg-black text-white rounded p-2">
              <FaSignOutAlt />
            </span>
            <span className="text-black font-semibold">Logout</span>
          </div>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
