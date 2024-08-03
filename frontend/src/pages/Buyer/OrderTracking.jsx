import React, { useEffect } from "react";
import { useTracking } from "../../Context/TrackingContext";
import { useParams } from "react-router-dom";
import { FaBox, FaTruck, FaPlane, FaCheckCircle } from "react-icons/fa";

function OrderTracking() {
  const { trackingNumber } = useParams();
  const { trackingData, fetchTrackingData, loading, error } = useTracking();

  useEffect(() => {
    if (trackingNumber) {
      fetchTrackingData(trackingNumber);
    }
  }, [trackingNumber, fetchTrackingData]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="p-4 max-w-md mx-auto pt-20 flow-root">
      <ul role="list" className="-mb-8">
        {trackingData.map((track, index) => (
          <li key={index}>
            <div className="relative pb-8">
              {index !== trackingData.length - 1 && (
                <span
                  className="absolute left-4 top-4 -ml-px h-full w-0.5 bg-gray-200"
                  aria-hidden="true"
                ></span>
              )}
              <div className="relative flex space-x-3">
                <div>
                  <span className="h-8 w-8 rounded-full bg-gray-400 flex items-center justify-center ring-8 ring-white">
                    {track.status === "Scheduled" && (
                      <FaBox className="h-5 w-5 text-white" />
                    )}
                    {track.status === "In Transit" && (
                      <FaTruck className="h-5 w-5 text-white" />
                    )}
                    {track.status === "Out for Delivery" && (
                      <FaPlane className="h-5 w-5 text-white" />
                    )}
                    {track.status === "delivered" && (
                      <FaCheckCircle className="h-5 w-5 text-white" />
                    )}
                  </span>
                </div>
                <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                  <div>
                    <p className="text-sm text-gray-500">
                      {track.status} at{" "}
                      <a href="#" className="font-medium text-gray-900">
                        {track.location}
                      </a>
                    </p>
                  </div>
                  <div className="whitespace-nowrap text-right text-sm text-gray-500">
                    <time dateTime={track.timestamp}>
                      {new Date(track.timestamp).toLocaleDateString()}
                    </time>
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default OrderTracking;
