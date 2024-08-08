/* eslint-disable react/prop-types */
import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  PencilIcon,
  TrashIcon,
  CheckCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import { UserContext } from "../../Context/UserContext";
import { server } from "../../../config";
import { toast } from "react-toastify";
import Navbar from "./Navbar";

// Filter Component
const FilterBar = ({ filters, onFilterChange, onReset }) => (
  <div className="bg-gray-100 p-4 rounded-lg shadow-md mb-6 flex flex-wrap gap-4 items-center">
    <input
      type="text"
      placeholder="Search by Name"
      value={filters.name}
      onChange={(e) => onFilterChange("name", e.target.value)}
      className="border border-gray-300 p-2 rounded-md"
    />
    <select
      value={filters.status}
      onChange={(e) => onFilterChange("status", e.target.value)}
      className="border border-gray-300 p-2 rounded-md"
    >
      <option value="">All Statuses</option>
      <option value="Pending">Pending</option>
      <option value="Approved">Approved</option>
      <option value="Rejected">Rejected</option>
    </select>
    <button onClick={onReset} className="bg-yellow-500 p-2 rounded-md">
      Reset
    </button>
  </div>
);


export default function AgentRequests() {
  const { authToken, approveAgentRequest, rejectAgentRequest } =
    useContext(UserContext);
  const [agentRequests, setAgentRequests] = useState([]);
  const [filters, setFilters] = useState({ name: "", status: "" });
  const navigate = useNavigate();

  useEffect(() => {
    fetchAgents();
  }, []);

  const fetchAgents = async () => {
    try {
      const response = await fetch(`${server}/get-agents`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      if (!response.ok) throw new Error("Failed to fetch agents");
      const agentsData = await response.json();
      setAgentRequests(agentsData);
    } catch (error) {
      console.error("Error fetching agents:", error);
      toast.error("Failed to fetch agents");
    }
  };

  const handleView = (id) => {
    navigate(`/agent/${id}`);
  };

  const handleApprove = async (id) => {
    try {
      await approveAgentRequest(id);
      setAgentRequests((prevRequests) =>
        prevRequests.map((agent) =>
          agent.user_id === id ? { ...agent, Request: "Approved" } : agent
        )
      );
    } catch (error) {
      console.error("Error approving agent request:", error);
      toast.error("Failed to approve agent request");
    }
  };

  const handleReject = async (id) => {
    try {
      await rejectAgentRequest(id);
      setAgentRequests((prevRequests) =>
        prevRequests.map((agent) =>
          agent.user_id === id ? { ...agent, Request: "Rejected" } : agent
        )
      );
    } catch (error) {
      console.error("Error rejecting agent request:", error);
      toast.error("Failed to reject agent request");
    }
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this agent request?")) {
      setAgentRequests((prevRequests) =>
        prevRequests.filter((agent) => agent.user_id !== id)
      );
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const resetFilters = () => {
    setFilters({ name: "", status: "" });
  };

  // Apply filters
  const filteredAgentRequests = agentRequests.filter((agent) => {
    return (
      (!filters.name ||
        agent.name.toLowerCase().includes(filters.name.toLowerCase())) &&
      (!filters.status || agent.Request === filters.status)
    );
  });

  return (
    <div>
      <Navbar />
      <div className="p-6">
        <h1 className="text-2xl font-semibold mb-4">Agent Requests</h1>

        <FilterBar
          filters={filters}
          onFilterChange={handleFilterChange}
          onReset={resetFilters}
        />

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
            <thead>
              <tr className="bg-gray-100 text-gray-600">
                <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider border">
                  Profile
                </th>
                <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider border">
                  ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider border">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider border">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider border">
                  Phone
                </th>
                {/* <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider border">
                  Address
                </th> */}
                <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider border">
                  Request
                </th>
                <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider border">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {filteredAgentRequests.map((agent) => (
                <tr key={agent.user_id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm border">
                    <img
                      src={agent.profile_picture}
                      alt={`${agent.name}'s profile`}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  </td>
                  <td className="px-6 py-4 text-sm border">{agent.user_id}</td>
                  <td className="px-6 py-4 text-sm border">{agent.name}</td>
                  <td className="px-6 py-4 text-sm border">{agent.email}</td>
                  <td className="px-6 py-4 text-sm border">{agent.phone_number}</td>
                  {/* <td className="px-6 py-4 text-sm border">{agent.address}</td> */}
                  <td className="px-6 py-4 text-sm border">
                    <span
                      className={`inline-flex items-center px-3 py-1 text-sm font-medium rounded-full ${
                        agent.Request === "Approved"
                          ? "bg-green-100 text-green-800"
                          : agent.Request === "Rejected"
                          ? "bg-red-100 text-red-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {agent.Request}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm flex items-center gap-2 border">
                    <button
                      onClick={() => handleView(agent.user_id)}
                      className="text-blue-500 hover:text-blue-700"
                      aria-label={`View Agent ID: ${agent.user_id}`}
                    >
                      <PencilIcon className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleApprove(agent.user_id)}
                      className="text-green-500 hover:text-green-700"
                      aria-label={`Approve Agent ID: ${agent.user_id}`}
                    >
                      <CheckCircleIcon className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleReject(agent.user_id)}
                      className="text-red-500 hover:text-red-700"
                      aria-label={`Reject Agent ID: ${agent.user_id}`}
                    >
                      <XCircleIcon className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(agent.user_id)}
                      className="text-gray-500 hover:text-gray-700"
                      aria-label={`Delete Agent ID: ${agent.user_id}`}
                  >
                    <TrashIcon className="w-5 h-5" />
                  </button>
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
