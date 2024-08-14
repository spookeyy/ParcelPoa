/* eslint-disable react/prop-types */
import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
} from "react";
import { toast } from "react-toastify";
import { server } from "../../config.json";

const TrackingContext = createContext();

export const useTracking = () => {
  return useContext(TrackingContext);
};

export const TrackingProvider = ({ children }) => {
  const [parcelData, setParcelData] = useState(null);
  const [trackingHistory, setTrackingHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTrackingData = useCallback((trackingNumber, frontendUrl) => {
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
          setParcelData(data.parcel);
          setTrackingHistory(data.tracking_history);
        }
        setLoading(false);
      })
      .catch((err) => {
        toast.error("Failed to fetch tracking data");
        setError(err.message);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (parcelData) {
      setError(null);
    }
  }, [parcelData]);

  const contextData = {
    parcelData,
    trackingHistory,
    loading,
    error,
    fetchTrackingData,
  };

  return (
    <TrackingContext.Provider value={contextData}>
      {children}
    </TrackingContext.Provider>
  );
};
