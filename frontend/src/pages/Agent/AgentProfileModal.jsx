import React, { useState } from "react";
import Modal from "../Modal"; // Make sure Modal is correctly imported
import AgentProfile from "../AgentProfile";

export default function AgentProfileModal() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="flex justify-center items-center h-screen bg-gray-200">
      <button
        onClick={openModal}
        className="bg-blue-600 text-white py-3 px-6 rounded shadow-lg hover:bg-blue-700 transition duration-300"
      >
        Open Profile Modal
      </button>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <AgentProfile onClose={closeModal} />
      </Modal>
    </div>
  );
}
