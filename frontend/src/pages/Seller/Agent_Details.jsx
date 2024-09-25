import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {server} from "../../../config.json";

const Agent_Details = () => {
  const { id } = useParams(); // 'id' here corresponds to the agent's ID in the URL params
  const [agent, setAgent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAgent = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${server}/agent-details/${id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch agent details");
        }

        const data = await response.json();
        setAgent(data);
      } catch (error) {
        console.error("Error fetching agent details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAgent();
  }, [id]);

  const handleApprove = () => {
    setAgent((prevAgent) => ({ ...prevAgent, Request: "Approved" }));
    // Update the agent's status in the database
    const updateAgentStatus = async () => {
      try {
        const response = await fetch(`${server}/update-agent-status/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
          body: JSON.stringify({ Request: "Approved" }),
        });
        if (!response.ok) {
          throw new Error("Failed to update agent status");
        }
      } catch (error) {
        console.error("Error updating agent status:", error);
      }
    };
    updateAgentStatus();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="loader"></div>
      </div>
    );
  }

  if (!agent) {
    return <p className="text-red-500 text-center">Agent not found</p>;
  }

  return (
    <>
      <div className="p-8 max-w-3xl mx-auto bg-white rounded-lg shadow-lg border border-gray-200 mt-10 mb-14">
        <h1 className="text-3xl font-bold mb-6 text-gray-900">Agent Details</h1>
        <div className="bg-gray-50 p-6 rounded-lg shadow-md border border-gray-300">
          <div className="flex flex-col md:flex-row items-center md:items-start md:justify-between">
            <div className="flex-shrink-0 mb-4 md:mb-0">
              <img
                src={agent.profile_picture || "https://via.placeholder.com/150"}
                alt={`${agent.name}'s profile`}
                className="w-32 h-32 object-cover rounded-full shadow-lg border-2 border-gray-200"
              />
            </div>
            <div className="md:ml-6 flex-1">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                Agent ID: {agent.user_id}
              </h2>
              <p className="text-lg text-gray-700 mb-1">
                <strong>Name:</strong> {agent.name}
              </p>
              <p className="text-lg text-gray-700 mb-1">
                <strong>Email:</strong> {agent.email}
              </p>
              <p className="text-lg text-gray-700 mb-1">
                <strong>Phone:</strong> {agent.phone_number}
              </p>
              <p className="text-lg text-gray-700 mb-4">
                <strong>Status:</strong> {agent.Request}
              </p>
              <button
                onClick={handleApprove}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  agent.Request === "Approved"
                    ? "bg-green-500 text-white cursor-not-allowed"
                    : "bg-black text-white hover:bg-yellow-500 hover:text-white"
                }`}
                disabled={agent.Request === "Approved"}
              >
                {agent.Request === "Approved" ? "Approved" : "Approve"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Agent_Details;
