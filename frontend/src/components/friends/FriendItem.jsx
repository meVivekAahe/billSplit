// src/components/friends/FriendItem.jsx
import React from 'react';

const FriendItem = ({ friend }) => (
  <div className="flex items-center justify-between p-3 sm:p-4 bg-white rounded-lg shadow hover:bg-gray-50 transition group">
    <div className="flex items-center space-x-3 min-w-0 flex-1">
      <div className="p-2 rounded-full bg-purple-100 text-purple-600 font-bold text-sm sm:text-base flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 flex-shrink-0">
        {friend.avatar}
      </div>
      <div className="min-w-0 flex-1">
        <h4 className="font-medium text-gray-900 text-sm sm:text-base truncate">{friend.name}</h4>
        <p className="text-xs sm:text-sm text-gray-500">Friend</p>
      </div>
    </div>
    <div className={`font-bold text-xs sm:text-sm text-right flex-shrink-0 ${friend.balance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
      <div className="flex flex-col items-end">
        {friend.balance > 0 && <span className="text-xs text-gray-500">owes you</span>}
        {friend.balance < 0 && <span className="text-xs text-gray-500">you owe</span>}
        <span className="font-bold">
          {friend.balance === 0 ? 'settled up' : `$${Math.abs(friend.balance).toFixed(2)}`}
        </span>
      </div>
    </div>
  </div>
);

export default FriendItem;