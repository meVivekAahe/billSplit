import React, { useState } from 'react';
import { Users, Receipt, Activity, Calendar, User, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import TabButton from './TabButton';

const Navigation = ({ activeTab, onTabChange }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleTabClick = (tabId) => {
    // Navigate to the appropriate route
    navigate(`/${tabId}`);

    // Close dropdown after navigation
    setIsDropdownOpen(false);

    // Call the original onTabChange if provided
    if (onTabChange) {
      onTabChange(tabId);
    }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const tabs = [
    { id: 'dashboard', icon: Calendar, label: 'Dashboard' },
    { id: 'groups', icon: Users, label: 'Groups' },
    { id: 'friends', icon: User, label: 'Friends' },
    { id: 'expenses', icon: Receipt, label: 'Expenses' },
    { id: 'activity', icon: Activity, label: 'Activity' }
  ];

  const currentTab = tabs.find(tab => tab.id === activeTab);

  return (
    <nav className="bg-white border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-8 py-4">
          {tabs.map(tab => (
            <TabButton
              key={tab.id}
              id={tab.id}
              icon={tab.icon}
              label={tab.label}
              isActive={activeTab === tab.id}
              onClick={handleTabClick}
            />
          ))}
        </div>

        {/* Mobile Navigation - Horizontal Scrollable */}
        <div className="md:hidden">
          {/* Horizontal Scrollable Tabs */}
          <div className="overflow-x-auto scrollbar-hide">
            <div className="flex space-x-6 py-4 min-w-max px-2">
              {tabs.map(tab => (
                <MobileTabButton
                  key={tab.id}
                  id={tab.id}
                  icon={tab.icon}
                  label={tab.label}
                  isActive={activeTab === tab.id}
                  onClick={handleTabClick}
                />
              ))}
            </div>
          </div>

          {/* Dropdown Alternative (Hidden by default, can be toggled) */}
          <div className="hidden">
            <div className="relative">
              <button
                onClick={toggleDropdown}
                className="w-full flex items-center justify-between px-4 py-3 text-left text-gray-700 bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center">
                  {currentTab && <currentTab.icon className="mr-2 h-5 w-5" />}
                  <span className="font-medium">
                    {currentTab ? currentTab.label : 'Select Tab'}
                  </span>
                </div>
                <ChevronDown className={`h-5 w-5 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {isDropdownOpen && (
                <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-b-lg shadow-lg z-50">
                  {tabs.map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => handleTabClick(tab.id)}
                      className={`w-full flex items-center px-4 py-3 text-left hover:bg-gray-50 transition-colors ${
                        activeTab === tab.id ? 'bg-purple-50 text-purple-700' : 'text-gray-700'
                      }`}
                    >
                      <tab.icon className="mr-3 h-5 w-5" />
                      {tab.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </nav>
  );
};

// Mobile version of TabButton for horizontal scrolling
const MobileTabButton = ({ id, icon: Icon, label, isActive, onClick }) => {
  return (
    <button
      onClick={() => onClick(id)}
      className={`flex flex-col items-center justify-center px-4 py-2 min-w-max text-sm font-medium rounded-lg transition-colors whitespace-nowrap ${
        isActive
          ? 'bg-purple-100 text-purple-700 border-2 border-purple-300'
          : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900 border-2 border-transparent'
      }`}
    >
      <Icon className="h-5 w-5 mb-1" />
      {label}
    </button>
  );
};

export default Navigation;