import React from 'react';
import { Plus } from 'lucide-react';
import GroupItem from './GroupItem';

const GroupList = ({ groups, onAddGroup }) => {
  return (
    <div className="section">
      <div className="section-header">
        <h2 className="section-title">Groups</h2>
        <button onClick={onAddGroup} className="add-button">
          <Plus size={20} />
          <span>Add Group</span>
        </button>
      </div>
      <div className="item-list">
        {groups.map(group => (
          <GroupItem key={group.id} group={group} />
        ))}
      </div>
    </div>
  );
};

export default GroupList;