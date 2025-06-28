import React from 'react';

const FriendItem = ({ friend }) => (
  <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow hover:bg-gray-50 transition group">
    <div className="flex items-center space-x-3">
      <div className="p-2 rounded-full bg-purple-100 text-purple-600 font-bold text-base flex items-center justify-center w-10 h-10">
        {friend.avatar}
      </div>
      <div>
        <h4 className="font-medium text-gray-900">{friend.name}</h4>
        <p className="text-sm text-gray-500">Friend</p>
      </div>
    </div>
    <div className={`font-bold text-sm ${friend.balance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
      {friend.balance > 0 && <span>owes you </span>}
      {friend.balance < 0 && <span>you owe </span>}
      ${Math.abs(friend.balance).toFixed(2)}
    </div>
  </div>
);

export default FriendItem;
