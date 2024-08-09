import React, { useState } from "react";
import Navbar from "../components/Navbar";
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
        setFormData({ name: "", email: "", message: "" }); // Reset form
        setTimeout(() => setMessage(""), 2000); // Clear message after 2 seconds
      })
      .catch((error) => {
        console.error("Error!", error.message);
        setMessage("An error occurred. Please try again.");
      });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      < Navbar />
      <div className="max-w-md mx-auto p-6 bg-white rounded-md shadow-md mt-28">
        <h1 className="text-2xl font-bold mb-4 text-center">Contact Us</h1>
        <form
          className="space-y-4"
          onSubmit={handleSubmit}
          name="submit-to-google-sheet"
        >
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
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Your Message"
              required
            ></textarea>
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="inline-flex items-center text-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-yellow-500 hover:bg-yellow-600 hover:text-black active:bg-yellow-700 focus:outline-none  focus:ring-offset-2 focus:ring"
            >
              Send Message
            </button>
          </div>
        </form>
        {message && <p className="mt-4 text-green-600">{message}</p>}
      </div>
    </div>
  );
}

export default Contact;