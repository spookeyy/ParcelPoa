import React from "react";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import { FloatingWhatsApp } from "react-floating-whatsapp";

export default function Landing() {
  return (
    <div className="bg-white min-h-screen flex flex-col">
      <Navbar />
      <div className="container mx-auto p-8 flex-grow">
        <div
          className="bg-white p-8 rounded-lg shadow-lg"
          style={{ height: "120%" }}
        >
          <main className="py-16 px-4 flex items-center">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
              <div className="flex flex-col justify-center items-start">
                <h8 className="text-6xl font-bold  mb-8">
                  <span className="text-indigo-500">ParcelPoa</span>, Deliver
                  your Order
                </h8>
                <h10 className="text-4xl font-bold  mb-4">
                  Speedy Delivery, Reliable Service
                </h10>
                <p className="text-lg mb-8">
                  At Parcel Poa, we ensure your packages are delivered swiftly
                  and safely, providing you with peace of mind every time.
                </p>
                <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 justify-center md:justify-start">
                  <Link
                    to="/signup"
                    className="bg-indigo-500 text-white font-medium py-2 px-4 rounded-full hover:bg-indigo-600"
                  >
                    Get Started
                  </Link>
                  <Link
                    to="/tracking"
                    className="bg-transparent hover:bg-indigo-500 text-indigo-700 font-semibold hover:text-white py-2 px-4 rounded-full border border-indigo-500 hover:border-transparent"
                  >
                    Track Order
                  </Link>
                </div>
              </div>
              <div className="mt-16 md:mt-0 w-full">
                <img
                  src="https://static.vecteezy.com/system/resources/previews/013/522/695/large_2x/cheerful-delivery-man-happy-young-courier-holding-a-cardboard-box-and-smiling-while-standing-against-white-background-photo.jpg"
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
      </div>
    </div>
  );
}
