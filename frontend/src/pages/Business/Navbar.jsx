import React, { useContext } from "react";
import ViewProfile from "../Seller/ViewProfile";
import { UserContext } from "../../Context/UserContext";
import { FaBars } from "react-icons/fa";

function Navbar({ toggleSidebar }) {
  const { currentUser } = useContext(UserContext);

  return (
    <nav className="bg-yellow-500 p-4 shadow-lg flex items-center justify-between">
      <div className="flex items-center">
        <button
          onClick={toggleSidebar}
          className="text-2xl text-white focus:outline-none lg:hidden mr-4"
        >
          <FaBars />
        </button>
        <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-black">
          Business Dashboard
        </h1>
      </div>
      <div className="flex items-center space-x-4">
        {currentUser && (
          <span className="text-black font-semibold hidden md:inline">
            Welcome, {currentUser.name}
          </span>
        )}
        <ViewProfile />
      </div>
    </nav>
  );
}

export default Navbar;
