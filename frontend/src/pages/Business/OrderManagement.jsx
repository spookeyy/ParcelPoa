import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../../Context/UserContext";
import ParcelForm from "./ParcelForm";
import { server } from "../../../config.json";
import { toast } from "react-toastify";

function OrderManagement() {
  const [orders, setOrders] = useState([]);
  const { authToken } = useContext(UserContext);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await fetch(`${server}/business/orders`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      if (!response.ok) throw new Error("Failed to fetch orders");
      const ordersData = await response.json();
      setOrders(ordersData);
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error("Failed to fetch orders");
    }
  };

  const createOrder = async (orderData) => {
    try {
      const response = await fetch(`${server}/schedule_pickup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(orderData),
      });

      const result = await response.json();

      if (!response.ok) {
        console.error("Server error response:", result);
        throw new Error(result.message || "Failed to create order");
      }

      console.log("Order created:", result);
      toast.success("Order created successfully");
      fetchOrders(); // Refresh orders after creating a new one
    } catch (error) {
      console.error("Error creating order:", error);
      toast.error(error.message || "Failed to create order");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Create New Order Section */}
      <div className="bg-gradient-to-br from-blue-300 to-indigo-400 rounded-xl shadow-lg p-8 max-w-5xl mx-auto mb-12"> {/* Added mb-12 */}
        <h2 className="text-3xl font-bold mb-6 text-center text-white">
          Create New Order
        </h2>
        <div className="flex flex-col lg:flex-row items-center justify-between space-y-6 lg:space-y-0 lg:space-x-10 pb-32">
          {/* Form Section */}
          <div className="flex-1 w-full max-w-full md:max-w-md lg:max-w-lg">
            <ParcelForm onSubmit={createOrder} />
          </div>

          {/* Image Section */}
          <div className="flex-1 w-full md:max-w-sm lg:max-w-md">
            <img
              src="https://img.freepik.com/free-photo/close-up-woman-shopping-store_23-2149241401.jpg?t=st=1723061496~exp=1723065096~hmac=06e9f4b9d2fcc6f95767eb2443eb604810f1826c2b3849a10b9d630b9ff340c8&w=740"
              alt="Create Order"
              className="w-full h-auto rounded-lg shadow-md"
            />
          </div>
        </div>
      </div>

      {/* Recent Orders Section */}
      <div className="bg-gradient-to-br from-blue-300 to-indigo-400 rounded-xl shadow-lg p-20 max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-center text-white">
          Recent Orders
        </h2>
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200">
            {orders.map((order) => (
              <li key={order.parcel.tracking_number} className="px-6 py-4">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-sm font-medium text-gray-900">
                      Tracking Number: {order.parcel.tracking_number}
                    </span>
                    <br />
                    <span className="text-sm font-medium text-gray-900">
                      Order Number: {order.order_number}
                    </span>
                  </div>
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    {order.status}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default OrderManagement;
