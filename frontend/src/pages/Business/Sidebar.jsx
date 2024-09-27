import React, { useContext } from "react";
import { Link } from "react-router-dom";
import {
  FaTachometerAlt,
  FaCalendarAlt,
  FaBox,
  FaMapMarkerAlt,
  FaUsers,
  FaBars,
  FaSignOutAlt,
} from "react-icons/fa";
import Logo from "../../assets/Logo.png";
import { UserContext } from "../../Context/UserContext";

function Sidebar({ isOpen, toggleSidebar }) {
  const { logout } = useContext(UserContext);

  const sidebarItems = [
    {
      title: "Dashboard",
      icon: <FaTachometerAlt />,
      link: "/business/dashboard",
    },
    {
      title: "Schedule Pickup",
      icon: <FaCalendarAlt />,
      link: "/business/schedule-pickup",
    },
    { title: "Order Management", icon: <FaBox />, link: "/business/orders" },
    {
      title: "Parcel Tracking",
      icon: <FaMapMarkerAlt />,
      link: "/business/parcel-tracking",
    },
    { title: "Agents", icon: <FaUsers />, link: "agents" },
  ];

  const handleLogout = () => {
    logout();
  };

  return (
    <>
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-yellow-500 text-white transition-transform duration-300 ease-in-out transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 z-30`}
      >
        <div className="p-5">
          <img
            className="h-20 w-20 mx-auto mb-5 mt-[-20px] ml-[-10px]"
            src={Logo}
            alt="Logo"
          />
          {sidebarItems.map((item, index) => (
            <Link
              key={index}
              to={item.link}
              className="flex items-center p-3 mb-2 rounded hover:bg-yellow-600 transition-colors duration-200"
            >
              <span className="mr-3 bg-gray-600 text-white rounded p-2">{item.icon}</span>
              <span className="text-black font-semibold">{item.title}</span>
            </Link>
          ))}
        </div>
        <div className="absolute bottom-0 left-0 p-5 w-full">
          <div
            className="flex items-center p-3 mb-2 rounded hover:bg-yellow-600
            transition-colors duration-200 hover:cursor-pointer"
            onClick={handleLogout}
          >
            <span className="mr-3 bg-red-600 text-white rounded p-2">
              <FaSignOutAlt />
            </span>
            <span className="text-black font-semibold">Logout</span>
          </div>
        </div>
      </div>
      <button
        onClick={toggleSidebar}
        className="fixed top-4 left-4 z-40 text-2xl text-white focus:outline-none lg:hidden"
      >
        <FaBars />
      </button>
    </>
  );
}

export default Sidebar;
