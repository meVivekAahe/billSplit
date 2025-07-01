import React, { useState } from 'react';
import BalanceCard from './BalanceCard';
import { Plus, Users, Receipt, PieChart, Settings, Bell, Search, Filter, TrendingUp, Calendar, MapPin } from 'lucide-react';

const GuestDashboardView = ({ onSignUpClick }) => {
  const [activeTab, setActiveTab] = useState('overview');

  // Enhanced dummy data for guest experience
  const guestData = {
    balances: {
      total: 45.50,
      owe: -23.75,
      owed: 69.25
    },
    recentExpenses: [
      {
        id: 1,
        description: "Dinner at Joe's Pizza",
        amount: 48.60,
        date: "2 hours ago",
        paidBy: "You",
        splitWith: ["Sarah", "Mike", "John"],
        category: "Food & Dining",
        settled: false
      },
      {
        id: 2,
        description: "Uber to Airport",
        amount: 25.40,
        date: "Yesterday",
        paidBy: "Sarah",
        splitWith: ["You"],
        category: "Transportation",
        settled: true
      },
      {
        id: 3,
        description: "Movie Tickets",
        amount: 36.00,
        date: "3 days ago",
        paidBy: "Mike",
        splitWith: ["You", "Sarah"],
        category: "Entertainment",
        settled: false
      },
      {
        id: 4,
        description: "Grocery Shopping",
        amount: 84.20,
        date: "1 week ago",
        paidBy: "You",
        splitWith: ["John", "Lisa"],
        category: "Groceries",
        settled: true
      }
    ],
    groups: [
      {
        id: 1,
        name: "Weekend Trip",
        members: 4,
        totalExpenses: 286.50,
        yourBalance: 23.75,
        lastActivity: "2 hours ago",
        image: "🏖️"
      },
      {
        id: 2,
        name: "Roommates",
        members: 3,
        totalExpenses: 542.80,
        yourBalance: -45.20,
        lastActivity: "Yesterday",
        image: "🏠"
      },
      {
        id: 3,
        name: "Office Lunch Group",
        members: 6,
        totalExpenses: 178.90,
        yourBalance: 12.50,
        lastActivity: "3 days ago",
        image: "🍽️"
      }
    ],
    friends: [
      { id: 1, name: "Sarah Johnson", balance: 15.25, avatar: "SJ" },
      { id: 2, name: "Mike Chen", balance: -8.50, avatar: "MC" },
      { id: 3, name: "John Smith", balance: 23.75, avatar: "JS" },
      { id: 4, name: "Lisa Wang", balance: -12.00, avatar: "LW" }
    ],
    monthlyStats: {
      totalSpent: 1284.50,
      categoriesBreakdown: [
        { category: "Food & Dining", amount: 485.20, percentage: 38 },
        { category: "Transportation", amount: 234.80, percentage: 18 },
        { category: "Entertainment", amount: 198.60, percentage: 15 },
        { category: "Groceries", amount: 365.90, percentage: 29 }
      ]
    }
  };

  const ExpenseItem = ({ expense }) => (
    <div className="bg-white p-4 rounded-lg border hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-2">
        <div className="flex-1">
          <h4 className="font-semibold text-gray-900">{expense.description}</h4>
          <p className="text-sm text-gray-500">{expense.date} • {expense.category}</p>
        </div>
        <div className="text-right">
          <p className="font-bold text-lg">${expense.amount.toFixed(2)}</p>
          <p className="text-xs text-gray-500">Paid by {expense.paidBy}</p>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <div className="flex -space-x-2">
          {expense.splitWith.slice(0, 3).map((person, index) => (
            <div key={index} className="w-6 h-6 bg-teal-100 rounded-full border-2 border-white flex items-center justify-center text-xs font-medium text-teal-700">
              {person.slice(0, 2)}
            </div>
          ))}
          {expense.splitWith.length > 3 && (
            <div className="w-6 h-6 bg-gray-100 rounded-full border-2 border-white flex items-center justify-center text-xs font-medium text-gray-600">
              +{expense.splitWith.length - 3}
            </div>
          )}
        </div>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          expense.settled ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
        }`}>
          {expense.settled ? 'Settled' : 'Pending'}
        </span>
      </div>
    </div>
  );

  const GroupItem = ({ group }) => (
    <div className="bg-white p-4 rounded-lg border hover:shadow-md transition-shadow">
      <div className="flex items-center mb-3">
        <div className="text-2xl mr-3">{group.image}</div>
        <div className="flex-1">
          <h4 className="font-semibold text-gray-900">{group.name}</h4>
          <p className="text-sm text-gray-500">{group.members} members</p>
        </div>
      </div>
      <div className="space-y-2">
        <div className="flex justify-between">
          <span className="text-sm text-gray-600">Total expenses:</span>
          <span className="font-medium">${group.totalExpenses.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-gray-600">Your balance:</span>
          <span className={`font-medium ${group.yourBalance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            ${Math.abs(group.yourBalance).toFixed(2)}
          </span>
        </div>
        <p className="text-xs text-gray-400">{group.lastActivity}</p>
      </div>
    </div>
  );

  const FriendItem = ({ friend }) => (
    <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center font-medium text-teal-700">
          {friend.avatar}
        </div>
        <span className="font-medium text-gray-900">{friend.name}</span>
      </div>
      <span className={`font-medium ${friend.balance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
        {friend.balance >= 0 ? '+' : ''}${friend.balance.toFixed(2)}
      </span>
    </div>
  );

  const CategoryChart = ({ categories }) => (
    <div className="space-y-3">
      {categories.map((cat, index) => (
        <div key={index} className="space-y-1">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">{cat.category}</span>
            <span className="font-medium">${cat.amount.toFixed(2)} ({cat.percentage}%)</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-teal-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${cat.percentage}%` }}
            ></div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-bold text-gray-900">ExpenseSync</h1>
              <span className="bg-teal-100 text-teal-800 px-2 py-1 rounded-full text-xs font-medium">
                Guest Mode
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <button className="p-2 text-gray-400 hover:text-gray-600">
                <Bell size={20} />
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600">
                <Search size={20} />
              </button>
              <button
                onClick={onSignUpClick}
                className="bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-600 transition-colors font-medium"
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Quick Actions Bar */}
        <div className="flex flex-wrap gap-3 mb-6">
          <button className="bg-teal-500 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-teal-600 transition-colors">
            <Plus size={18} />
            <span>Add Expense</span>
          </button>
          <button className="bg-white text-gray-700 px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-gray-50 border transition-colors">
            <Users size={18} />
            <span>Create Group</span>
          </button>
          <button className="bg-white text-gray-700 px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-gray-50 border transition-colors">
            <Receipt size={18} />
            <span>Settle Up</span>
          </button>
        </div>

        {/* Balance Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <BalanceCard
            title="Total Balance"
            amount={guestData.balances.total}
            color="text-green-600"
          />
          <BalanceCard
            title="You Owe"
            amount={guestData.balances.owe}
            color="text-red-600"
          />
          <BalanceCard
            title="You Are Owed"
            amount={guestData.balances.owed}
            color="text-teal-600"
          />
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg mb-6 overflow-x-auto">
          {[
            { id: 'overview', label: 'Overview', icon: PieChart },
            { id: 'expenses', label: 'Expenses', icon: Receipt },
            { id: 'groups', label: 'Groups', icon: Users },
            { id: 'friends', label: 'Friends', icon: Users }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-white text-teal-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <tab.icon size={18} />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="space-y-6">
          {activeTab === 'overview' && (
            <>
              {/* Monthly Stats */}
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">This Month</h3>
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <TrendingUp size={16} />
                    <span>Total: ${guestData.monthlyStats.totalSpent.toFixed(2)}</span>
                  </div>
                </div>
                <CategoryChart categories={guestData.monthlyStats.categoriesBreakdown} />
              </div>

              {/* Recent Activity */}
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
                  <button className="text-teal-600 hover:text-teal-700 text-sm font-medium">
                    View All
                  </button>
                </div>
                <div className="space-y-3">
                  {guestData.recentExpenses.slice(0, 3).map(expense => (
                    <ExpenseItem key={expense.id} expense={expense} />
                  ))}
                </div>
              </div>
            </>
          )}

          {activeTab === 'expenses' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900">All Expenses</h3>
                <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-900">
                  <Filter size={16} />
                  <span>Filter</span>
                </button>
              </div>
              <div className="space-y-3">
                {guestData.recentExpenses.map(expense => (
                  <ExpenseItem key={expense.id} expense={expense} />
                ))}
              </div>
            </div>
          )}

          {activeTab === 'groups' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900">Your Groups</h3>
                <button className="bg-teal-500 text-white px-3 py-1.5 rounded-lg text-sm hover:bg-teal-600">
                  Create Group
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {guestData.groups.map(group => (
                  <GroupItem key={group.id} group={group} />
                ))}
              </div>
            </div>
          )}

          {activeTab === 'friends' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900">Friends</h3>
                <button className="bg-teal-500 text-white px-3 py-1.5 rounded-lg text-sm hover:bg-teal-600">
                  Add Friend
                </button>
              </div>
              <div className="space-y-3">
                {guestData.friends.map(friend => (
                  <FriendItem key={friend.id} friend={friend} />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Call to Action Banner */}
        <div className="mt-12 bg-gradient-to-r from-teal-500 to-blue-600 rounded-lg p-6 text-white">
          <div className="text-center space-y-3">
            <h3 className="text-xl font-bold">Ready to start splitting expenses?</h3>
            <p className="text-teal-100">Join thousands of users who trust ExpenseSync to manage their shared expenses.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center mt-4">
              <button
                onClick={onSignUpClick}
                className="bg-white text-teal-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors"
              >
                Create Your Account
              </button>
              <button className="border border-white/30 text-white px-6 py-3 rounded-lg font-medium hover:bg-white/10 transition-colors">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuestDashboardView;