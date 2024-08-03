/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import React, { createContext, useState, useContext } from "react";
import { toast } from "react-toastify";
import { server } from "../../config.json";

const TrackingContext = createContext();

export const useTracking = () => {
  return useContext(TrackingContext);
};

export const TrackingProvider = ({ children }) => {
  const [trackingData, setTrackingData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTrackingData = (trackingNumber) => {
    setLoading(true);
    fetch(`${server}/track/${trackingNumber}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.message) {
          toast.error(data.message);
          setError(data.message);
        } else {
          setTrackingData(data);
        }
        setLoading(false);
      })
      .catch((err) => {
        toast.error("Failed to fetch tracking data");
        setError(err.message);
        setLoading(false);
      });
  };

  return (
    <TrackingContext.Provider
      value={{ trackingData, loading, error, fetchTrackingData }}
    >
      {children}
    </TrackingContext.Provider>
  );
};
