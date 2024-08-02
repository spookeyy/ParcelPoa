import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function DeliveryConfirmation() {
  const [deliveryId, setDeliveryId] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [confirmationDate, setConfirmationDate] = useState("");
  const [notes, setNotes] = useState("");
  const navigate = useNavigate();

  const handleConfirmDelivery = (e) => {
    e.preventDefault();
    // Handle delivery confirmation logic here
    console.log("Confirming delivery:", {
      deliveryId,
      customerName,
      confirmationDate,
      notes,
    });

    // Clear form fields after submission (if needed)
    setDeliveryId("");
    setCustomerName("");
    setConfirmationDate("");
    setNotes("");

    // Navigate to another page or show a success message
    navigate("/dashboard");
  };

  return (
    <div className="p-6 bg-white rounded shadow-md relative">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="absolute top-4 left-4 bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600"
      >
        Back
      </button>

      <h1 className="text-3xl font-bold mb-6">Delivery Confirmation</h1>

      <form onSubmit={handleConfirmDelivery} className="space-y-6">
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Delivery ID:</label>
          <input
            type="text"
            value={deliveryId}
            onChange={(e) => setDeliveryId(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Enter delivery ID"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Customer Name:</label>
          <input
            type="text"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Enter customer name"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Confirmation Date:</label>
          <input
            type="date"
            value={confirmationDate}
            onChange={(e) => setConfirmationDate(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Notes:</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            rows="4"
            placeholder="Additional notes or comments"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600"
        >
          Confirm Delivery
        </button>
      </form>
    </div>
  );
}
