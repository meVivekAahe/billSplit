// src/components/friends/friendList.jsx
import React, { useState } from 'react';
import FriendItem from './FriendItem';
import AddFriendModal from './AddFriendModal';

  const FriendList = ({ friends, onAddFriend }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddFriend = async (friendData) => {
    // This will call your parent component's function to handle the API call
    await onAddFriend(friendData);
  };

  if (!friends || friends.length === 0) {
    return (
      <>
        <div className="text-center py-12 px-4">
          <div className="max-w-md mx-auto">
            <div className="mb-6">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No friends added yet</h3>
            <p className="text-gray-500 text-sm mb-6">Add friends and start splitting expenses together!</p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition text-sm font-medium"
            >
              Add Friend
            </button>
          </div>
        </div>

        <AddFriendModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onAddFriend={handleAddFriend}
        />
      </>
    );
  }

  return (
    <>
      <div className="space-y-4 px-2 sm:px-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Friends</h2>
          <button
            onClick={() => setIsModalOpen(true)}
            className="w-full sm:w-auto px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition text-sm sm:text-base"
          >
            Add Friend
          </button>
        </div>

        <div className="space-y-3">
          {friends.map(friend => (
            <FriendItem key={friend.id} friend={friend} />
          ))}
        </div>
      </div>

      <AddFriendModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddFriend={handleAddFriend}
      />
    </>
  );
};

export default FriendList;