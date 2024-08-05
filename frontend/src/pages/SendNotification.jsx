import React, { useState } from "react";
import { toast } from "react-toastify";

const SendNotification = () => {
  const [userId, setUserId] = useState("");
  const [message, setMessage] = useState("");
  const [notificationType, setNotificationType] = useState("Email");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      user_id: userId,
      message: message,
      type: notificationType,
    };

    try {
      const response = await fetch("/send_notification", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const result = await response.json();
        toast.success(result.message);
      } else {
        throw new Error("Network response was not ok.");
      }
    } catch (error) {
      toast.error(error.message);
      console.error("Error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4 bg-gray-100 rounded lg:p-8 shadow sm:p-12 md:p-16 ">
      <input
        className="input "
        type="number"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
        placeholder="User ID"
        required
      />
      <textarea
        className="input"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Notification message"
        required
      />
      <select
        className="input"
        value={notificationType}
        onChange={(e) => setNotificationType(e.target.value)}
      >
        <option value="Email">Email</option>
        <option value="SMS">SMS</option>
        <option value="App">App</option>
      </select>
      <button type="submit" className="btn btn-primary">Send Notification</button>
    </form>
  );
};

export default SendNotification;
