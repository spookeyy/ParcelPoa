import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../../Context/UserContext";
import { server } from "../../../config.json";
import { toast } from "react-toastify";
import Header from "./Header";

function PickupScheduling() {
  const { authToken } = useContext(UserContext);
  const [availableAgents, setAvailableAgents] = useState([]);
  const [formData, setFormData] = useState({
    recipient_name: "",
    recipient_address: "",
    recipient_phone: "",
    recipient_email: "",
    description: "",
    weight: "",
    category: "",
    pickup_time: "",
    agent_id: "",
  });

  useEffect(() => {
    const fetchAvailableAgents = async () => {
      if (!authToken) return setAvailableAgents([]);
      try {
        const response = await fetch(`${server}/get-available-agents`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch available agents");
        }
        const agents = await response.json();
        setAvailableAgents(agents);
      } catch (error) {
        console.error("Error fetching available agents:", error);
        toast.error("Failed to fetch available agents");
      }
    };

    fetchAvailableAgents();
  }, [authToken]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const schedulePickup = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${server}/schedule_pickup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to schedule pickup");
      }
      const result = await response.json();
      toast.success("Pickup scheduled successfully");
      setFormData({
        recipient_name: "",
        recipient_address: "",
        recipient_phone: "",
        recipient_email: "",
        description: "",
        weight: "",
        category: "",
        pickup_time: "",
        agent_id: "",
      });
    } catch (error) {
      toast.error(error.message || "Failed to schedule pickup");
      console.error("Error scheduling pickup:", error);
    }
  };

  return (
    <>
      <Header />
      <div className="bg-gradient-to-br from-blue-300 to-indigo-400 rounded-xl shadow-lg p-8 max-w-5xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center justify-between space-y-6 lg:space-y-0 lg:space-x-10">
          {/* Image Section */}
          <div className="flex-1 w-full md:max-w-sm lg:max-w-md">
            <img
              src="https://img.freepik.com/free-photo/close-up-woman-shopping-store_23-2149241401.jpg?t=st=1723061496~exp=1723065096~hmac=06e9f4b9d2fcc6f95767eb2443eb604810f1826c2b3849a10b9d630b9ff340c8&w=740"
              alt="Pickup"
              className="w-full h-auto rounded-lg shadow-md"
            />
          </div>
          {/* Form Section */}
          <div className="flex-1 w-full max-w-full md:max-w-md lg:max-w-lg">
            <h2 className="text-3xl text-center font-bold text-white mb-8">
              Schedule Pickup
            </h2>
            <form onSubmit={schedulePickup} className="space-y-6">
              <input
                type="text"
                name="recipient_name"
                value={formData.recipient_name}
                onChange={handleChange}
                placeholder="Recipient Name"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <input
                type="text"
                name="recipient_address"
                value={formData.recipient_address}
                onChange={handleChange}
                placeholder="Recipient Address"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <input
                type="tel"
                name="recipient_phone"
                value={formData.recipient_phone}
                onChange={handleChange}
                placeholder="Recipient Phone"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <input
                type="email"
                name="recipient_email"
                value={formData.recipient_email}
                onChange={handleChange}
                placeholder="Recipient Email"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <input
                type="text"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Parcel Description"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <input
                type="number"
                name="weight"
                value={formData.weight}
                onChange={handleChange}
                placeholder="Weight (kg)"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                placeholder="Category"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <input
                type="datetime-local"
                name="pickup_time"
                value={formData.pickup_time}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <select
                name="agent_id"
                value={formData.agent_id}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select an agent</option>
                {availableAgents.map((agent) => (
                  <option key={agent.user_id} value={agent.user_id}>
                    {agent.name}
                  </option>
                ))}
              </select>
              <button
                type="submit"
                className="w-full py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-lg hover:bg-white hover:text-blue-600 transition duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Schedule Pickup
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default PickupScheduling;