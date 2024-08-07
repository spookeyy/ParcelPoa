/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { UserContext } from "../Context/UserContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { server } from "../../config";

export const DeliveryContext = createContext();

export function DeliveryProvider({ children }) {
  const nav = useNavigate();
  const { auth_token } = useContext(UserContext);
  const [deliveries, setDeliveries] = useState([]);

  const addDelivery = (
    parcel_id,
    agent_id,
    pickup_time,
    delivery_time,
    status
  ) => {
    fetch(`${server}/deliveries`, {
      method: "POST",
      body: JSON.stringify({
        parcel_id,
        agent_id,
        pickup_time,
        delivery_time,
        status,
      }),
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${auth_token}`,
      },
    })
      .then((response) => response.json())
      .then((res) => {
        if (res.success) {
          toast.success(res.success);
          fetchDeliveries();
        } else if (res.error) {
          toast.error(res.error);
        } else {
          toast.error("An unexpected error occurred");
        }
      });
  };

  const fetchDeliveries = useCallback(() => {
    if (auth_token) {
      fetch(`${server}/assigned_deliveries`, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${auth_token}`,
        },
      })
        .then((response) => response.json())
        .then((res) => {
          setDeliveries(res);
        });
    }
  }, [auth_token]);

  useEffect(() => {
    fetchDeliveries();
  }, [auth_token, fetchDeliveries]);

  const contextData = {
    deliveries,
    addDelivery,
    fetchDeliveries,
  };

  return (
    <DeliveryContext.Provider value={contextData}>
      {children}
    </DeliveryContext.Provider>
  );
}