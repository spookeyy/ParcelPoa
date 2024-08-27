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
    <button
      onClick={onReset}
      className="bg-yellow-300  py-1 px-3 rounded-md text-base hover:bg-yellow-500"
      aria-label="Reset filters"
    >
      Reset Filter
    </button>
  </div>
);

export default function BusinessList() {
  const [businessRequests, setBusinessRequests] = useState([]);
  const [filters, setFilters] = useState({ name: "" });

  const fetchBusinesses = async () => {
    try {
      const response = await fetch(`${server}/users`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      const businesses = data.filter(user => user.user_role === "Business");
      setBusinessRequests(businesses);
    } catch (error) {
      console.error("Error fetching business data:", error);
    }
  };

  useEffect(() => {
    fetchBusinesses();
  }, []);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const resetFilters = () => {
    setFilters({ name: "" });
  };

  const filteredBusinessRequests = businessRequests.filter(
    (business) =>
      (!filters.name ||
        business.name.toLowerCase().includes(filters.name.toLowerCase()))
  );

  return (
    <>
      <div className="p-6 bg-gray-50 h-full flex flex-col ">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        Businesses List
      </h1>

      <FilterBar
        filters={filters}
        onFilterChange={handleFilterChange}
        onReset={resetFilters}
      />

      <div className="overflow-x-auto flex-grow">
        <div className="inline-block min-w-full align-middle">
          <div className="overflow-hidden border-b border-gray-200 shadow sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
              <tr className="bg-gray-100 text-gray-600 text-base">
                <th className="px-4 py-2 text-left font-medium">
                  Profile Image
                </th>
                <th className="px-4 py-2 text-left font-medium">Name</th>
                <th className="px-4 py-2 text-left font-medium">Email</th>
                <th className="px-4 py-2 text-left font-medium">Phone</th>
                <th className="px-4 py-2 text-left font-medium">
                  Primary Region
                </th>
              </tr>
            </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredBusinessRequests.map((business) => (
                  <tr key={business.id}
                  className="hover:bg-gray-50 transition-colors duration-300"
                >
                  <td className="px-4 py-2">
                    <img
                      src={business.profile_picture}
                      alt={`${business.name}'s profile`}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  </td>
                  <td className="px-4 py-2">{business.name}</td>
                  <td className="px-4 py-2">{business.email}</td>
                  <td className="px-4 py-2">{business.phone_number}</td>
                  <td className="px-4 py-2">{business.primary_region}</td>
                </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}