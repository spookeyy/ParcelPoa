import React from "react";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import { FloatingWhatsApp } from "react-floating-whatsapp";
import FacebookMessengerChat from "./FacebookMessengerChat";
import DeliverPersonel from "../assets/DeliverPersonel.png";
import { motion } from "framer-motion";

export default function Landing() {
  return (
    <div className="bg-white min-h-screen flex flex-col">
      <Navbar />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto p-8 flex-grow flex justify-center items-center"
      >
        <div
          className="bg-white p-8 rounded-lg shadow-lg"
          style={{ height: "auto" }}
        >
          <main className="py-16 px-4 flex items-center justify-center">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
              <motion.div
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="flex flex-col justify-center items-start"
              >
                <motion.h3
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  className="text-4xl md:text-5xl font-bold mb-8 text-center md:text-left"
                >
                  <span className="text-yellow-500 block">ParcelPoa</span>
                  <span className="block">Deliver your Order</span>
                </motion.h3>
                <motion.h5
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                  className="text-2xl font-bold italic mb-4 text-center md:text-left"
                >
                  Speedy Delivery, Reliable Service
                </motion.h5>
                <motion.p
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                  className="text-lg mb-8 text-center md:text-left"
                >
                  At Parcel Poa, we ensure your packages are delivered swiftly
                  and safely, providing you with peace of mind every time.
                </motion.p>
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 1, duration: 0.5 }}
                  className="flex flex-row space-x-4 justify-center"
                >
                  <Link
                    to="/signup"
                    className="bg-yellow-500 hover:bg-yellow-700 text-white font-semibold hover:text-white py-2 px-4 rounded-full border border-yellow-500 hover:border-transparent transition duration-300"
                  >
                    Get Started
                  </Link>
                  <Link
                    to="/tracking"
                    className="bg-transparent hover:bg-yellow-500 text-yellow-700 font-semibold hover:text-white py-2 px-4 rounded-full border border-yellow-500 hover:border-transparent transition duration-300"
                  >
                    Track Order
                  </Link>
                </motion.div>
              </motion.div>
              <motion.div
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="mt-16 md:mt-0 w-full flex justify-center"
              >
                <motion.img
                  src={DeliverPersonel}
                  alt="Delivery Person"
                  className="h-auto w-auto max-w-full object-contain md:h-auto border border-gray-50 rounded-lg shadow-xl"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                />
              </motion.div>
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
          <div className="fixed bottom-16 right-4 z-50">
            <FacebookMessengerChat />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
