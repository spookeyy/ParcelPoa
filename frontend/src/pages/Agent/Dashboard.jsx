import React, { useState, useEffect, useContext } from "react";
import { Routes, Route } from "react-router-dom";
import AgentHeader from "./DashboardComponentsforAgent/AgentHeader";
import StatsCard from "./DashboardComponentsforAgent/StatsCard";
import Deliveries from "./DashboardComponentsforAgent/Deliveries";
import Parcels from "./Parcels";
import ManageDeliveries from "./ManageDeliveries";
import { server } from "../../../config.json";
import { UserContext } from "../../Context/UserContext";

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [totalDeliveries, setTotalDeliveries] = useState(0);
  // const [delivered, setDelivered] = useState(0);
  // const [inTransit, setInTransit] = useState(0);
  const [assignedDeliveries, setAssignedDeliveries] = useState([]);
  const [totalParcels, setTotalParcels] = useState(0);
  const [deliveredParcels, setDeliveredParcels] = useState(0);
  const [inTransitParcels, setInTransitParcels] = useState(0);
  const [assignedParcels, setAssignedParcels] = useState([]);

  const { authToken } = useContext(UserContext);

  useEffect(() => {
    if (!authToken) {
      console.error("No JWT token found");
      return;
    }

    // Fetch deliveries
    fetch(`${server}/assigned_deliveries`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    })
      .then((response) => {
        if (response.status === 422) {
          return response.json().then((errorData) => {
            throw new Error(
              `Unprocessable Entity: ${JSON.stringify(errorData)}`
            );
          });
        }
        if (!response.ok) {
          throw new Error("Failed to fetch deliveries");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Fetched deliveries data:", data); // Log the entire response

        setAssignedDeliveries(
          data.map((delivery) => ({
            deliveryID: delivery.delivery_id,
            orderID: delivery.parcel_id,
            trackingNumber: delivery.parcel?.tracking_number || "N/A",
            status: delivery.status,
            orderDate: delivery.created_at,
            recipientEmail: delivery.parcel?.recipient_email || "N/A",
            sender_email: delivery.parcel?.sender?.sender_email || "N/A",
          }))
        );
        setTotalDeliveries(data.length);

        const deliveredCount = data.filter(
          (delivery) => delivery.status === "Delivered"
        ).length;
        setDelivered(deliveredCount);

        const inTransitCount = data.filter(
          (delivery) => delivery.status === "In Transit"
        ).length;
        setInTransit(inTransitCount);
      })
      .catch((error) => {
        console.error("Error fetching deliveries:", error);
      });

    // Fetch parcels
    fetch(`${server}/agent_parcels`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    })
      .then((response) => {
        if (response.status === 422) {
          return response.json().then((errorData) => {
            throw new Error(
              `Unprocessable Entity: ${JSON.stringify(errorData)}`
            );
          });
        }
        if (!response.ok) {
          throw new Error("Failed to fetch parcels");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Fetched parcels data:", data); // Log the entire response
        setAssignedParcels(data);
        setTotalParcels(data.length);

        const deliveredCount = data.filter(
          (parcel) => parcel.status === "Delivered"
        ).length;
        setDeliveredParcels(deliveredCount);

        const inTransitCount = data.filter(
          (parcel) => parcel.status === "In Transit"
        ).length;
        setInTransitParcels(inTransitCount);
      })
      .catch((error) => {
        console.error("Error fetching parcels:", error);
      });
  }, [authToken]);

  const openSidebar = () => {
    setSidebarOpen(true);
  };

  return (
    <div className="flex h-full overflow-hidden bg-gradient-to-br from-blue-300 to-indigo-700">
      <AgentHeader />
      <div className="mt-24 flex-1 overflow-y-auto px-4 py-2">
        <Routes>
          <Route
            path="/manage-deliveries"
            element={<ManageDeliveries openSidebar={openSidebar} />}
          />
          <Route
            path="/"
            element={
              <div className="flex flex-col flex-1 ">
                <div className="flex flex-wrap justify-center gap-6 px-6 mb-8">
                  <StatsCard
                    icon="fa-chart-line"
                    title="Total Deliveries"
                    count={totalDeliveries}
                    color="text-green-500"
                  />
                  {/* <StatsCard
                    icon="fa-truck"
                    title="Delivered"
                    count={delivered}
                    color="text-yellow-500"
                  />
                  <StatsCard
                    icon="fa-truck-loading"
                    title="In Transit"
                    count={inTransit}
                    color="text-red-500"
                  /> */}
                  <StatsCard
                    icon="fa-box"
                    title="Total Parcels"
                    count={totalParcels}
                    color="text-purple-500"
                  />
                  <StatsCard
                    icon="fa-check-square"
                    title="Delivered Parcels"
                    count={deliveredParcels}
                    color="text-green-500"
                  />
                  <StatsCard
                    icon="fa-shipping-fast"
                    title="In Transit Parcels"
                    count={inTransitParcels}
                    color="text-yellow-500"
                  />
                </div>

                {/* <div className="px-6 mb-8">
                  <Deliveries deliveries={assignedDeliveries} />
                </div> */}

                <div className="px-6 mb-8">
                  <Parcels parcels={assignedParcels} />
                </div>
              </div>
            }
          />
        </Routes>
      </div>
    </div>
  );
}
