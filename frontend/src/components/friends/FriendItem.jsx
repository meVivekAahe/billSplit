import React from 'react';

const FriendItem = ({ friend }) => (
  <div className="item-container">
    <div className="item-left">
      <div className="item-icon friend-icon">
        <span style={{ fontSize: '0.875rem', fontWeight: 'bold', color: '#7c3aed' }}>
          {friend.avatar}
        </span>
      </div>
      <div className="item-info">
        <h4>{friend.name}</h4>
        <p>Friend</p>
      </div>
    </div>
    <div className={`item-amount ${friend.balance >= 0 ? 'balance-positive' : 'balance-negative'}`}>
      {friend.balance >= 0 ? 'owes you' : 'you owe'} ${Math.abs(friend.balance).toFixed(2)}
    </div>
  </div>
);

export default FriendItem;