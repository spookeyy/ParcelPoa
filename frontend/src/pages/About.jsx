import React from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import ParcelPoaTeam from "../assets/ParcelPoaTeam.png";
import DeliveryAction from "../assets/DeliveryAction.png";
import OurServices from "../assets/OurServices.png";

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } },
};

const slideIn = {
  hidden: { x: -50, opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { duration: 0.5 } },
};

export default function About() {
  return (
    <>
      <Navbar />
      <div className="bg-gray-100 min-h-screen p-8">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="container mx-auto bg-white shadow-lg rounded-lg overflow-hidden"
        >
          <div className="bg-yellow-800 p-8 relative overflow-hidden">
            <motion.h1
              variants={slideIn}
              className="text-4xl font-bold text-white z-10 relative"
            >
              About ParcelPoa
            </motion.h1>
            <motion.img
              initial={{ opacity: 0, scale: 1.2 }}
              animate={{ opacity: 0.2, scale: 1 }}
              transition={{ duration: 1 }}
              src={ParcelPoaTeam}
              alt="Delivery background"
              className="absolute inset-0 w-full h-full object-cover mix-blend-overlay"
            />
          </div>
          <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div variants={fadeIn}>
              <h2 className="text-2xl font-bold mb-4 text-yellow-600">
                Who We Are
              </h2>
              <p className="mb-6 text-gray-700">
                ParcelPoa is a leading delivery service provider dedicated to
                connecting businesses and individuals through reliable and
                efficient delivery solutions. Founded in 2024, our mission is to
                make package delivery as easy and convenient as possible.
              </p>
              <motion.img
                whileHover={{ scale: 1.05 }}
                src={ParcelPoaTeam}
                alt="ParcelPoa team"
                className="rounded-lg shadow-md mb-6"
              />
            </motion.div>

            <motion.div variants={fadeIn}>
              <h2 className="text-2xl font-bold mb-4 text-yellow-600">
                Our Mission
              </h2>
              <p className="mb-6 text-gray-700">
                Our mission is to provide top-notch delivery services that
                exceed our customers' expectations. We aim to ensure timely,
                safe, and cost-effective delivery solutions for businesses and
                individuals alike.
              </p>
              <motion.img
                whileHover={{ scale: 1.05 }}
                src={DeliveryAction}
                alt="Delivery in action"
                className="rounded-lg shadow-md mb-6"
              />
            </motion.div>

            <motion.div variants={fadeIn}>
              <h2 className="text-2xl font-bold mb-4 text-yellow-600">
                What We Offer
              </h2>
              <ul className="grid grid-cols-2 gap-4 list-disc list-inside mb-6 text-gray-700">
                <li>Same-day delivery</li>
                <li>Express delivery services</li>
                <li>Real-time tracking</li>
                <li>Secure packaging</li>
                <li>24/7 customer support</li>
                <li>Fast and reliable delivery</li>
                <li>Flexible delivery options</li>
                <li>Cost-effective pricing</li>
              </ul>
              <motion.img
                whileHover={{ scale: 1.05 }}
                src={OurServices}
                alt="Our services"
                className="rounded-lg shadow-md mb-6"
              />
            </motion.div>

            <motion.div variants={fadeIn}>
              <h2 className="text-2xl font-bold mb-4 text-yellow-600">
                Our Values
              </h2>
              <ul className="list-disc list-inside mb-6 text-gray-700">
                <li>
                  <strong>Customer Satisfaction:</strong> We prioritize our
                  customers' needs and strive to exceed their expectations.
                </li>
                <li>
                  <strong>Integrity:</strong> We conduct our business with
                  honesty and transparency.
                </li>
                <li>
                  <strong>Innovation:</strong> We continuously seek new ways to
                  improve our services and deliver value.
                </li>
                <li>
                  <strong>Community:</strong> We are dedicated to making a
                  positive impact in the communities we serve.
                </li>
              </ul>
            </motion.div>
          </div>

          <motion.div
            variants={fadeIn}
            className="bg-yellow-500 p-8 text-white"
          >
            <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
            <p className="mb-6">
              Have questions or need assistance? Reach out to our customer
              support team at{" "}
              <a
                href="mailto:parcelpoa@gmail.com"
                className="underline hover:text-yellow-200"
              >
                support@parcelpoa.com
              </a>{" "}
              or call us at{" "}
              <a
                href="tel:+254793057720"
                className="underline hover:text-yellow-200"
              >
                +254793057720
              </a>
              .
            </p>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
}
