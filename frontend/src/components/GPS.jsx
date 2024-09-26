/* eslint-disable react/prop-types */
import React, { useEffect, useState, useRef, useCallback } from "react";
import L from "leaflet";
import { server } from "../../config.json";

export default function GPS({ parcel_id }) {
  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const [position, setPosition] = useState(null);

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
          setPosition({ latitude, longitude });
          if (mapRef.current && markerRef.current) {
            markerRef.current.setLatLng([latitude, longitude]);
            mapRef.current.setView([latitude, longitude], 13);
          }
        }
      })
      .catch((error) => console.error("Error fetching location:", error));
  }, [parcel_id]);

  useEffect(() => {
    if (!mapRef.current) {
      mapRef.current = L.map("map").setView([0, 0], 13);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
      }).addTo(mapRef.current);

      markerRef.current = L.marker([0, 0]).addTo(mapRef.current);
    }

    fetchLatestLocation();

    // Fetch location every 5 minutes
    const intervalId = setInterval(fetchLatestLocation, 300000);

    return () => {
      clearInterval(intervalId);
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
        markerRef.current = null;
      }
    };
  }, [parcel_id, fetchLatestLocation]);

  return (
    <div>
      <h6 className="text-md font-bold mb-4">GPS Tracker</h6>
      <div id="map" style={{ height: "400px", width: "100%" }}></div>
    </div>
  );
}
