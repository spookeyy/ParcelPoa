import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import jsPDF from "jspdf";
import axios from "axios";

const agents = [
  { name: "Agent 1", email: "pmbugua276@gmail.com", status: "Online" },
  { name: "Agent 2", email: "agent2@example.com", status: "Away" },
  { name: "Agent 3", email: "agent3@example.com", status: "Online" },
];

const statusColors = {
  Online: "bg-green-100 text-green-800",
  Away: "bg-yellow-100 text-yellow-800",
  Offline: "bg-red-100 text-red-800",
};

const Invoice = () => {
  const location = useLocation();
  const { order } = location.state || {};
  const [selectedAgentEmail, setSelectedAgentEmail] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [documentCode, setDocumentCode] = useState("");

  useEffect(() => {
    if (order) {
      setSelectedAgentEmail(order.agentEmail || "");
      setClientEmail(order.clientEmail || "pmbugua276@gmail.com"); // Sample client email for demo

      // Generate a unique document code when the order is loaded
      const code = `INV-${order.id}-${Date.now()}`;
      setDocumentCode(code);
    }
  }, [order]);

  if (!order) {
    return <p className="text-red-500">No order data found</p>;
  }

  const generatePDF = (isReceipt) => {
    const doc = new jsPDF();
    const logoUrl = "/src/assets/Logo.png"; // Path to the logo image

    // Header
    doc.addImage(logoUrl, "PNG", 10, 10, 50, 20); // x, y, width, height
    doc.setFontSize(20);
    doc.setTextColor(0, 0, 0);
    doc.setFont("helvetica", "bold");
    doc.text("ParcelPoa", 10, 30);

    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text("Nairobi, Caxton House", 10, 40);
    doc.text("Nairobi, Kenya, 001", 10, 50);
    doc.text("Phone: +254701 571 745", 10, 60);
    doc.text("Email: pmbugua276@gmail.com", 10, 70);

    // Title
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(0, 0, 0);
    doc.text(isReceipt ? "Receipt" : "Invoice", 10, 90);

    // Document Code
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text(`Document Code: ${documentCode}`, 10, 105);

    // Order Details
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text(`Order ID: ${order.id}`, 10, 120);
    doc.text(`Date: ${order.date}`, 10, 130);
    doc.text(`Name: ${order.name}`, 10, 140);
    doc.text(`Address: ${order.address}`, 10, 150);
    doc.text(`Status: ${order.status}`, 10, 160);
    doc.text(`Client Email: ${clientEmail}`, 10, 170);

    // Date on Receipt
    if (isReceipt) {
      const receiptDate = new Date().toLocaleDateString(); // Get current date
      doc.text(`Date: ${receiptDate}`, 10, 185); // Display date on receipt
    }

    // Line Items Table
    const lineItems = [
      { description: "Item 1", quantity: 1, price: 100.0 },
      { description: "Item 2", quantity: 2, price: 50.0 },
    ];

    let startY = 200;
    const tableX = 10;
    const tableWidth = 190;
    const rowHeight = 10;
    const headerColor = [0, 100, 255]; // Dark blue color
    const rowColor = [240, 240, 240]; // Light gray color

    // Table Header
    doc.setFillColor(...headerColor);
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(12);
    doc.rect(tableX, startY, tableWidth, rowHeight, "F");
    doc.text("Description", tableX + 5, startY + 7);
    doc.text("Quantity", tableX + 100, startY + 7);
    doc.text("Price", tableX + 160, startY + 7);

    startY += rowHeight;

    // Table Rows
    doc.setTextColor(0, 0, 0);
    lineItems.forEach((item, index) => {
      if (index % 2 === 0) {
        doc.setFillColor(...rowColor);
        doc.rect(tableX, startY, tableWidth, rowHeight, "F");
      }
      doc.text(item.description, tableX + 5, startY + 7);
      doc.text(item.quantity.toString(), tableX + 100, startY + 7);
      doc.text(item.price.toFixed(2), tableX + 160, startY + 7);
      startY += rowHeight;
    });

    // Total Cost on Receipt
    if (isReceipt) {
      const totalCost = lineItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
      doc.setFontSize(12);
      doc.text(`Total Cost: $${totalCost.toFixed(2)}`, tableX, startY + 10);
    }

    // Footer
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text(
      isReceipt
        ? "Thank you for your purchase!"
        : "Thank you for your business!",
      tableX,
      startY + 20
    );
    doc.text("Terms and conditions apply.", tableX, startY + 30);

    // Footer Line
    doc.setDrawColor(0, 0, 0);
    doc.line(tableX, startY + 35, tableX + tableWidth, startY + 35);

    return doc.output("blob");
  };

  const handleGenerateReceipt = () => {
    const receiptBlob = generatePDF(true); // Generate receipt
    const url = URL.createObjectURL(receiptBlob);
    window.open(url, "_blank"); // Open in a new tab
  };

  const handleApproveAndSend = async () => {
    if (!selectedAgentEmail || !clientEmail) {
      alert("Please select an agent and ensure the client email is provided.");
      return;
    }

    // Approve the order
    try {
      await axios.post("/approve-order", { orderId: order.id });
      alert("Order approved successfully!");
    } catch (error) {
      alert("Failed to approve order. Please try again.");
      console.error("Error approving order:", error.response || error.message);
      return;
    }

    // Generate PDF for receipt and invoice
    const receiptBlob = generatePDF(true); // Receipt
    const invoiceBlob = generatePDF(false); // Invoice

    // Send email with receipt to client
    const formDataClient = new FormData();
    formDataClient.append("file", receiptBlob, `receipt_${documentCode}.pdf`);
    formDataClient.append("email", clientEmail);

    try {
      await axios.post("/send-receipt", formDataClient, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Receipt sent to client successfully!");
    } catch (error) {
      alert("Failed to send receipt. Please try again.");
      console.error("Error sending receipt:", error.response || error.message);
    }

    // Send email with order details to agent
    const formDataAgent = new FormData();
    formDataAgent.append("agentEmail", selectedAgentEmail);
    formDataAgent.append(
      "orderDetails",
      JSON.stringify({
        orderId: order.id,
        date: order.date,
        name: order.name,
        address: order.address,
        status: order.status,
        items: [
          { description: "Item 1", quantity: 1 },
          { description: "Item 2", quantity: 2 },
        ],
      })
    );

    try {
      await axios.post("/send-order-details", formDataAgent, {
        headers: { "Content-Type": "application/json" },
      });
      alert("Order details sent to agent successfully!");
    } catch (error) {
      alert("Failed to send order details. Please try again.");
      console.error(
        "Error sending order details:",
        error.response || error.message
      );
    }
  };

  return (
    <div className="p-8 max-w-5xl mx-auto bg-white rounded-lg shadow-md border border-gray-200">
      <h1 className="text-4xl font-bold mb-8 text-gray-800">Invoice</h1>
      <div className="bg-gray-50 p-8 rounded-lg shadow-md border border-gray-200">
        <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-semibold text-gray-700 mb-6">
              Order Details
            </h2>
            <ul className="space-y-4">
              <li className="text-gray-600">
                <strong>Order ID:</strong> {order.id}
              </li>
              <li className="text-gray-600">
                <strong>Date:</strong> {order.date}
              </li>
              <li className="text-gray-600">
                <strong>Name:</strong> {order.name}
              </li>
              <li className="text-gray-600">
                <strong>Address:</strong> {order.address}
              </li>
              <li className="text-gray-600">
                <strong>Status:</strong> {order.status}
              </li>
              <li className="text-gray-600">
                <strong>Client Email:</strong> {clientEmail}
              </li>
              <li className="text-gray-600">
                <strong>Document Code:</strong> {documentCode}
              </li>
            </ul>
            <div className="mt-8">
              <h2 className="text-2xl font-semibold text-gray-700 mb-4">
                Client Email
              </h2>
              <input
                type="email"
                placeholder="Client email"
                value={clientEmail}
                onChange={(e) => setClientEmail(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md"
                disabled
              />
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-gray-700 mb-6">
              Actions
            </h2>
            <button
              onClick={handleGenerateReceipt}
              className="bg-green-600 text-white py-3 px-6 rounded-md shadow-md hover:bg-green-700 transition duration-150 mb-4 w-full"
            >
              Generate Receipt
            </button>
            <button
              onClick={handleApproveAndSend}
              className="bg-purple-600 text-white py-3 px-6 rounded-md shadow-md hover:bg-purple-700 transition duration-150 w-full"
            >
              Approve and Send Invoice
            </button>
            <div className="mt-8">
              <h2 className="text-2xl font-semibold text-gray-700 mb-4">
                Select Agent
              </h2>
              <div className="relative">
                <div className="border border-gray-300 p-3 rounded-md shadow-sm">
                  {agents.map((agent) => (
                    <div
                      key={agent.email}
                      className={`flex items-center p-2 mb-2 cursor-pointer ${
                        selectedAgentEmail === agent.email ? "bg-gray-200" : ""
                      }`}
                      onClick={() => setSelectedAgentEmail(agent.email)}
                    >
                      <span
                        className={`w-3 h-3 rounded-full ${
                          statusColors[agent.status]
                        } mr-3`}
                      ></span>
                      <div>
                        <div className="font-semibold">{agent.name}</div>
                        <div className="text-sm text-gray-600">
                          {agent.email}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Invoice;
