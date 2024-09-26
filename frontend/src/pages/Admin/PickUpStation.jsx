/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import { server } from "../../../config.json";

const FilterBar = ({ filters, onFilterChange, onReset }) => (
  <div className="bg-gray-200 p-4 rounded-lg shadow-md mb-6 flex flex-wrap gap-4 items-center">
    <input
      type="text"
      value={filters.name}
      onChange={(e) => onFilterChange("name", e.target.value)}
      className="border rounded-md p-2 text-base w-64"
      placeholder="Filter by name"
      aria-label="Filter by name"
    />
    <input
      type="text"
      value={filters.location}
      onChange={(e) => onFilterChange("location", e.target.value)}
      className="border rounded-md p-2 text-base w-64"
      placeholder="Filter by location"
      aria-label="Filter by location"
    />
    <button
      onClick={onReset}
      className="bg-yellow-300 py-1 px-3 rounded-md text-base hover:bg-yellow-500"
      aria-label="Reset filters"
    >
      Reset Filter
    </button>
  </div>
);

export default function PickUpStations() {
  const [pickUpStations, setPickUpStations] = useState([]);
  const [filters, setFilters] = useState({ name: "", location: "" });

  const fetchPickUpStations = async () => {
    try {
      const response = await fetch(`${server}/users`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      const pickupstations = data.filter((user) => user.user_role === "PickupStation");
      setPickUpStations(pickupstations);
    } catch (error) {
      console.error("Error fetching PickupStation data:", error);
    }
  };

  useEffect(() => {
    fetchPickUpStations();
  }, []);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const resetFilters = () => {
    setFilters({ name: "", location: "" });
  };

  const filteredPickUpStations = pickUpStations.filter(
    (pickupStation) =>
      (!filters.name ||
        pickupStation.name
          .toLowerCase()
          .includes(filters.name.toLowerCase())) &&
      (!filters.location ||
        pickupStation.operation_areas[0]
          .toLowerCase()
          .includes(filters.location.toLowerCase()))
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen h-full flex flex-col">
      <h1 className="text-2xl font-bold mb-6 text-gray-800 text-center">
        Pickup Station List
      </h1>

      <FilterBar
        filters={filters}
        onFilterChange={handleFilterChange}
        onReset={resetFilters}
      />

      <div className="flex-grow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg">
            <thead className="bg-gray-100 text-gray-600 text-base sticky top-0">
              <tr>
                <th className="px-4 py-2 text-left font-medium border border-gray-300">
                  Profile Image
                </th>
                <th className="px-4 py-2 text-left font-medium border border-gray-300">
                  Name
                </th>
                <th className="px-4 py-2 text-left font-medium border border-gray-300">
                  Email
                </th>
                <th className="px-4 py-2 text-left font-medium border border-gray-300">
                  Phone
                </th>
                <th className="px-4 py-2 text-left font-medium border border-gray-300">
                  Primary Region
                </th>
                <th className="px-4 py-2 text-left font-medium border border-gray-300">
                  Location
                </th>
              </tr>
            </thead>
          </table>
        </div>
        <div className="overflow-y-auto h-[calc(100vh-300px)]">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg">
            <tbody className="text-gray-700 text-sm">
              {filteredPickUpStations.map((pickupStation) => (
                <tr
                  key={pickupStation.id}
                  className="hover:bg-gray-50 transition-colors duration-300"
                >
                  <td className="px-4 py-2 border border-gray-300">
                    <img
                      src={pickupStation.profile_picture}
                      alt={`${pickupStation.name}'s profile`}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  </td>
                  <td className="px-4 py-2 border border-gray-300">
                    {pickupStation.name}
                  </td>
                  <td className="px-4 py-2 border border-gray-300">
                    {pickupStation.email}
                  </td>
                  <td className="px-4 py-2 border border-gray-300">
                    {pickupStation.phone_number}
                  </td>
                  <td className="px-4 py-2 border border-gray-300">
                    {pickupStation.primary_region}
                  </td>
                  <td className="px-4 py-2 border border-gray-300">
                    {pickupStation.operation_areas[0]}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
  
}
