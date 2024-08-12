import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FloatingWhatsApp } from "react-floating-whatsapp";

export default function CommunicationTools() {
  const [message, setMessage] = useState("");
  const [recipient, setRecipient] = useState("");
  const [sendingMethod, setSendingMethod] = useState("platform"); // 'platform' or 'sms'
  const navigate = useNavigate();

  const handleSendMessage = (e) => {
    e.preventDefault();
    // Handle sending message logic here
    console.log("Sending message:", { recipient, message, sendingMethod });

    // After sending the message, you might want to redirect or clear the form
    setMessage("");
    setRecipient("");
    // For demonstration, let's just navigate back
    navigate("/agent/dashboard");
  };

  return (
    <div className="flex flex-col h-screen p-6 bg-white rounded shadow-md relative pt-32">
      {/* Back Button */}
      <button
        onClick={() => navigate("/dashboard")}
        className="absolute top-4 left-4 bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600"
      >
        Back
      </button>

      <div className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-md bg-gray-100 p-6 rounded-lg shadow-md">
          <h1 className="text-3xl font-bold mb-6 text-center">Communication Tools</h1>

          <form onSubmit={handleSendMessage} className="space-y-6">
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Recipient:</label>
              <input
                type="text"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded"
                placeholder="Enter recipient's contact or username"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Message:</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded"
                rows="6"
                placeholder="Type your message here..."
                required
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 mb-2">Sending Method:</label>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="platform"
                  name="sendingMethod"
                  value="platform"
                  checked={sendingMethod === "platform"}
                  onChange={() => setSendingMethod("platform")}
                  className="mr-2"
                />
                <label htmlFor="platform" className="text-gray-700">
                  Send via Platform
                </label>
                <input
                  type="radio"
                  id="sms"
                  name="sendingMethod"
                  value="sms"
                  checked={sendingMethod === "sms"}
                  onChange={() => setSendingMethod("sms")}
                  className="ml-4 mr-2"
                />
                <label htmlFor="sms" className="text-gray-700">
                  Send via SMS
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 w-full"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>

      <FloatingWhatsApp
        phoneNumber="+254715333522"
        accountName="ParcelPoa"
        statusMessage="A Trusted parcel tracking partner"
        avatar="./src/assets/favicon.ico"
        banner="./src/assets/favicon.ico"
        chatMessage="Hello, how can we help you?"
        darkMode
        allowEsc
        allowClickAway
        notification
        notificationSound
        notificationColor="green"
        notificationTitle="Chat with us"
        notificationMessage="Thank you for your message"
        notificationTimestamp="Just now"
        notificationDuration={2000}
      />
    </div>
  );
}
