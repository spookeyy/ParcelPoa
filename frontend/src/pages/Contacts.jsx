import React, { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import { Send, MapPin, Phone, Mail } from "lucide-react";
import parcelpoaOffice2 from "../assets/parcelpoaOffice2.png";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [message, setMessage] = useState("");
  const scriptURL =
    "https://script.google.com/macros/s/AKfycbwfS4qNLjkTlsV59stdOjcE8png0nwghY1QVOPCFToBlqwqtIzoVOqzyEav8P3A-M3kAg/exec";

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(scriptURL, { method: "POST", body: new FormData(e.target) })
      .then((response) => {
        setMessage("Message sent successfully");
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => setMessage(""), 2000);
      })
      .catch((error) => {
        console.error("Error!", error.message);
        setMessage("An error occurred. Please try again.");
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 to-yellow-200">
      <Navbar />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 py-16 mt-16"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-lg shadow-lg p-8"
          >
            <h2 className="text-3xl font-bold mb-6 text-yellow-600">
              Contact Us
            </h2>
            <form
              className="space-y-4"
              onSubmit={handleSubmit}
              name="submit-to-google-sheet"
            >
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
                  placeholder="Your Name"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
                  placeholder="Your Email"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  value={formData.message}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
                  placeholder="Your Message"
                  required
                ></textarea>
              </div>
              <div className="flex justify-end">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-yellow-500 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                >
                  <Send className="mr-2 h-4 w-4" />
                  Send Message
                </motion.button>
              </div>
            </form>
            {message && <p className="mt-4 text-green-600">{message}</p>}
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-white rounded-lg shadow-lg p-8"
          >
            <h2 className="text-3xl font-bold mb-6 text-yellow-600">
              Get in Touch
            </h2>
            <div className="space-y-4">
              <div className="flex items-center">
                <MapPin className="h-6 w-6 text-yellow-500 mr-2" />
                <p>Tom Mboya Street, Nairobi, Kenya</p>
              </div>
              <div className="flex items-center">
                <Phone className="h-6 w-6 text-yellow-500 mr-2" />
                <p>+254 793 057 720</p>
              </div>
              <div className="flex items-center">
                <Mail className="h-6 w-6 text-yellow-500 mr-2" />
                <p>info@parcelpoa.com</p>
              </div>
            </div>
            <motion.img
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              src={parcelpoaOffice2}
              alt="ParcelPoa Office"
              className="mt-6 rounded-lg shadow-md w-full h-64 object-cover"
            />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

export default Contact;
