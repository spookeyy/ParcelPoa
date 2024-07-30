import React from 'react';

export default function Order_Details() {
  // Sample order data
  const orderData = {
    orderNumber: 'ORD-001',
    date: '2024-07-31',
    items: [
      { name: 'Product A', quantity: 2, price: 10.00 },
      { name: 'Product B', quantity: 1, price: 20.00 },
      { name: 'Product C', quantity: 3, price: 5.00 },
    ],
    shippingInfo: {
      name: 'John Doe',
      address: '123 Main St, Anytown, USA',
      phone: '555-1234',
    },
    total: 65.00,
  };

  // Calculate the total amount of the order
  const totalAmount = orderData.items.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="order-details-container p-6 bg-white shadow-md rounded max-w-2xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Order Details</h1>
      <div className="order-info mb-6">
        <p>Order Number: {orderData.orderNumber}</p>
        <p>Date: {orderData.date}</p>
      </div>
      <table className="w-full border-collapse mb-6">
        <thead>
          <tr>
            <th className="border p-2 text-left">Item</th>
            <th className="border p-2 text-left">Quantity</th>
            <th className="border p-2 text-left">Price</th>
          </tr>
        </thead>
        <tbody>
          {orderData.items.map((item, index) => (
            <tr key={index}>
              <td className="border p-2">{item.name}</td>
              <td className="border p-2">{item.quantity}</td>
              <td className="border p-2">${item.price.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="shipping-info mb-6">
        <h2 className="text-xl font-bold">Shipping Information</h2>
        <p>{orderData.shippingInfo.name}</p>
        <p>{orderData.shippingInfo.address}</p>
        <p>{orderData.shippingInfo.phone}</p>
      </div>
      <div className="total-amount text-right">
        <h3 className="text-lg font-bold">Total: ${totalAmount.toFixed(2)}</h3>
      </div>
    </div>
  );
}
