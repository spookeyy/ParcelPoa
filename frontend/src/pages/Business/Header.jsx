import React, { useContext, useState } from "react";
import SellerSidebar from "../Seller/SellerSidebar";
import SellerProfile from "../Seller/SellerPofie";
import Logo from "../../assets/Logo.png";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";

function Header() {
  const { currentUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [showProfile, setShowProfile] = useState(false); 


  // const handleProfileClick = () => {
  //   setShowProfile(true);
  // };

  const handleCloseProfile = () => {
    setShowProfile(false);
  };

  return (
    <header className="bg-yellow-600 p-2 md:p-3 shadow-lg flex flex-col md:flex-row items-center justify-between rounded-lg border border-gray-300">
      <div className="flex items-center w-full md:w-auto justify-between md:justify-start mb-2 md:mb-0">
        <img
          src={Logo}
          alt="Logo"
          className="h-10 w-10 md:h-12 md:w-12 lg:h-16 lg:w-16 rounded-full border-2 border-yellow-300 bg-gradient-to-br from-yellow-200 to-yellow-600 cursor-pointer mr-2 md:mr-4 lg:mr-6 transition-transform transform hover:scale-105"
          onClick={() => navigate("/")}
        />
        <div className="md:hidden">
          <SellerSidebar />
        </div>
      </div>

      <div className="w-full md:flex-1 text-center mb-2 md:mb-0">
        <h1 className="text-xl ml-28 sm:text-2xl sm:ml-0 md:text-2xl lg:text-3xl font-extrabold text-white py-1 px-2">
          Business Dashboard
        </h1>
      </div>

      <div className="flex items-center space-x-2 md:space-x-4">
        <Link
          to="/business/dashboard"
          className="text-white hover:text-yellow-200 text-sm md:text-base font-semibold transition-colors"
        >
          Dashboard
        </Link>
        <Link
          to="/seller/agents"
          className="text-white hover:text-yellow-200 text-sm md:text-base font-semibold transition-colors"
        >
          Agents List
        </Link>
        <div className="hidden md:block cursor-pointer">
          <SellerSidebar />
        </div>
      </div>

      {/* Render the SellerProfile modal when showProfile is true */}
      {showProfile && <SellerProfile onClose={handleCloseProfile} />}
    </header>
  );
}

export default Header;
