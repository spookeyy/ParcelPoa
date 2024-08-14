import React, { useContext, useState } from "react";
import ViewProfile from "../Seller/ViewProfile";
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
    <header className="bg-yellow-600 p-2 md:p-3 shadow-lg flex flex-col md:flex-row items-center justify-between rounded-lg border border-gray-300 top-0 left-0 right-0">
      <div className="flex items-center w-full md:w-auto justify-between md:justify-start mb-2 md:mb-0 sm:ml-4">
        <img
          src={Logo}
          alt="Logo"
          className="h-10 w-10 md:h-12 md:w-12 lg:h-16 lg:w-16 rounded-full border-2 border-yellow-300 bg-gradient-to-br from-yellow-200 to-yellow-600 cursor-pointer mr-2 md:mr-4 lg:mr-6 transition-transform transform hover:scale-105"
          onClick={() => navigate("/")}
        />
        <div className="md:hidden cursor-pointer sm:ml-4">
          <ViewProfile />
        </div>
      </div>

      <div className="w-full md:flex-1 text-center mb-2 md:mb-0 sm:ml-4 md:ml-0 sm:text-left md:text-left lg:text-center">
        <h1 className="text-xl lg:mt-[0px] lg:ml-28 sm:ml-2 mt-[-40px] md:text-2xl sm:text-xl sm:ml-0 md:text-xl lg:text-3xl font-bold text-black py-1 px-2 ">
          Business Dashboard
        </h1>
      </div>

      <div className="flex items-center space-x-2 md:space-x-4">
        <Link
          to="/business/dashboard"
          className="text-black hover:text-white hover:underline text-sm md:text-base font-semibold transition-colors active:text-white"
        >
          Dashboard
        </Link>
        <Link
          to="/seller/agents"
          className="text-black hover:text-white hover:underline text-sm md:text-base font-semibold transition-colors"
        >
          Agents List
        </Link>
        <div className="hidden md:block cursor-pointer">
          <ViewProfile />
        </div>
      </div>

      {/* Render the SellerProfile modal when showProfile is true */}
      {showProfile && <SellerProfile onClose={handleCloseProfile} />}
    </header>
  );
}

export default Header;
