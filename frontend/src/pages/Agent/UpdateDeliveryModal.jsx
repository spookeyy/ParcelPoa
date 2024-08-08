import React, { useState } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { server } from "../../../config";

function UpdateDeliveryModal({ delivery_id, onClose }) {
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${server}/update_delivery_status/${delivery_id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            status,
          }),
        }
      );

      if (response.ok) {
        toast.success("Delivery status updated successfully!");
        onClose();
      } else {
        const data = await response.json();
        toast.error(data.message || "Failed to update status.");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to update status.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
        <h2 className="text-xl font-semibold mb-4">Update Delivery Status</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mt-1"
              required
            >
              <option value="">Select status</option>
              <option value="Scheduled">Scheduled</option>
              <option value="In Transit">In Transit</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="mr-2 bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

UpdateDeliveryModal.propTypes = {
  delivery_id: PropTypes.number.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default UpdateDeliveryModal;
