import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import jsPDF from 'jspdf';
import axios from 'axios'; // For sending the PDF

const Invoice = () => {
  const location = useLocation();
  const { order } = location.state || {};
  const [email, setEmail] = useState('');

  if (!order) {
    return <p className="text-red-500">No order data found</p>;
  }

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text(`Invoice for Order ID: ${order.id}`, 10, 10);
    doc.setFontSize(12);
    doc.text(`Date: ${order.date}`, 10, 20);
    doc.text(`Name: ${order.name}`, 10, 30);
    doc.text(`Address: ${order.address}`, 10, 40);
    doc.text(`Status: ${order.status}`, 10, 50);
    doc.text(`Type: ${order.type}`, 10, 60);

    // Save PDF
    doc.save(`invoice_${order.id}.pdf`);
  };

  const handleSendInvoice = async () => {
    // Generate PDF as a blob
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text(`Invoice for Order ID: ${order.id}`, 10, 10);
    doc.setFontSize(12);
    doc.text(`Date: ${order.date}`, 10, 20);
    doc.text(`Name: ${order.name}`, 10, 30);
    doc.text(`Address: ${order.address}`, 10, 40);
    doc.text(`Status: ${order.status}`, 10, 50);
    doc.text(`Type: ${order.type}`, 10, 60);
    const pdfBlob = doc.output('blob');

    // Prepare the form data
    const formData = new FormData();
    formData.append('file', pdfBlob, `invoice_${order.id}.pdf`);
    formData.append('email', email);

    try {
      // Replace this URL with your backend endpoint
      const response = await axios.post('/send-invoice', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      alert('Invoice sent successfully!');
    } catch (error) {
      alert('Failed to send invoice. Please try again.');
      console.error('Error sending invoice:', error);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-gray-50 rounded-lg shadow-md border border-gray-200">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Invoice</h1>
      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Order ID: {order.id}</h2>
        <p className="text-gray-600"><strong>Date:</strong> {order.date}</p>
        <p className="text-gray-600"><strong>Name:</strong> {order.name}</p>
        <p className="text-gray-600"><strong>Address:</strong> {order.address}</p>
        <p className="text-gray-600"><strong>Status:</strong> {order.status}</p>
        <p className="text-gray-600"><strong>Type:</strong> {order.type}</p>
        <button
          onClick={generatePDF}
          className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition duration-150 mt-4"
        >
          Generate PDF
        </button>
        <div className="mt-6">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter client email"
            className="border border-gray-300 p-2 rounded w-full"
          />
          <button
            onClick={handleSendInvoice}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-150 mt-4"
          >
            Send Invoice
          </button>
        </div>
      </div>
    </div>
  );
};

export default Invoice;
