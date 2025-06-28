import React from 'react';
import { Plus } from 'lucide-react';
import GroupItem from './GroupItem';

const GroupList = ({ groups, onAddGroup }) => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden">
    <div className="flex items-center justify-between p-4 border-b border-gray-200">
      <h2 className="text-lg font-semibold text-gray-900">Groups</h2>
      <button
        onClick={onAddGroup}
        className="flex items-center space-x-2 px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
      >
        <Plus size={20} />
        <span>Add Group</span>
      </button>
    </div>

   <div className="space-y-4gray">
     {groups.map(group => (
       <GroupItem key={group.id} group={group} />
     ))}
   </div>

  </div>
);

export default GroupList;
