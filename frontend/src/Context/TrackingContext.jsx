/* eslint-disable react/prop-types */
import React, { createContext, useState, useContext, useEffect } from "react";
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

  const fetchTrackingData = (trackingNumber, frontendUrl) => {
    setLoading(true);
    fetch(`${server}/track/${trackingNumber}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ frontend_url: frontendUrl }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message) {
          toast.error(data.message);
          setError(data.message);
        } else {
          setTrackingData(data.tracking_history);
        }
        setLoading(false);
      })
      .catch((err) => {
        toast.error("Failed to fetch tracking data");
        setError(err.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    if (trackingData.length > 0) {
      setError(null);
    }
  }, [trackingData]);

  const contextdata = { trackingData, loading, error, fetchTrackingData };

  return (
    <TrackingContext.Provider value={contextdata}>
      {children}
    </TrackingContext.Provider>
  );
};
