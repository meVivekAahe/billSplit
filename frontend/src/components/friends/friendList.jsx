// src/components/friends/friendList.jsx
import React from 'react';
import FriendItem from './FriendItem';

const FriendList = ({ friends }) => {
  if (!friends || friends.length === 0) {
    return (
      <div className="text-center py-8 px-4">
        <p className="text-gray-500 text-sm sm:text-base">No friends added yet.</p>
        <button className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition text-sm sm:text-base">
          Add Friend
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4 px-2 sm:px-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Friends</h2>
        <button className="w-full sm:w-auto px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition text-sm sm:text-base">
          Add Friend
        </button>
      </div>

      <div className="space-y-3">
        {friends.map(friend => (
          <FriendItem key={friend.id} friend={friend} />
        ))}
      </div>
    </div>
  );
};

export default FriendList;