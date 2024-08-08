import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import SellerSidebar from "../pages/Seller/SellerSidebar";

export default function Header() {
  const navigate = useNavigate();

  return (
    <header className="bg-indigo-200 fixed top-0 left-0 right-0 z-10 shadow-lg py-3 ">
      <div className="container mx-auto flex justify-between items-center position sticky">
        <Link to="/" className="flex items-center">
          <img src="/src/assets/Logo.png" alt="Logo" className="h-10 w-10" />
        </Link>
        <div className="flex space-x-4 items-center text-sm">
          <Link to="/seller" className="text-blue-700 hover:text-indigo-800 text-medium transition-colors">
            Dashboard
          </Link>
         
          <Link to="/business/dashboard" className="text-blue-700 hover:text-indigo-800 text-medium transition-colors">
            Business Dashboard
          </Link>
          <div className="inline-block">
            <SellerSidebar />
          </div>
        </div>
      </div>
    </header>
  );
}



// import React from "react";
// import { Link } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faReceipt,
//   faUser,
//   faInfoCircle,
// } from "@fortawesome/free-solid-svg-icons";

// export default function Header() {
//   return (
//     <header className="bg-gray-600 text-white shadow-lg rounded-lg mt-0.5 ml-1 mr-1">
//       <div className="container px-4 flex items-center justify-between py-4 mx-auto">
//         <Link to="/" className="flex items-center">
//           <img src="/src/assets/Logo.png" alt="Logo" className="logo" />
//         </Link>
//         <div className="flex space-x-4 items-center">
          
//           {/* Orders */}
//           <Link
//             to="/order-list"
//             className="text-white hover:text-blue-700 transition-colors"
//           >
//             <FontAwesomeIcon icon={faReceipt} className="h-8 w-8" />
//           </Link>

//           {/* General Information */}
//           <Link
//             to="dashboard-part"
//             className="text-white hover:text-blue-700 transition-colors"
//           >
//             <FontAwesomeIcon icon={faInfoCircle} className="h-8 w-8" />
//           </Link>

//           {/* Login Button */}
//           <Link
//             to="/business/dashboard"
//             className="text-white hover:text-blue-700 transition-colors"
//           >
//             <FontAwesomeIcon icon={faUser} className="h-8 w-8" />
//           </Link>

//           {/* Login Button */}
//           <Link
//             to="/seller/seller-profile"
//             className="text-white hover:text-blue-700 transition-colors"
//           >
//             <FontAwesomeIcon icon={faUser} className="h-8 w-8" />
//           </Link>
//         </div>
//       </div>
//     </header>
//   );
// }
