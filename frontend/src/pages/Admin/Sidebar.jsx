import React, { useContext } from "react";
import { Link } from "react-router-dom";
import {
  FaUsers,
  FaUserPlus,
  FaBuilding,
  FaMapMarkerAlt,
  FaTachometerAlt,
  FaSignOutAlt,
} from "react-icons/fa";
import Logo from "../../assets/Logo.png";
import { UserContext } from "../../Context/UserContext";

function Sidebar({ isOpen, toggleSidebar }) {
  const { logout } = useContext(UserContext);

  const sidebarItems = [
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

  const handleLogout = () => {
    logout();
  };

  return (
    <div
      className={`${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } transform fixed z-30 inset-y-0 left-0 w-64 bg-yellow-500 text-white transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 flex flex-col h-full`}
    >
      <div className="p-5 flex-grow">
        <img className="h-16 w-16 mx-auto mb-4" src={Logo} alt="Logo" />
        {sidebarItems.map((item, index) => (
          <Link
            key={index}
            to={item.link}
            className="flex items-center p-3 mb-2 rounded hover:bg-yellow-600 transition-colors duration-200"
          >
            <span className="mr-3">{item.icon}</span>
            <span>{item.title}</span>
          </Link>
        ))}
      </div>
      <div className="p-5">
        <div
          className="flex items-center p-3 mb-2 rounded hover:bg-yellow-600 transition-colors duration-200 hover:cursor-pointer"
          onClick={handleLogout}
        >
          <FaSignOutAlt className="mr-3" />
          <span>Logout</span>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
