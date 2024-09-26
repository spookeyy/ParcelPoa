import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../../Context/UserContext";
import { server } from "../../../config.json";
import { toast } from "react-toastify";

function PickupScheduling() {
  const { authToken } = useContext(UserContext);
  const [availableAgents, setAvailableAgents] = useState([]);
  const [regions, setRegions] = useState([]);
  const [pickupStations, setPickupStations] = useState([]);
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
    delivery_type: "DoorDelivery",
    pickup_station_id: "",
    current_location: "",
  });

  useEffect(() => {
    fetchPrimaryRegion();
    fetchRegions();
    fetchPickupStations();
  }, [authToken]);

  useEffect(() => {
    fetchAvailableAgents();
  }, [authToken, formData.current_location]);

  const fetchPrimaryRegion = async () => {
    try {
      const response = await fetch(`${server}/get-business-primary-region`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      if (!response.ok) throw new Error("Failed to fetch primary region");
      const data = await response.json();
      setFormData((prev) => ({
        ...prev,
        current_location: data.primary_region,
      }));
    } catch (error) {
      console.error("Error fetching primary region:", error);
      toast.error("Failed to fetch primary region");
    }
  };

  const fetchRegions = async () => {
    try {
      const response = await fetch(`${server}/get-regions`);
      if (!response.ok) throw new Error("Failed to fetch regions");
      const regionsData = await response.json();
      const allRegions = Object.values(regionsData).flat();
      setRegions(allRegions);
    } catch (error) {
      console.error("Error fetching regions:", error);
      toast.error("Failed to fetch regions");
    }
  };

  const fetchPickupStations = async () => {
    try {
      const response = await fetch(`${server}/get-open-pickup-stations`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      if (!response.ok) throw new Error("Failed to fetch pickup stations");
      const stations = await response.json();
      setPickupStations(stations);
    } catch (error) {
      console.error("Error fetching pickup stations:", error);
      toast.error("Failed to fetch pickup stations");
    }
  };

  const fetchAvailableAgents = async () => {
    if (!authToken || !formData.current_location) return setAvailableAgents([]);
    try {
      const response = await fetch(
        `${server}/get-available-agents?primary_region=${formData.current_location}`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      if (!response.ok) throw new Error("Failed to fetch available agents");
      const agents = await response.json();
      setAvailableAgents(agents);
    } catch (error) {
      console.error("Error fetching available agents:", error);
      toast.error("Failed to fetch available agents");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]:
        name === "agent_id" || name === "pickup_station_id"
          ? parseInt(value, 10)
          : value,
    }));
  };

  const schedulePickup = async (e) => {
    e.preventDefault();
    try {
      const pickupData = {
        ...formData,
        pickup_time: new Date(formData.pickup_time).toISOString(),
      };

      // Remove recipient_address if delivery_type is pickup_station
      if (pickupData.delivery_type === "PickupStation") {
        delete pickupData.recipient_address;
      } else {
        delete pickupData.pickup_station_id;
      }

      const response = await fetch(`${server}/schedule_pickup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(pickupData),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to schedule pickup");
      }
      const result = await response.json();
      toast.success(
        `Pickup scheduled successfully. }` //Tracking number: ${result.tracking_number
      );
      resetForm();
    } catch (error) {
      toast.error(error.message || "Failed to schedule pickup");
      console.error("Error scheduling pickup:", error);
    }
  };

  const resetForm = () => {
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
      delivery_type: "door_delivery",
      pickup_station_id: "",
      current_location: formData.current_location,
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-6">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Create Order to Schedule Pickup
        </h2>
        <form onSubmit={schedulePickup} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="recipient_name"
              value={formData.recipient_name}
              onChange={handleChange}
              placeholder="Recipient Name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              required
            />
            <input
              type="tel"
              name="recipient_phone"
              value={formData.recipient_phone}
              onChange={handleChange}
              placeholder="Recipient Phone"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              required
            />
          </div>
          <input
            type="email"
            name="recipient_email"
            value={formData.recipient_email}
            onChange={handleChange}
            placeholder="Recipient Email"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            required
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <select
              name="delivery_type"
              value={formData.delivery_type}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              required
            >
              <option value="DoorDelivery">Door Delivery</option>
              <option value="PickupStation">Pickup Station</option>
            </select>
            {formData.delivery_type === "DoorDelivery" ? (
              <input
                type="text"
                name="recipient_address"
                value={formData.recipient_address}
                onChange={handleChange}
                placeholder="Recipient Address"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                required
              />
            ) : (
              <select
                name="pickup_station_id"
                value={formData.pickup_station_id}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                required
              >
                <option value="">Select Pickup Station</option>
                {pickupStations.map((station) => (
                  <option key={station.user_id} value={station.user_id}>
                    {station.name} - {station.primary_region}
                  </option>
                ))}
              </select>
            )}
          </div>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Parcel Description i.e. quantity, item(s), etc."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            required
            rows="3"
          ></textarea>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              placeholder="Category"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              required
            />
            <input
              type="number"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
              placeholder="Weight (kg)"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              required
            />
            <input
              type="datetime-local"
              name="pickup_time"
              value={formData.pickup_time}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              required
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <select
              name="current_location"
              value={formData.current_location}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              required
            >
              <option value="">Select Recipient Location</option>
              {regions.map((region, index) => (
                <option key={index} value={region}>
                  {region}
                </option>
              ))}
            </select>
            <select
              name="agent_id"
              value={formData.agent_id}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              required
            >
              <option value="">Select Available Agent</option>
              {availableAgents.map((agent) => (
                <option key={agent.user_id} value={agent.user_id}>
                  {agent.name} - {agent.primary_region}
                </option>
              ))}
            </select>
          </div>
          <div className="text-center mt-6">
            <button
              type="submit"
              className="px-24 py-3 bg-gray-600 text-white rounded-lg shadow-md hover:bg-black transition duration-300 ease-in-out"
            >
              Schedule Pickup
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PickupScheduling;
