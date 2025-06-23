import React from 'react';

const BalanceCard = ({ title, amount, color = 'text-gray-800' }) => (
  <div className="bg-white p-4 rounded-lg shadow-sm border">
    <h3 className="text-sm text-gray-500 mb-1">{title}</h3>
    <p className={`text-2xl font-bold ${color}`}>
      ${Math.abs(amount).toFixed(2)}
    </p>
  </div>
);

export default BalanceCard;