
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const deliveriesMockData = [
  { id: 1, parcel: 'Parcel A', status: 'scheduled' },
  { id: 2, parcel: 'Parcel B', status: 'In Transit' },
  { id: 3, parcel: 'Parcel C', status: 'Delivered' },
  // Add more mock data as needed
];

export default function ManageDeliveries() {
  const [deliveries, setDeliveries] = useState(deliveriesMockData);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch real delivery data here if needed
  }, []);

  const handleStatusChange = (id, newStatus) => {
    setDeliveries((prevDeliveries) =>
      prevDeliveries.map((delivery) =>
        delivery.id === id ? { ...delivery, status: newStatus } : delivery
      )
    );
  };

  return (
    <div className="p-6 bg-white rounded shadow-md relative">
      <h1 className="text-3xl font-bold mb-6">Manage Deliveries</h1>

      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="border p-2">Parcel</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {deliveries.map((delivery) => (
            <tr key={delivery.id}>
              <td className="border p-2">{delivery.parcel}</td>
              <td className="border p-2">{delivery.status}</td>
              <td className="border p-2">
                <button
                  onClick={() => handleStatusChange(delivery.id, 'Delivered')}
                  className="bg-green-500 text-white px-2 py-1 rounded"
                >
                  Mark as Delivered
                </button>
                <button
                  onClick={() => handleStatusChange(delivery.id, 'In Transit')}
                  className="bg-yellow-500 text-white px-2 py-1 rounded ml-2"
                >
                  Mark as In Transit
                </button>
                <button
                  onClick={() => handleStatusChange(delivery.id, 'scheduled')}
                  className="bg-red-500 text-white px-2 py-1 rounded ml-2"
                >
                  Mark as scheduled
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Link to="/dashboard" className="mt-6 inline-block bg-blue-500 text-white px-4 py-2 rounded">
        Back to Dashboard
      </Link>
    </div>
  );
}