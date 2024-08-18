/* eslint-disable react/prop-types */
import React, { useEffect, useState, useRef, useCallback } from "react";
import L from "leaflet";
import { server } from "../../config.json";

function getLocationName(latitude, longitude) {
  return fetch(
    `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
  )
    .then((response) => response.json())
    .then((data) => data.display_name)
    .catch((error) => {
      console.error("Error fetching location name:", error);
      return `${latitude}, ${longitude}`;
    });
}

export default function GPS({ parcel_id }) {
  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const [position, setPosition] = useState({
    latitude: 51.505,
    longitude: -0.09,
  });
  const [currentLocation, setCurrentLocation] = useState("");

  const updateLocationOnServer = useCallback(
    (latitude, longitude, locationName) => {
      console.log("Sending location name to server:", locationName);
      fetch(`${server}/location`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ parcel_id, latitude, longitude, locationName }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.error) {
            console.error("Server Error:", data.error);
          } else {
            console.log("Location sent to server successfully");
          }
        })
        .catch((error) => console.error("Error sending location:", error));
    },
    [parcel_id]
  );

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
            if (mapRef.current && markerRef.current) {
              markerRef.current.setLatLng([latitude, longitude]);
              mapRef.current.setView([latitude, longitude], 13);
            }

            getLocationName(latitude, longitude).then((locationName) => {
              console.log("Location Name:", locationName);
              setCurrentLocation(locationName);
              if (markerRef.current) {
                markerRef.current.bindPopup(locationName).openPopup();
              }
              updateLocationOnServer(latitude, longitude, locationName);
            });
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
          if (mapRef.current && markerRef.current) {
            markerRef.current.setLatLng([latitude, longitude]);
            mapRef.current.panTo([latitude, longitude]);
          }

          getLocationName(latitude, longitude).then((locationName) => {
            console.log("Location Name:", locationName);
            updateLocationOnServer(latitude, longitude, locationName);
          });
        },
        (error) => {
          console.error("Error fetching location", error);
          if (error.code === 3) {
            console.log("Geolocation request timed out. Retrying...");
            // Implement retry logic here if needed
          }
        },
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
  }, [
    parcel_id,
    position.latitude,
    position.longitude,
    updateLocationOnServer,
  ]);

  return (
    <div>
      <h6 className="text-md font-bold mb-4">GPS Tracker</h6>
      {/* <p>Current Location: {currentLocation}</p> */}
      <div id="map" style={{ height: "400px", width: "100%" }}></div>
    </div>
  );
}