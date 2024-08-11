import React from "react";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import { FloatingWhatsApp } from "react-floating-whatsapp";
import FacebookMessengerChat from "./FacebookMessengerChat";

export default function Landing() {
  return (
    <div className="bg-white min-h-screen flex flex-col">
      <Navbar />

      <div className="container mx-auto p-8 flex-grow flex justify-center items-center">
        <div
          className="bg-white p-8 rounded-lg shadow-lg"
          style={{ height: "120%" }}
        >
          <main className="py-16 px-4 flex items-center justify-center">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
              <div className="flex flex-col justify-center items-start">
                <h3 className="text-4xl font-bold  mb-8">
                  <span className="text-yellow-500">ParcelPoa</span>, Deliver
                  your Order
                </h3>
                <h5 className="text-2xl font-bold italic mb-4">
                  Speedy Delivery, Reliable Service
                </h5>
                <p className="text-lg mb-8">
                  At Parcel Poa, we ensure your packages are delivered swiftly
                  and safely, providing you with peace of mind every time.
                </p>
                <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 justify-center md:justify-start">
                  <Link
                    to="/signup"
                    className="bg-yellow-500 text-white font-medium py-2 px-4 rounded-full hover:bg-yellow-600"
                  >
                    Get Started
                  </Link>
                  <Link
                    to="/tracking"
                    className="bg-transparent hover:bg-yellow-500 text-yellow-700 font-semibold hover:text-white py-2 px-4 rounded-full border border-yellow-500 hover:border-transparent"
                  >
                    Track Order
                  </Link>
                </div>
              </div>
              <div className="mt-16 md:mt-0 w-full">
                <img
                  src="./src/assets/DeliveryGuy.png"
                  alt="Delivery Person"
                  className="h-auto max-w-lg ms-auto"
                />
              </div>
            </div>
          </main>

          <FloatingWhatsApp
            phoneNumber="+254705719325"
            accountName="ParcelPoa"
            statusMessage="A Trusted parcel tracking partner"
            avatar="./src/assets/Logo.png"
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

          <FacebookMessengerChat />
        </div>
      </div>
    </div>
  );
}
