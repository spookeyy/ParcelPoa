/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { server } from "../../../config.json";


const getStatus = (status) => (status === "Available" ? "Available" : "Unavailable");

// FilterBar Component
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
    <select
      value={filters.status}
      onChange={(e) => onFilterChange("status", e.target.value)}
      className="border rounded-md p-2 text-base"
      aria-label="Filter by status"
    >
      <option value="">Select Status</option>
      <option value="Available">Available</option>
      <option value="Unavailable">Unavailable</option>
    </select>
    <button
      onClick={onReset}
      className="bg-yellow-300 py-1 px-3 rounded-md text-base hover:bg-yellow-500"
      aria-label="Reset filters"
    >
      Reset Filter
    </button>
  </div>
);

export default function Agents() {
  const [agentRequests, setAgentRequests] = useState([]);
  const [filters, setFilters] = useState({ name: "", status: "" });
  const navigate = useNavigate();

  // Fetch agents data from backend
  const fetchAgents = async () => {
    try {
      const response = await fetch(`${server}/users`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      const agents = data.filter(user => user.user_role === "Agent");
      setAgentRequests(agents.map(agent => ({
        ...agent,
        status: getStatus(agent.status),
      })));
    } catch (error) {
      console.error("Error fetching agents data:", error);
    }
  };

  useEffect(() => {
    fetchAgents();
  }, []);

  const handleView = (user_id) => {
    navigate(`/admin/agent/${user_id}`);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this client request?")) {
      try {
        const response = await fetch(`${server}/users/${id}`, {
          method: 'DELETE',
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        setAgentRequests((prevRequests) =>
          prevRequests.filter((agent) => agent.id !== id)
        );
      } catch (error) {
        console.error("Error deleting agent:", error);
      }
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const resetFilters = () => {
    setFilters({ name: "", status: "" });
  };

  // Apply filters
  const filteredAgentRequests = agentRequests.filter(
    (agent) =>
      (!filters.name ||
        agent.name.toLowerCase().includes(filters.name.toLowerCase())) &&
      (!filters.status || agent.status === filters.status)
  );

  return (
    <div className="h-full flex flex-col p-4 md:p-6 bg-gray-50 mt-4">
      {/* Title */}
      <h1 className="text-xl text-center md:text-2xl font-bold mb-4 md:mb-6 text-gray-800">
        Agents List
      </h1>

      <FilterBar
        filters={filters}
        onFilterChange={handleFilterChange}
        onReset={resetFilters}
      />

      <div className="overflow-x-auto flex-grow">
        <div className="overflow-y-auto h-[calc(100vh-200px)] pb-24">
          {" "}
          {/* Increased padding-bottom */}
          <table className="min-w-full bg-white border border-yellow-600 rounded-lg shadow-lg">
            <thead>
              <tr className="bg-gray-100 text-gray-600 text-sm md:text-base">
                <th className="px-2 md:px-4 py-2 text-left font-medium border border-yellow-30">
                  Profile Image
                </th>
                <th className="px-2 md:px-4 py-2 text-left font-medium border border-yellow-30">
                  Agent ID
                </th>
                <th className="px-2 md:px-4 py-2 text-left font-medium border border-yellow-30">
                  Name
                </th>
                <th className="px-2 md:px-4 py-2 text-left font-medium border border-yellow-30">
                  Email
                </th>
                <th className="px-2 md:px-4 py-2 text-left font-medium border border-yellow-30">
                  Phone
                </th>
                <th className="px-2 md:px-4 py-2 text-left font-medium border border-yellow-30">
                  Primary Region
                </th>
                <th className="px-2 md:px-4 py-2 text-left font-medium border border-yellow-30">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="text-gray-900 text-xs md:text-sm">
              {filteredAgentRequests.map((agent) => (
                <tr
                  key={agent.user_id}
                  className="hover:bg-yellow-50 transition-colors duration-300"
                >
                  <td className="px-2 md:px-4 py-2 border border-yellow-30">
                    <img
                      src={agent.profile_picture}
                      alt={`${agent.name}'s profile`}
                      className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover"
                    />
                  </td>
                  <td className="px-2 md:px-4 py-2 border border-yellow-30">
                    {agent.user_id}
                  </td>
                  <td className="px-2 md:px-4 py-2 border border-yellow-30">
                    {agent.name}
                  </td>
                  <td className="px-2 md:px-4 py-2 border border-yellow-30">
                    {agent.email}
                  </td>
                  <td className="px-2 md:px-4 py-2 border border-yellow-30">
                    {agent.phone_number}
                  </td>
                  <td className="px-2 md:px-4 py-2 border border-yellow-30">
                    {agent.primary_region}
                  </td>
                  <td className="px-2 md:px-4 py-2 border border-yellow-30">
                    <span
                      className={`inline-flex items-center px-2 md:px-3 py-1 text-xs md:text-sm font-medium rounded-full ${
                        agent.status === "Available"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {agent.status}
                    </span>
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
