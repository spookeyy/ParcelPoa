// src/pages/DeliveryDetails.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function DeliveryDetails() {
  const { id } = useParams(); // Retrieve the delivery ID from the URL
  const navigate = useNavigate();
  const [delivery, setDelivery] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch delivery details when the component mounts
    fetchDeliveryDetails();
  }, [id]);

  const fetchDeliveryDetails = () => {
    // Replace with your data fetching logic
    // Simulating a network request with setTimeout
    const fetchedDelivery = {
      id: id,
      recipientName: "John Doe",
      status: "Delivered",
      address: "1234 Elm Street, Springfield, USA",
      estimatedDeliveryTime: "2024-08-01 14:30",
    };

    // Simulate an API call using promises
    new Promise((resolve, reject) => {
      setTimeout(() => {
        if (id) {
          resolve(fetchedDelivery);
        } else {
          reject("Failed to fetch delivery details");
        }
      }, 1000);
    })
      .then((data) => {
        setDelivery(data);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  if (loading) return <div className="p-6">Loading...</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;

  return (
    <div className="p-6 bg-white rounded shadow-md">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600 mb-4"
      >
        Back
      </button>

      <h1 className="text-3xl font-bold mb-6">Delivery Details</h1>

      {/* Delivery Information */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">Delivery Information</h2>
        <p>
          <strong>Delivery ID:</strong> {delivery.id}
        </p>
        <p>
          <strong>Recipient:</strong> {delivery.recipientName}
        </p>
        <p>
          <strong>Status:</strong> {delivery.status}
        </p>
        <p>
          <strong>Address:</strong> {delivery.address}
        </p>
        <p>
          <strong>Estimated Delivery Time:</strong>{" "}
          {delivery.estimatedDeliveryTime}
        </p>
      </div>

      {/* Actions */}
      <div>
        <button
          onClick={() => navigate(`/edit-delivery/${id}`)}
          className="bg-yellow-500 text-white px-4 py-2 rounded shadow hover:bg-yellow-600 mr-4"
        >
          Edit
        </button>
        <button
          onClick={() => console.log("Delete delivery")}
          className="bg-red-500 text-white px-4 py-2 rounded shadow hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
