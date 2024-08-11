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
      <div className="min-h-screen bg-white p-6 mt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="bg-gray-100 rounded-xl shadow-md p-6 lg:p-10">
            <h2 className="text-xl underline font-bold mb-8 text-center text-gray-800">
              Create Order to Schedule Pickup
            </h2>
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Image Section */}
              <div className="lg:w-1/3">
                <img
                  src="https://img.freepik.com/free-photo/close-up-woman-shopping-store_23-2149241401.jpg?t=st=1723061496~exp=1723065096~hmac=06e9f4b9d2fcc6f95767eb2443eb604810f1826c2b3849a10b9d630b9ff340c8&w=740"
                  alt="Pickup"
                  className="w-full h-auto rounded-lg shadow-md"
                />
              </div>
              {/* Form Section */}
              <div className="lg:w-2/3">
                <form onSubmit={schedulePickup} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="recipient_name"
                      value={formData.recipient_name}
                      onChange={handleChange}
                      placeholder="Recipient Name"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
                      required
                    />
                    <input
                      type="tel"
                      name="recipient_phone"
                      value={formData.recipient_phone}
                      onChange={handleChange}
                      placeholder="Recipient Phone"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
                      required
                    />
                    <input
                      type="email"
                      name="recipient_email"
                      value={formData.recipient_email}
                      onChange={handleChange}
                      placeholder="Recipient Email"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
                      required
                    />
                    <input
                      type="text"
                      name="recipient_address"
                      value={formData.recipient_address}
                      onChange={handleChange}
                      placeholder="Recipient Address"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
                      required
                    />
                  </div>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Parcel Description i.e. quantity, item(s), etc."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
                    required
                    rows="3"
                  ></textarea>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      placeholder="Category"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
                      required
                    />
                    <input
                      type="number"
                      name="weight"
                      value={formData.weight}
                      onChange={handleChange}
                      placeholder="Weight (kg)"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
                      required
                    />
                    <input
                      type="datetime-local"
                      name="pickup_time"
                      value={formData.pickup_time}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
                      required
                    />
                    <select
                      name="agent_id"
                      value={formData.agent_id}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
                      required
                    >
                      <option value="">Select an agent</option>
                      {availableAgents.map((agent) => (
                        <option key={agent.user_id} value={agent.user_id}>
                          {agent.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3 bg-yellow-600 text-white font-semibold rounded-lg shadow-lg hover:bg-yellow-700 transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
                  >
                    Schedule Pickup
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PickupScheduling;