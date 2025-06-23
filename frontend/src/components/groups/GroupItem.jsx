import React from 'react';
import { Users } from 'lucide-react';

const GroupItem = ({ group }) => (
  <div className="item-container">
    <div className="item-left">
      <div className="item-icon group-icon">
        <Users size={20} color="#2563eb" />
      </div>
      <div className="item-info">
        <h4>{group.name}</h4>
        <p>{group.members} members</p>
      </div>
    </div>
    <div className={`item-amount ${group.balance >= 0 ? 'balance-positive' : 'balance-negative'}`}>
      {group.balance >= 0 ? '+' : '-'}${Math.abs(group.balance).toFixed(2)}
    </div>
  </div>
);

export default GroupItem;
