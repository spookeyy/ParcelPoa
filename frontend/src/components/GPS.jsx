import React, { useEffect, useState } from 'react';
import L from 'leaflet';
import {server} from "../../config.json";
function GPS() {
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);
  const [position, setPosition] = useState({ latitude: 51.505, longitude: -0.09 });

  useEffect(() => {
    const initialMap = L.map('map').setView([position.latitude, position.longitude], 13);
    console.log("Initial Map:", initialMap);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
    }).addTo(initialMap);

    const initialMarker = L.marker([position.latitude, position.longitude]).addTo(initialMap);
    setMap(initialMap);
    setMarker(initialMarker);

    function fetchLatestLocation() {
      fetch(`${server}/location`)
        .then(response => response.json())
        .then(data => {
          if (data.error) {
            console.error(data.error);
          } else {
            const { latitude, longitude } = data;
            setPosition({ latitude, longitude });
            initialMarker.setLatLng([latitude, longitude]);
            initialMap.setView([latitude, longitude], 13);
          }
        })
        .catch(error => console.error('Error fetching location:', error));
    }

    fetchLatestLocation();

    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          setPosition({ latitude, longitude });
          initialMarker.setLatLng([latitude, longitude]);
          initialMap.panTo([latitude, longitude]);

          fetch(`${server}/location`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ latitude, longitude }),
          });
        },
        (error) => console.error('Error fetching location', error),
        { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
    }

    return () => {
      if (map) {
        map.remove();
      }
    };
  }, []);

  return (
    <div>
      <h1>GPS Tracker</h1>
      <div id="map" style={{ height: '400px' }}></div>
    </div>
  );
}

export default GPS;
