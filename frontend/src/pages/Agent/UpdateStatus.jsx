import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function UpdateStatus() {
  const [status, setStatus] = useState("available");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here
    console.log({ status });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-200">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Update Your Status
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col space-y-4">
            <label className="text-lg font-medium text-gray-700">Status:</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 w-full text-gray-700"
            >
              <option value="available">Available</option>
              <option value="not-available">Not Available</option>
            </select>
          </div>
          <div className="flex justify-between">
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition duration-200"
            >
              Update
            </button>
            <button
              type="button"
              onClick={() => setStatus("available")}
              className="bg-gray-600 text-white px-4 py-2 rounded-lg shadow hover:bg-gray-700 transition duration-200"
            >
              Cancel
            </button>
          </div>
        </form>
        <div className="mt-6 text-center">
          <button
            onClick={() => navigate("/dashboard")}
            className="bg-green-600 text-white px-4 py-2 rounded-lg shadow hover:bg-green-700 transition duration-200"
          >
            Go Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}
