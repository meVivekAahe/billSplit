import React from 'react';
import { Users, Receipt, Activity, Calendar, User } from 'lucide-react';
import TabButton from './TabButton';

const Navigation = ({ activeTab, onTabChange }) => {
  return (
    <nav className="bg-white border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex space-x-8 py-4">
          <TabButton 
            id="dashboard" 
            icon={Calendar} 
            label="Dashboard" 
            isActive={activeTab === 'dashboard'} 
            onClick={onTabChange} 
          />
          <TabButton 
            id="groups" 
            icon={Users} 
            label="Groups" 
            isActive={activeTab === 'groups'} 
            onClick={onTabChange} 
          />
          <TabButton 
            id="friends" 
            icon={User} 
            label="Friends" 
            isActive={activeTab === 'friends'} 
            onClick={onTabChange} 
          />
          <TabButton 
            id="expenses" 
            icon={Receipt} 
            label="Expenses" 
            isActive={activeTab === 'expenses'} 
            onClick={onTabChange} 
          />
          <TabButton 
            id="activity" 
            icon={Activity} 
            label="Activity" 
            isActive={activeTab === 'activity'} 
            onClick={onTabChange} 
          />
        </div>
      </div>
    </nav>
  );
};

export default Navigation;