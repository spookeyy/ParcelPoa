/* eslint-disable react/prop-types */
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import {
  FaUsers,
  FaUserPlus,
  FaBuilding,
  FaMapMarkerAlt,
  FaTachometerAlt,
  FaBars,
  FaSignOutAlt,
} from "react-icons/fa";
import Logo from "../../assets/Logo.png";
import { UserContext } from "../../Context/UserContext";

function Sidebar({ isOpen, toggleSidebar }) {
  const { currentUser, logout } = useContext(UserContext);
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

    // { title: "Logout", icon: <FaSignOutAlt className="text-black mr-3"/>, link: "/admin/logout" },
  ];

  const logoutbtn = [
    { title: "Logout", icon: <FaSignOutAlt className="text-black mr-3"/>, link: "/admin/logout" },
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
            className="h-16 w-16 mx-auto mb-5 mt-[-20px] ml-[20px]"
            src={Logo}
            alt="Logo"
          />
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
        <div className="absolute bottom-0 left-0 p-5">
          <div
            className="flex items-center p-3 mb-2 rounded hover:bg-yellow-600
            transition-colors duration-200 hover:cursor-pointer"
            onClick={handleLogout}
          >
            <span>{logoutbtn[0].icon}</span>
            <span className="pr-28">{logoutbtn[0].title}</span>
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