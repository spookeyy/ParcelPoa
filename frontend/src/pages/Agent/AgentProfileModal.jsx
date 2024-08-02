import React, { useState } from "react";
import Modal from "../Modal"; // Make sure Modal is correctly imported
import AgentProfile from "../AgentProfile";

export default function AgentProfileModal() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div>
      <button
        onClick={openModal}
        className="bg-blue-500 text-white py-4 px-4 rounded"
      >
        Open Profile Modal
      </button>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <AgentProfile onClose={closeModal} />
      </Modal>
    </div>
  );
}
