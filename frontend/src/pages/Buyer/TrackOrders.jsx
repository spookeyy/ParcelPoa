import React, { useState } from 'react';

const TrackOrders = () => {
  const [orderId, setOrderId] = useState('');
  const [trackingInfo, setTrackingInfo] = useState(null);
  const [error, setError] = useState('');

  
  const sampleOrderData = {
    '12345': {
      status: 'In Transit',
      estimatedDelivery: '2024-08-05',
      items: [
        { description: 'Parcel Delivery', quantity: 1, price: 50.00 },
        { description: 'Insurance Fee', quantity: 1, price: 5.00 },
      ],
    },
    '67890': {
      status: 'Delivered',
      estimatedDelivery: '2024-07-29',
      items: [
        { description: 'Express Delivery', quantity: 2, price: 30.00 },
      ],
    },
  };

  const handleTrackOrder = (e) => {
    e.preventDefault();
    setError('');
    setTrackingInfo(null);

   
    if (!orderId) {
      setError('Please enter a valid order ID.');
      return;
    }

    
    const order = sampleOrderData[orderId];
    if (order) {
      setTrackingInfo(order);
    } else {
      setError('Order not found. Please check your order ID.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-6 text-center">Track Your Order</h2>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <form onSubmit={handleTrackOrder} className="space-y-4">
          <div>
            <label htmlFor="orderId" className="block text-sm font-medium text-gray-700">Order ID</label>
            <input
              type="text"
              id="orderId"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Track Order
          </button>
        </form>

        {trackingInfo && (
          <div className="mt-6 p-4 bg-gray-50 border border-gray-300 rounded-lg">
            <h3 className="text-lg font-semibold">Order Status: {trackingInfo.status}</h3>
            <p className="text-sm text-gray-600">Estimated Delivery: {trackingInfo.estimatedDelivery}</p>
            <h4 className="mt-4 font-semibold">Items:</h4>
            <ul className="list-disc list-inside">
              {trackingInfo.items.map((item, index) => (
                <li key={index}>
                  {item.description} - Quantity: {item.quantity} - Price: ${item.price.toFixed(2)}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrackOrders;