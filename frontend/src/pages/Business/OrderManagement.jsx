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
      <h1 className="text-3xl font-bold mb-6">Order Management</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Create New Order</h2>
          <ParcelForm onSubmit={createOrder} />
        </div>
        <div className="col-span-1 ">
          <h2 className="text-2xl font-semibold mb-4">Recent Orders</h2>
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <ul className="divide-y divide-gray-200">
              {orders.map((order) => (
                <li key={order.parcel.tracking_number} className="px-6 py-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-900">
                      {order.parcel.tracking_number}
                    </span>
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
    </div>
  );
}

export default OrderManagement;
