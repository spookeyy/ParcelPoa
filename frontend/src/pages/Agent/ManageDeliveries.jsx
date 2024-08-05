import React, { useContext } from 'react';
import { DeliveryContext } from '../../Context/DeliveryContext';
import { UserContext } from '../../Context/UserContext';

const ManageDeliveries = () => {
  const { deliveries = [], handleStatusChange } = useContext(DeliveryContext);
  const { currentUser } = useContext(UserContext);

  const openSidebar = () => {
    // Implement sidebar opening functionality here
  };

  return (
    <div className="p-6 bg-white rounded shadow-md flex flex-col items-center mx-auto max-w-4xl mt-12 mb-12 relative">
      <button
        onClick={openSidebar}
        className="bg-blue-500 text-white p-2 rounded-lg shadow-md absolute top-4 left-4 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-blue-300"
        aria-label="Open Sidebar"
      >
        <i className="fas fa-bars text-xl"></i>
      </button>
      {currentUser && currentUser.email ? (
        <div>
          <h1 className="text-3xl font-bold mb-6 text-center">
            Manage Deliveries ({deliveries.length})
          </h1>
          <div className="bg-red-100 text-red-800 border border-red-300 rounded p-4 mb-4">
            {/* Add any additional messages or alerts here */}
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-500">Please log in to manage deliveries.</p>
      )}
      <div className="w-full overflow-x-auto">
        <table className="w-full min-w-full border-collapse text-left">
          <thead>
            <tr className="bg-gray-200">
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
                  <div className="flex flex-col gap-2 sm:flex-row sm:gap-2">
                    <button
                      onClick={() => handleStatusChange(delivery.id, 'Delivered')}
                      className={`w-full sm:w-1/3 px-4 py-2 rounded ${
                        delivery.status === 'Delivered'
                          ? 'bg-green-600'
                          : 'bg-green-500'
                      } text-white`}
                    >
                      Delivered
                    </button>
                    <button
                      onClick={() => handleStatusChange(delivery.id, 'In Transit')}
                      className={`w-full sm:w-1/3 px-4 py-2 rounded ${
                        delivery.status === 'In Transit'
                          ? 'bg-yellow-600'
                          : 'bg-yellow-500'
                      } text-white`}
                    >
                      In Transit
                    </button>
                    <button
                      onClick={() => handleStatusChange(delivery.id, 'Scheduled')}
                      className={`w-full sm:w-1/3 px-4 py-2 rounded ${
                        delivery.status === 'Scheduled'
                          ? 'bg-red-600'
                          : 'bg-red-500'
                      } text-white`}
                    >
                      Scheduled
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button
        onClick={openSidebar}
        className="w-full sm:w-48 bg-blue-500 text-white px-4 py-2 rounded-lg mt-6 hover:bg-blue-600"
      >
        Open Sidebar
      </button>
    </div>
  );
};

export default ManageDeliveries;
