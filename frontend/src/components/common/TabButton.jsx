import React from 'react';

const TabButton = ({ id, icon: Icon, label, isActive, onClick }) => (
  <button
    onClick={() => onClick(id)}
    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
      isActive 
        ? 'bg-teal-500 text-white' 
        : 'text-gray-600 hover:bg-gray-100'
    }`}
  >
    <Icon size={20} />
    <span className="font-medium">{label}</span>
  </button>
);

export default TabButton;