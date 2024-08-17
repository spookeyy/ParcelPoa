/* eslint-disable react/prop-types */
import React, { useEffect, useState, useRef } from "react";
import L from "leaflet";
import { server } from "../../config.json";

export default function GPS({ parcel_id }) {
  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const [position, setPosition] = useState({
    latitude: 51.505,
    longitude: -0.09,
  });

  useEffect(() => {
    console.log("useEffect triggered");

    if (!mapRef.current) {
      console.log("Initializing map...");
      mapRef.current = L.map("map").setView(
        [position.latitude, position.longitude],
        13
      );
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
      }).addTo(mapRef.current);

      markerRef.current = L.marker([
        position.latitude,
        position.longitude,
      ]).addTo(mapRef.current);
    }

    function fetchLatestLocation() {
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
            markerRef.current.setLatLng([latitude, longitude]);
            mapRef.current.setView([latitude, longitude], 13);
          }
        })
        .catch((error) => console.error("Error fetching location:", error));
    }

    fetchLatestLocation();

    if (navigator.geolocation) {
      console.log("Geolocation supported, setting up watchPosition...");
      const watchId = navigator.geolocation.watchPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          console.log("Geolocation Position:", latitude, longitude);
          setPosition({ latitude, longitude });
          markerRef.current.setLatLng([latitude, longitude]);
          mapRef.current.panTo([latitude, longitude]);

          console.log("Sending updated location to server...");
          fetch(`${server}/location`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ parcel_id, latitude, longitude }),
          });
        },
        (error) => console.error("Error fetching location", error),
        { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
      );

      return () => {
        console.log("Cleaning up...");
        navigator.geolocation.clearWatch(watchId);
        if (mapRef.current) {
          mapRef.current.remove();
          mapRef.current = null;
          markerRef.current = null;
        }
      };
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }, [parcel_id, position.latitude, position.longitude]);

  return (
    <div>
      <h1>GPS Tracker</h1>
      <div id="map" style={{ height: "300px", width: "100%" }}></div>
    </div>
  );
}
