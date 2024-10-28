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
      const pickupstations = data.filter(
        (user) => user.user_role === "PickupStation"
      );
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
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden border border-gray-200 rounded-lg shadow-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/6"
                    >
                      Profile Image
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/6"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/6"
                    >
                      Email
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/6"
                    >
                      Phone
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/6"
                    >
                      Primary Region
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/6"
                    >
                      Location
                    </th>
                  </tr>
                </thead>
              </table>
            </div>
            <div className="overflow-auto max-h-[calc(100vh-300px)] border border-gray-200 border-t-0 rounded-b-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredPickUpStations.map((pickupStation) => (
                    <tr key={pickupStation.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap w-1/6">
                        <div className="flex flex-col items-center">
                          <img
                            src={pickupStation.profile_picture}
                            alt={`${pickupStation.name}'s profile`}
                            className="w-12 h-12 rounded-full object-cover mb-2"
                          />
                          <span className="text-xs text-center">
                            Profile Image
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap w-1/6">
                        <div className="text-sm font-medium text-gray-900">
                          {pickupStation.name}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap w-1/6">
                        <div className="text-sm text-gray-500">
                          {pickupStation.email}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap w-1/6">
                        <div className="text-sm text-gray-500">
                          {pickupStation.phone_number}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap w-1/6">
                        <div className="text-sm text-gray-500">
                          {pickupStation.primary_region}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap w-1/6">
                        <div className="text-sm text-gray-500">
                          {pickupStation.operation_areas[0]}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
