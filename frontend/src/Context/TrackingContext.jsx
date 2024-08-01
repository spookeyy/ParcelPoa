import React, { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { server } from '../../config.json';
import { toast } from 'react-toastify';

const TrackingContext = createContext();

export const useTracking = () => {
    return useContext(TrackingContext);
}

export const TrackingProvider = ({ children }) => {
    const [trackingData, setTrackingData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const fetchTrackingData = (parcelId, authToken) => {
        setLoading(true);
        fetch(`${server}/track-parcel/${parcelId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data.message) {
                toast.error(data.message);
                setError(data.message);
            } else {
                setTrackingData(data);
            }
            setLoading(false);
        })
        .catch(err => {
            toast.error("Failed to fetch tracking data");
            setError(err.message);
            setLoading(false);
        });
    };

    return (
        <TrackingContext.Provider value={{ trackingData, loading, error, fetchTrackingData }}>
            {children}
        </TrackingContext.Provider>
    );
}
