import React from "react";
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faShoppingCart, faClipboardList, faUser, faQuestionCircle } from '@fortawesome/free-solid-svg-icons';

export default function Dashboard_Part() {
  const navigate = useNavigate();

  const cards = [
    {
      title: "Messages",
      value: "78",
      description: "Number of unread messages",
      icon: faEnvelope,
      bgColor: "text-purple-500",
      buttonText: "View Messages",
      onClick: () => navigate('/messages-list')
    },
    {
      title: "Orders",
      value: "890",
      description: "Total orders this month",
      icon: faShoppingCart,
      bgColor: "text-teal-500",
      buttonText: "View Orders",
      onClick: () => navigate('/order-list')
    },
    {
      title: "Dispersed Orders",
      value: "23",
      description: "Orders in Delivery Process",
      icon: faClipboardList,
      bgColor: "text-blue-500",
      buttonText: "View Requests",
      onClick: () => navigate('/tracking')
    },
    {
      title: "Agents",
      value: "15",
      description: "Active support agents",
      icon: faUser,
      bgColor: "text-orange-500",
      buttonText: "View Agents",
      onClick: () => navigate('/agent-list')
    },
    {
      title: "Agent Requests",
      value: "23",
      description: "Pending agent requests",
      icon: faQuestionCircle,
      bgColor: "text-red-500",
      buttonText: "View Requests",
      onClick: () => navigate('/agent-requests')
    }
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-gray-100">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 sm:mb-8">Dashboard Overview</h1>
      
      {/* Responsive grid layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
        {cards.map((card, index) => (
          <div 
            key={index} 
            className="bg-white p-4 sm:p-6 lg:p-8 shadow-lg rounded-lg flex flex-col items-start transition-transform transform hover:scale-105 hover:shadow-xl"
            role="region" 
            aria-labelledby={`card-title-${index}`}
          >
            <div className="flex items-center mb-4">
              <div className={`flex-shrink-0 p-3 rounded-full ${card.bgColor} text-white`}>
                <FontAwesomeIcon 
                  icon={card.icon} 
                  className="w-8 h-8 sm:w-10 sm:h-10" 
                  aria-hidden="true"
                />
              </div>
              <div className="ml-3 sm:ml-4">
                <h2 id={`card-title-${index}`} className="text-lg sm:text-xl font-semibold text-gray-900 mb-1">{card.title}</h2>
                <p className="text-xl sm:text-2xl font-bold text-gray-800 mb-1">{card.value}</p>
                <p className="text-gray-500 text-sm sm:text-base">{card.description}</p>
              </div>
            </div>
            <button 
              onClick={card.onClick} 
              className="mt-auto bg-gradient-to-r from-blue-400 to-blue-600 text-white px-4 py-2 sm:px-5 sm:py-3 rounded-lg shadow-md hover:from-blue-500 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
              aria-label={card.buttonText}
            >
              {card.buttonText}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
