import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "../../components/Navbar";

const PickupStationLayout = () => {
  return (
    <div className="bg-white min-h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-grow">
        <Sidebar />
        <main className="flex-grow p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default PickupStationLayout;
