import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../../Context/UserContext";
import { toast } from "react-toastify";
import { server } from "../../../config";
import UpdateDeliveryStatusModal from "./UpdateDeliveryStatusModal";

const ManageParcels = () => {
  const { authToken } = useContext(UserContext);
  const [parcels, setParcels] = useState([]);
  const [selectedParcel, setSelectedParcel] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchParcels();
  }, []);

  const fetchParcels = async () => {
    try {
      const response = await fetch(`${server}/get-pickup-station-parcels`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch parcels");
      }

      const data = await response.json();
      setParcels(data);
    } catch (error) {
      console.error("Error fetching parcels:", error);
      toast.error("Failed to fetch parcels");
    }
  };

  const handleUpdateStatus = (parcel) => {
    setSelectedParcel(parcel);
    setIsModalOpen(true);
  };

  const handleStatusUpdate = async (newStatus) => {
    try {
      const response = await fetch(
        `${server}/update-pickup-station-parcel/${selectedParcel.parcel_id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify({ status: newStatus }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update parcel status");
      }

      toast.success("Parcel status updated successfully");
      setIsModalOpen(false);
      fetchParcels(); // Refresh the parcel list
    } catch (error) {
      console.error("Error updating parcel status:", error);
      toast.error("Failed to update parcel status");
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-8">Manage Parcels</h1>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-yellow-500 text-white">
            <th className="p-2 text-left">Tracking Number</th>
            <th className="p-2 text-left">Recipient</th>
            <th className="p-2 text-left">Status</th>
            <th className="p-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {parcels.map((parcel) => (
            <tr key={parcel.parcel_id} className="border-b">
              <td className="p-2">{parcel.tracking_number}</td>
              <td className="p-2">{parcel.recipient_name}</td>
              <td className="p-2">{parcel.status}</td>
              <td className="p-2">
                <button
                  onClick={() => handleUpdateStatus(parcel)}
                  className="bg-gray-600 hover:bg-yellow-600 text-white font-semibold py-1 px-2 rounded"
                >
                  Update Status
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isModalOpen && (
        <UpdateDeliveryStatusModal
          parcel={selectedParcel}
          onClose={() => setIsModalOpen(false)}
          onUpdateStatus={handleStatusUpdate}
        />
      )}
    </div>
  );
};

export default ManageParcels;
