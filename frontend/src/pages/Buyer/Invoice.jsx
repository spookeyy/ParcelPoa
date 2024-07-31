import React from 'react';

export default function Invoice() {
  const invoiceData = {
    invoiceNumber: 'INV-001',
    date: '2024-07-30',
    customer: {
      name: 'Scarlet Sarah',
      address: '279 Main St, Anytown, Kenya',
      email: 'sarahscarlet641@gmail.com',
    },
    items: [
      { description: 'Parcel Delivery', quantity: 1, price: 50.00 },
      { description: 'Insurance Fee', quantity: 1, price: 5.00 },
      { description: 'Express Delivery', quantity: 1, price: 15.00 },
    ],
  };

  const totalAmount = invoiceData.items.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="invoice-container p-6 bg-white shadow-md rounded">
      <h1 className="text-2xl font-bold mb-4">Invoice</h1>
      <div className="invoice-header mb-6">
        <h2 className="text-xl">Invoice Number: {invoiceData.invoiceNumber}</h2>
        <p>Date: {invoiceData.date}</p>
        <h3 className="mt-4">Bill To:</h3>
        <p>{invoiceData.customer.name}</p>
        <p>{invoiceData.customer.address}</p>
        <p>{invoiceData.customer.email}</p>
      </div>

      <table className="w-full border-collapse mb-6">
        <thead>
          <tr>
            <th className="border p-2 text-left">Description</th>
            <th className="border p-2 text-left">Quantity</th>
            <th className="border p-2 text-left">Price</th>
          </tr>
        </thead>
        <tbody>
          {invoiceData.items.map((item, index) => (
            <tr key={index}>
              <td className="border p-2">{item.description}</td>
              <td className="border p-2">{item.quantity}</td>
              <td className="border p-2">${item.price.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="total-amount text-right">
        <h3 className="text-lg font-bold">Total: ${totalAmount.toFixed(2)}</h3>
      </div>

      <footer className="mt-6">
        <p className="text-sm">Thank you for your business and services!</p>
      </footer>
    </div>
  );
}
