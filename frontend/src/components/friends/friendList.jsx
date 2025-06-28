// src/components/friends/FriendList.jsx
import React from 'react';
import FriendItem from './FriendItem';


const FriendList = ({ friends }) => (
  <div className="space-y-4">
    {friends.map(friend => (
      <FriendItem key={friend.id} friend={friend} />
    ))}
  </div>
);

export default FriendList;
