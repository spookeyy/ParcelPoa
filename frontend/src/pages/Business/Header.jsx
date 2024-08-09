import React, { useContext } from 'react'
import SellerSidebar from "../Seller/SellerSidebar";
import Logo from "../../assets/Logo.png";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";

function Header() {

    const { currentUser } = useContext(UserContext);
    const navigate = useNavigate(); 


  return (
    <header className="bg-white p-1 shadow-lg flex items-center rounded-lg border border-gray-300">
      <img
        src={Logo}
        alt="Logo"
        className="h-12 w-12 lg:h-16 lg:w-16 rounded-full border-2 border-yellow-300 bg-gradient-to-br from-yellow-200 to-yellow-600 cursor-pointer mr-4 lg:mr-6 transition-transform transform hover:scale-105"
        onClick={() => navigate("/")}
      />
      <div className="flex-1 text-center">
        <h1 className="text-3xl lg:text-3xl font-extrabold bg-gradient-to-br from-yellow-200 to-yellow-600 text-transparent bg-clip-text py-2 px-4">
          Business Dashboard
        </h1>
        {currentUser && (
          <p className="bg-gradient-to-br from-yellow-200 to-yellow-600 text-transparent bg-clip-text mt-2 text-xl lg:text-xl">
            Welcome, {currentUser.name}
          </p>
        )}
      </div>
      <div className="flex items-center space-x-4">
        <Link
          to="/business/dashboard"
          className="bg-gradient-to-br from-yellow-200 to-yellow-600 text-transparent bg-clip-text hover:bg-yellow-600 text-medium transition-colors"
        >
          Dashboard
        </Link>
        <Link
          to="/seller/agents"
          className="bg-gradient-to-br from-yellow-200 to-yellow-600 text-transparent bg-clip-text hover:bg-yellow-600 text-medium transition-colors"
        >
          Agents List
        </Link>
        <SellerSidebar />
      </div>
    </header>
  );
}

export default Header