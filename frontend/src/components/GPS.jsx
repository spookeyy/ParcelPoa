/* eslint-disable react/prop-types */
import React, { useEffect, useState, useCallback } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { server } from "../../config.json";

const mapContainerStyle = {
  height: "400px",
  width: "100%",
};

const defaultCenter = {
  lat: 0,
  lng: 0,
};

export default function GPS({ parcel_id }) {
  const [position, setPosition] = useState(defaultCenter);

  const fetchLatestLocation = useCallback(() => {
    console.log("Fetching latest location from server...");
    fetch(`${server}/location?parcel_id=${parcel_id}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          console.error("Server Error:", data.error);
        } else {
          const { latitude, longitude } = data;
          console.log("Latest Location:", latitude, longitude);
          setPosition({ lat: latitude, lng: longitude });
        }
      })
      .catch((error) => console.error("Error fetching location:", error));
  }, [parcel_id]);

  useEffect(() => {
    fetchLatestLocation();

    // Fetch location every 5 minutes
    const intervalId = setInterval(fetchLatestLocation, 300000);

    return () => {
      clearInterval(intervalId);
    };
  }, [parcel_id, fetchLatestLocation]);

  return (
    <div>
      <h6 className="text-md font-bold mb-4">GPS Tracker</h6>
      <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={position}
          zoom={13}
        >
          <Marker position={position} />
        </GoogleMap>
      </LoadScript>
    </div>
  );
}
