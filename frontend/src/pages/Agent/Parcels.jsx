import React, { useState, useEffect, useContext } from "react";
import { server } from "../../../config.json";
import { UserContext } from "../../Context/UserContext";
import ParcelCard from "./ParcelCard";

export default function Parcels() {
  const [parcels, setParcels] = useState([]);
  const { authToken } = useContext(UserContext);
  const [activeFilter, setActiveFilter] = useState("all");

  useEffect(() => {
    if (!authToken) {
      console.error("No JWT token found");
      return;
    }

    fetch(`${server}/agent_parcels`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    })
      .then((response) => {
        if (response.status === 422) {
          return response.json().then((errorData) => {
            throw new Error(
              `Unprocessable Entity: ${JSON.stringify(errorData)}`
            );
          });
        }
        if (!response.ok) {
          throw new Error("Failed to fetch parcels");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Fetched parcels data:", data);
        setParcels(data);
      })
      .catch((error) => {
        console.error("Error fetching parcels:", error);
      });
  }, [authToken]);

  const filteredParcels = parcels.filter(
    (parcel) => activeFilter === "all" || parcel.status === activeFilter
  );

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg mb-8 border border-gray-200">
      <h3 className="text-3xl font-semibold text-gray-900 mb-6 text-center sm:text-left">
        Parcels
      </h3>
      <div className="flex flex-wrap gap-4 mb-6 justify-center sm:justify-start">
        {[
          "all",
          "Scheduled for Pickup",
          "Picked Up",
          "Out for Delivery",
          "In Transit",
          "Delivered",
          "Cancelled",
        ].map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-5 py-2 rounded-full font-medium text-sm sm:text-base transition duration-300 ease-in-out ${
              activeFilter === filter
                ? "bg-blue-600 text-white shadow-lg"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredParcels.map((parcel) => (
          <ParcelCard key={parcel.parcel_id} parcel={parcel} />
        ))}
      </div>
    </div>
  );
}
