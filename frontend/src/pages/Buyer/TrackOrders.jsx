
import React, { useState } from 'react';

const TrackOrder = () => {
  const [orderId, setOrderId] = useState('');
  const [trackingInfo, setTrackingInfo] = useState(null);
  const [error, setError] = useState('');

  // Sample order data (in a real application, this would come from an API)
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

    // Validate order ID
    if (!orderId) {
      setError('Please enter a valid order ID.');
      return;
    }

    // Simulate fetching order data
    const order = sampleOrderData[orderId];
    if (order) {
      setTrackingInfo(order);
    } else {
      setError('Order not found. Please check your order ID.');
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Navbar */}
      <nav className="bg-indigo-600 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-white text-2xl font-bold">Parcel Tracker</h1>
          <ul className="flex space-x-4">
            <li><a href="/" className="text-white hover:underline">Home</a></li>
            <li><a href="/about" className="text-white hover:underline">About</a></li>
            <li><a href="/contact" className="text-white hover:underline">Contact</a></li>
            <li><a href="/track-order" className="text-white hover:underline">Track Order</a></li>
          </ul>
        </div>
      </nav>

      <div className="container mx-auto p-8">
        <h2 className="text-3xl font-semibold mb-6 text-center">Track Your Order</h2>

        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

        <form onSubmit={handleTrackOrder} className="flex justify-center mb-8">
          <input
            type="text"
            placeholder="Enter Order ID"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            className="border border-gray-300 rounded-md px-4 py-2 w-1/3"
            required
          />
          <button
            type="submit"
            className="ml-2 bg-indigo-600 text-white rounded-md px-4 py-2 hover:bg-indigo-700"
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

        {/* Image Containers Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <img src="https://plus.unsplash.com/premium_photo-1661592933016-6e4ccabcf36d?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cGxhY2UlMjBvcmRlcnxlbnwwfHwwfHx8MA%3D%3D" alt="Order Placed" className="w-full h-32 object-cover rounded-md" />
            <h5 className="text-center mt-2">Order Placed</h5>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <img src="https://plus.unsplash.com/premium_photo-1681487829842-2aeff98f8b63?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bG9naXN0aWNzJTIwc2VydmljZXN8ZW58MHx8MHx8fDA%3D" alt="In Transit" className="w-full h-32 object-cover rounded-md" />
            <h5 className="text-center mt-2">In Transit</h5>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <img src="https://plus.unsplash.com/premium_photo-1682090260563-191f8160ca48?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZGVsaXZlcnl8ZW58MHx8MHx8fDA%3D" alt="Out for Delivery" className="w-full h-32 object-cover rounded-md" />
            <h5 className="text-center mt-2">Out for Delivery</h5>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <img src="https://images.unsplash.com/photo-1605882174146-a464b70cf691?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZGVsaXZlcnl8ZW58MHx8MHx8fDA%3D" alt="Delivered" className="w-full h-32 object-cover rounded-md" />
            <h5 className="text-center mt-2">Delivered</h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackOrder;