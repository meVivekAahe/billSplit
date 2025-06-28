import React from 'react';
import { Users } from 'lucide-react';

const GroupItem = ({ group }) => (
  <div className="flex items-center justify-between p-6 bg-gray rounded-lg shadow">
    <div className="flex items-center space-x-3">
      <div className="p-2 rounded-full bg-blue-100 text-blue-600">
        <Users size={20} />
      </div>
      <div>
        <h4 className="font-medium text-gray-900">{group.name}</h4>
        <p className="text-sm text-gray-500">{group.members} members</p>
      </div>
    </div>
    <div className={`font-bold text-lg ${group.balance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
      {group.balance >= 0 ? '+' : '-'}${Math.abs(group.balance).toFixed(2)}
    </div>
  </div>
);



export default GroupItem;
