import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../../Context/UserContext";
import { server } from "../../../config.json";
import { toast } from "react-toastify";
import Header from "./Header";

function PickupScheduling() {
  const { authToken } = useContext(UserContext);
  const [availableAgents, setAvailableAgents] = useState([]);
  const [regions, setRegions] = useState([]);
  const [primaryRegion, setPrimaryRegion] = useState("");
  const [operationalArea, setOperationalArea] = useState("");
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
    // Fetch primary region for business account
    const fetchPrimaryRegion = async () => {
      try {
        const response = await fetch(`${server}/get-business-primary-region`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch primary region");
        }
        const data = await response.json();
        setPrimaryRegion(data.primary_region); // Set the fetched primary region
        console.log("Primary region:", data.primary_region);
      } catch (error) {
        console.error("Error fetching primary region:", error);
        toast.error("Failed to fetch primary region");
      }
    };

    fetchPrimaryRegion();
  }, [authToken]);

  useEffect(() => {
    const fetchRegions = async () => {
      try {
        const response = await fetch(`${server}/get-regions`);
        if (!response.ok) {
          throw new Error("Failed to fetch regions");
        }
        const regionsData = await response.json();
        console.log("Regions data:", regionsData); // Log to inspect the response

        // Extract arrays from the object and flatten them into a single array
        const allRegions = Object.values(regionsData).flat();
        console.log("All regions:", allRegions);

        setRegions(allRegions);
      } catch (error) {
        console.error("Error fetching regions:", error);
        toast.error("Failed to fetch regions");
      }
    };

    fetchRegions();
  }, []);

  useEffect(() => {
    const fetchAvailableAgents = async () => {
      if (!authToken || !operationalArea) return setAvailableAgents([]);
      try {
        const response = await fetch(
          `${server}/get-available-agents?primary_region=${primaryRegion}&operational_area=${operationalArea}`,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );
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
  }, [authToken, operationalArea, primaryRegion]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: name === "agent_id" ? parseInt(value, 10) : value,
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
      <div className="min-h-screen bg-white p-6 mt-[-2px]">
        <div className="container mx-auto px-4 py-8 mt-[-30px]">
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
                      value={operationalArea}
                      onChange={(e) => setOperationalArea(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
                    >
                      <option value="">Select Agent Operational Area</option>
                      {regions.map((region, index) => (
                        <option key={index} value={region}>
                          {region}
                        </option>
                      ))}
                    </select>
                  </div>
                  <select
                    name="agent_id"
                    value={formData.agent_id}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
                    required
                  >
                    <option value="">Select Available Agent</option>
                    {availableAgents.map((agent) => (
                      <option key={agent.user_id} value={agent.user_id}>
                        {agent.name} - {agent.primary_region}
                      </option>
                    ))}
                  </select>
                  <div className="text-center">
                    <button
                      type="submit"
                      className="px-24 py-3 bg-black text-white rounded-lg shadow-md hover:bg-yellow-900 transition duration-300 md:ml-2 mt-4 md:mt-0 sm:ml-0 sm:mt-0 sm:px-12 sm:py-2" 
                    >
                      Schedule Pickup
                    </button>
                  </div>
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
