import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faSearch, 
  faSpinner, 
  faExclamationCircle, 
  faCheckCircle, 
  faBox, 
  faClock, 
  faTruck, 
  faShippingFast 
} from '@fortawesome/free-solid-svg-icons';
import { useTracking } from '../../Context/TrackingContext';

// Mock function to simulate API call (to be replaced with real API)
const fetchOrderStatus = (trackingNumber) => {
  const mockData = {
    '123456': { status: 'Shipped', estimatedDelivery: '2024-08-05' },
    '654321': { status: 'In Transit', estimatedDelivery: '2024-08-10' },
    '000000': { status: 'Not Found', estimatedDelivery: '' },
  };
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockData[trackingNumber] || mockData['000000']), 1000);
  });
};

const OrderTracking = () => {
  const { trackingNumber } = useParams();
  const { trackingData, fetchTrackingData, loading: contextLoading, error: contextError } = useTracking();
  const [localTrackingNumber, setLocalTrackingNumber] = useState(trackingNumber || '');
  const [orderStatus, setOrderStatus] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (trackingNumber) {
      fetchTrackingData(trackingNumber);
    }
  }, [trackingNumber, fetchTrackingData]);

  useEffect(() => {
    if (localTrackingNumber) {
      setLoading(true);
      fetchOrderStatus(localTrackingNumber)
        .then(status => setOrderStatus(status))
        .catch(() => setError('An error occurred while fetching the order status.'))
        .finally(() => setLoading(false));
    }
  }, [localTrackingNumber]);

  const handleTrackOrder = (e) => {
    e.preventDefault();
    if (!localTrackingNumber) {
      setError('Please enter a tracking number.');
      return;
    }

    setError('');
    setLoading(true);
    fetchOrderStatus(localTrackingNumber)
      .then(status => setOrderStatus(status))
      .catch(() => setError('An error occurred while fetching the order status.'))
      .finally(() => setLoading(false));
  };

  const statusIcon = (status) => {
    switch (status) {
      case 'Shipped':
        return faShippingFast;
      case 'In Transit':
        return faTruck;
      case 'Not Found':
      default:
        return faExclamationCircle;
    }
  };

  return (
    <div className="order-tracking p-8 bg-gradient-to-r from-blue-50 to-blue-200 shadow-xl rounded-xl max-w-4xl mx-auto mt-12">
      <h2 className="text-4xl font-bold text-center mb-6 text-blue-900 flex items-center justify-center">
        <FontAwesomeIcon icon={faBox} className="mr-3 text-5xl text-blue-700 animate-pulse" />
        Track Your Order
      </h2>
      <form onSubmit={handleTrackOrder} className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
        <div className="mb-6 relative">
          <label className="block text-lg font-medium text-gray-700 mb-2">Tracking Number:</label>
          <input
            type="text"
            value={localTrackingNumber}
            onChange={(e) => setLocalTrackingNumber(e.target.value)}
            className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-150 ease-in-out"
            aria-label="Enter tracking number"
            required
          />
          <FontAwesomeIcon icon={faSearch} className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-4 rounded-lg shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-150 ease-in-out flex items-center justify-center"
        >
          <FontAwesomeIcon icon={faSearch} className="mr-2 text-lg" />
          Track Order
        </button>
      </form>
      {loading && !contextLoading && (
        <p className="mt-4 text-blue-600 text-center flex items-center justify-center">
          <FontAwesomeIcon icon={faSpinner} spin className="mr-2 text-2xl" />
          <span>Loading...</span>
        </p>
      )}
      {(error || contextError) && (
        <p className="mt-4 text-red-600 text-center flex items-center justify-center">
          <FontAwesomeIcon icon={faExclamationCircle} className="mr-2 text-2xl" />
          <span>{error || contextError}</span>
        </p>
      )}
      {orderStatus && (
        <div className="mt-6 p-6 border border-gray-200 rounded-lg bg-white shadow-lg">
          <h3 className="text-2xl font-semibold text-blue-800 mb-4 flex items-center">
            <FontAwesomeIcon icon={statusIcon(orderStatus.status)} className="mr-2 text-3xl" />
            <span>Order Status</span>
          </h3>
          <p className="text-xl text-gray-800 mb-2 flex items-center">
            <FontAwesomeIcon icon={statusIcon(orderStatus.status)} className="mr-2 text-xl" />
            Status:
            <span className={`font-semibold ${orderStatus.status === 'Shipped' ? 'text-green-700' : orderStatus.status === 'In Transit' ? 'text-yellow-600' : 'text-red-700'}`}>
              {orderStatus.status}
              {orderStatus.status === 'Shipped' && <FontAwesomeIcon icon={faCheckCircle} className="ml-2 text-green-600" />}
            </span>
          </p>
          <p className="text-xl text-gray-800 flex items-center">
            <FontAwesomeIcon icon={faClock} className="mr-2 text-xl" />
            Estimated Delivery:
            <span className="font-semibold text-gray-700">{orderStatus.estimatedDelivery}</span>
          </p>
        </div>
      )}
      <div className="mt-8 p-4 max-w-3xl mx-auto bg-white shadow-lg rounded-lg">
        <h3 className="text-2xl font-semibold text-blue-800 mb-4 text-center">Tracking History</h3>
        <ul role="list" className="divide-y divide-gray-200">
          {trackingData && trackingData.map((track, index) => (
            <li key={index} className="relative pb-8">
              {index !== trackingData.length - 1 && (
                <span className="absolute left-4 top-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true"></span>
              )}
              <div className="relative flex space-x-3">
                <div>
                  <span className="h-12 w-12 rounded-full bg-gray-500 flex items-center justify-center ring-8 ring-white">
                    {track.status === 'Scheduled' && <FontAwesomeIcon icon={faBox} className="text-white text-2xl" />}
                    {track.status === 'In Transit' && <FontAwesomeIcon icon={faTruck} className="text-white text-2xl" />}
                    {track.status === 'Out for Delivery' && <FontAwesomeIcon icon={faShippingFast} className="text-white text-2xl" />}
                    {track.status === 'Delivered' && <FontAwesomeIcon icon={faCheckCircle} className="text-white text-2xl" />}
                  </span>
                </div>
                <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                  <div>
                    <p className="text-sm text-gray-600">
                      {track.status} at{' '}
                      <a href="#" className="font-medium text-gray-900 hover:underline">
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
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default OrderTracking;
