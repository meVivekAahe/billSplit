import React, { useState } from 'react';

import { Plus, Users, Receipt, PieChart, Settings, Bell, Search, Filter, TrendingUp, Calendar, MapPin } from 'lucide-react';
import { useNavigate } from "react-router-dom";



// --- DUMMY DATA (Indian Context) ---
const guestData = {
    balances: {
        total: 5500.75,
        owe: -2375.50,
        owed: 7876.25,
    },
    expenses: [
        { id: 1, description: "Dinner at Toit", amount: 3200.00, date: "2025-07-11T19:00:00Z", paidBy: "You", splitWith: ["Priya", "Rohan", "Aarav"], category: "Food & Dining", settled: false },
        { id: 2, description: "Ola to Airport", amount: 1250.50, date: "2025-07-10T14:30:00Z", paidBy: "Priya", splitWith: ["You"], category: "Transport", settled: true },
        { id: 3, description: "Movie Tickets - Kalki 2898 AD", amount: 1800.00, date: "2025-07-08T18:00:00Z", paidBy: "Rohan", splitWith: ["You", "Priya"], category: "Entertainment", settled: false },
        { id: 4, description: "Groceries from Nature's Basket", amount: 4200.20, date: "2025-07-04T12:00:00Z", paidBy: "You", splitWith: ["Aarav", "Anika"], category: "Groceries", settled: true },
        { id: 5, description: "Weekend trip to Nandi Hills", amount: 5500.00, date: "2025-06-28T09:00:00Z", paidBy: "Aarav", splitWith: ["You", "Priya", "Rohan"], category: "Travel", settled: false },
    ],
    groups: [
        { id: 1, name: "Goa Trip '25", members: 4, totalExpenses: 28650.50, yourBalance: 2375.00, lastActivity: "2 hours ago", image: "🏖️" },
        { id: 2, name: "BTM Layout Flatmates", members: 3, totalExpenses: 54280.80, yourBalance: -4520.00, lastActivity: "Yesterday", image: "🏠" },
        { id: 3, name: "Office Lunch Crew", members: 6, totalExpenses: 17890.90, yourBalance: 1250.50, lastActivity: "3 days ago", image: "🍽️" },
    ],
    friends: [
        { id: 1, name: "Priya Sharma", balance: 1525.00, avatar: "PS" },
        { id: 2, name: "Rohan Mehra", balance: -850.50, avatar: "RM" },
        { id: 3, name: "Aarav Singh", balance: 2375.00, avatar: "AS" },
        { id: 4, name: "Anika Gupta", balance: -1200.00, avatar: "AG" },
    ],
    monthlyStats: {
        totalSpent: 48520.75,
        categoriesBreakdown: [
            { category: "Food & Dining", amount: 14852.20, percentage: 31, color: "bg-teal-500" },
            { category: "Groceries", amount: 16447.15, percentage: 34, color: "bg-blue-500" },
            { category: "Transport", amount: 9234.80, percentage: 19, color: "bg-indigo-500" },
            { category: "Entertainment", amount: 7986.60, percentage: 16, color: "bg-purple-500" },
        ],
    },
    activities: [
        { id: 1, type: "expense_added", description: "You added 'Dinner at Toit' (₹3200.00)", timestamp: "2 hours ago", icon: <Plus className="w-4 h-4 text-white"/>, iconBg: "bg-green-500" },
        { id: 2, type: "settle_up", description: "Priya paid you ₹1250.50 for 'Ola to Airport'", timestamp: "Yesterday", icon: <Receipt className="w-4 h-4 text-white"/>, iconBg: "bg-blue-500" },
        { id: 3, type: "group_expense", description: "Rohan added 'Movie Tickets' to 'Goa Trip '25'", timestamp: "3 days ago", icon: <Users className="w-4 h-4 text-white"/>, iconBg: "bg-orange-500" },
        { id: 4, type: "reminder", description: "Reminder sent to Rohan for 'Movie Tickets'", timestamp: "4 days ago", icon: <Bell className="w-4 h-4 text-white"/>, iconBg: "bg-yellow-500" },
    ]
};

// --- REUSABLE COMPONENTS ---

const Header = ({ onSignUpClick }) => (
    <header className="bg-white/80 backdrop-blur-lg shadow-sm border-b sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
                <div className="flex items-center space-x-4">
                    <h1 className="text-2xl font-bold text-gray-900 tracking-tight">ExpenseSync</h1>
                    <span className="bg-teal-100 text-teal-800 px-2.5 py-1 rounded-full text-xs font-semibold">
                        GUEST MODE
                    </span>
                </div>
                <div className="flex items-center space-x-2 sm:space-x-4">
                    <button className="p-2 text-gray-500 hover:text-gray-800 rounded-full hover:bg-gray-100 transition-colors">
                        <Search size={20} />
                    </button>
                    <button className="p-2 text-gray-500 hover:text-gray-800 rounded-full hover:bg-gray-100 transition-colors">
                        <Bell size={20} />
                    </button>
                    <button
                        onClick={onSignUpClick}
                        className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors font-medium shadow-sm hidden sm:block"
                    >
                        Sign Up for Free
                    </button>
                </div>
            </div>
        </div>
    </header>
);

const BalanceCard = ({ title, amount, color }) => (
    <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
        <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-500">{title}</h3>
            {amount >= 0 ? <ArrowUpRight className="w-5 h-5 text-green-500" /> : <ArrowDownLeft className="w-5 h-5 text-red-500" />}
        </div>
        <p className={`text-3xl font-bold mt-2 ${color}`}>
            ₹{Math.abs(amount).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </p>
    </div>
);

const DonutChart = ({ stats }) => {
    const radius = 60;
    const circumference = 2 * Math.PI * radius;

    let offset = 0;
    const segments = stats.categoriesBreakdown.map(cat => {
        const dasharray = (cat.percentage / 100) * circumference;
        const segment = {
            ...cat,
            dasharray: `${dasharray} ${circumference - dasharray}`,
            offset: -offset,
        };
        offset += dasharray;
        return segment;
    });

    return (
        <div className="flex-shrink-0 relative w-48 h-48">
            <svg className="w-full h-full" viewBox="0 0 140 140">
                <circle className="text-gray-200" stroke="currentColor" cx="70" cy="70" r={radius} fill="transparent" strokeWidth="12" />
                {segments.map((segment, index) => (
                    <circle
                        key={index}
                        className={segment.color.replace('bg-', 'text-')}
                        stroke="currentColor"
                        cx="70"
                        cy="70"
                        r={radius}
                        fill="transparent"
                        strokeWidth="12"
                        strokeDasharray={segment.dasharray}
                        strokeDashoffset={segment.offset}
                        transform="rotate(-90 70 70)"
                    />
                ))}
            </svg>
            <div className="absolute inset-0 flex items-center justify-center flex-col text-center">
                <span className="text-sm text-gray-500">Total Spent</span>
                <span className="text-2xl font-bold text-gray-800">₹{stats.totalSpent.toLocaleString('en-IN')}</span>
            </div>
        </div>
    );
};


// --- PAGE COMPONENTS ---

const OverviewPage = ({ data, onSignUpClick }) => (
    <div className="space-y-8">
        {/* Quick Actions */}
        <div className="flex flex-wrap gap-3">
            <button className="bg-teal-600 text-white px-4 py-2.5 rounded-lg flex items-center space-x-2 hover:bg-teal-700 transition-colors shadow-sm text-sm font-medium">
                <Plus size={18} /> <span>Add Expense</span>
            </button>
            <button className="bg-white text-gray-700 px-4 py-2.5 rounded-lg flex items-center space-x-2 hover:bg-gray-50 border transition-colors text-sm font-medium">
                <Users size={18} /> <span>Create Group</span>
            </button>
            <button className="bg-white text-gray-700 px-4 py-2.5 rounded-lg flex items-center space-x-2 hover:bg-gray-50 border transition-colors text-sm font-medium">
                <Receipt size={18} /> <span>Settle Up</span>
            </button>
        </div>

        {/* Money Flow Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Outstanding Balances */}
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <Receipt className="w-5 h-5 mr-2 text-teal-600" />
                    Outstanding Balances
                </h3>
                <div className="space-y-3">
                    {data.friends.filter(f => f.balance !== 0).map(friend => (
                        <div key={friend.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center font-bold text-teal-700 text-sm">
                                    {friend.avatar}
                                </div>
                                <span className="font-medium text-gray-900">{friend.name}</span>
                            </div>
                            <div className="text-right">
                                <span className={`font-semibold ${friend.balance > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                    {friend.balance > 0 ? '+' : '−'}₹{Math.abs(friend.balance).toLocaleString('en-IN')}
                                </span>
                                <p className="text-xs text-gray-500">
                                    {friend.balance > 0 ? 'owes you' : 'you owe'}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Active Groups */}
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <Users className="w-5 h-5 mr-2 text-teal-600" />
                    Active Groups
                </h3>
                <div className="space-y-3">
                    {data.groups.slice(0, 3).map(group => (
                        <div key={group.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div className="flex items-center space-x-3">
                                <div className="text-xl">{group.image}</div>
                                <div>
                                    <span className="font-medium text-gray-900">{group.name}</span>
                                    <p className="text-xs text-gray-500">{group.members} members</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <span className={`font-semibold ${group.yourBalance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                    {group.yourBalance >= 0 ? '+' : '−'}₹{Math.abs(group.yourBalance).toLocaleString('en-IN')}
                                </span>
                                <p className="text-xs text-gray-500">{group.lastActivity}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>

        {/* Recent Expenses */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2 text-teal-600" />
                    Recent Expenses
                </h3>
                <button className="text-teal-600 hover:text-teal-700 text-sm font-medium">
                    View All
                </button>
            </div>
            <div className="space-y-3">
                {data.expenses.slice(0, 4).map(expense => (
                    <div key={expense.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex-1">
                            <div className="flex items-center space-x-3">
                                <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                                <div>
                                    <span className="font-medium text-gray-900">{expense.description}</span>
                                    <p className="text-xs text-gray-500">
                                        {new Date(expense.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })} •
                                        Paid by {expense.paidBy} • {expense.category}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="text-right">
                            <span className="font-semibold text-gray-900">₹{expense.amount.toLocaleString('en-IN')}</span>
                            <p className={`text-xs ${expense.settled ? 'text-green-600' : 'text-yellow-600'}`}>
                                {expense.settled ? 'Settled' : 'Pending'}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>

        {/* Monthly Spending Insights */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <PieChart className="w-5 h-5 mr-2 text-teal-600" />
                This Month's Spending Breakdown
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {data.monthlyStats.categoriesBreakdown.map((cat, index) => (
                    <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
                        <div className={`w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center ${cat.color}`}>
                            <span className="text-white font-bold text-lg">{cat.percentage}%</span>
                        </div>
                        <h4 className="font-medium text-gray-900 text-sm">{cat.category}</h4>
                        <p className="text-gray-600 font-semibold">₹{cat.amount.toLocaleString('en-IN')}</p>
                    </div>
                ))}
            </div>
            <div className="mt-4 p-4 bg-teal-50 rounded-lg">
                <p className="text-sm text-teal-800">
                    <span className="font-semibold">Total Monthly Spending:</span> ₹{data.monthlyStats.totalSpent.toLocaleString('en-IN')}
                </p>
            </div>
        </div>
    </div>
);

const ExpenseItem = ({ expense }) => (
    <div className="bg-white p-4 rounded-xl border hover:shadow-md transition-shadow">
        <div className="flex justify-between items-start mb-3">
            <div className="flex-1 pr-4">
                <h4 className="font-semibold text-gray-800">{expense.description}</h4>
                <p className="text-sm text-gray-500">{new Date(expense.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })} • {expense.category}</p>
            </div>
            <div className="text-right">
                <p className="font-bold text-lg text-gray-800">₹{expense.amount.toLocaleString('en-IN')}</p>
                <p className="text-xs text-gray-500">Paid by {expense.paidBy}</p>
            </div>
        </div>
        <div className="flex justify-between items-center">
            <div className="flex -space-x-2">
                {expense.splitWith.slice(0, 3).map((person, index) => (
                    <div key={index} className="w-7 h-7 bg-teal-100 rounded-full border-2 border-white flex items-center justify-center text-xs font-bold text-teal-700">
                        {person.slice(0, 1)}
                    </div>
                ))}
                {expense.splitWith.length > 3 && (
                    <div className="w-7 h-7 bg-gray-200 rounded-full border-2 border-white flex items-center justify-center text-xs font-bold text-gray-600">
                        +{expense.splitWith.length - 3}
                    </div>
                )}
            </div>
            <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${expense.settled ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                {expense.settled ? 'Settled' : 'Pending'}
            </span>
        </div>
    </div>
);

const ExpensesPage = ({ expenses }) => (
    <div className="space-y-6">
        <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-900">All Expenses</h2>
            <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 bg-white border rounded-lg px-3 py-1.5 text-sm font-medium">
                <Filter size={16} />
                <span>Filter</span>
            </button>
        </div>
        <div className="space-y-4">
            {expenses.map(expense => <ExpenseItem key={expense.id} expense={expense} />)}
        </div>
    </div>
);

const GroupItem = ({ group }) => (
    <div className="bg-white p-5 rounded-xl border hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
        <div className="flex items-center mb-4">
            <div className="text-3xl mr-4 bg-gray-100 p-2 rounded-lg">{group.image}</div>
            <div className="flex-1">
                <h4 className="font-semibold text-gray-900">{group.name}</h4>
                <p className="text-sm text-gray-500">{group.members} members</p>
            </div>
        </div>
        <div className="space-y-2 text-sm">
            <div className="flex justify-between">
                <span className="text-gray-600">Total spent:</span>
                <span className="font-medium text-gray-800">₹{group.totalExpenses.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between">
                <span className="text-gray-600">Your balance:</span>
                <span className={`font-medium ${group.yourBalance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {group.yourBalance < 0 ? "-" : ""}₹{Math.abs(group.yourBalance).toLocaleString('en-IN')}
                </span>
            </div>
        </div>
        <p className="text-xs text-gray-400 mt-4">{group.lastActivity}</p>
    </div>
);

const GroupsPage = ({ groups }) => (
    <div className="space-y-6">
        <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-900">Your Groups</h2>
            <button className="bg-teal-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-teal-700 transition-colors text-sm font-medium">
                <Plus size={18} /> <span>Create Group</span>
            </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {groups.map(group => <GroupItem key={group.id} group={group} />)}
        </div>
    </div>
);

const FriendItem = ({ friend }) => (
    <div className="flex items-center justify-between p-4 bg-white rounded-xl border">
        <div className="flex items-center space-x-4">
            <div className="w-11 h-11 bg-teal-100 rounded-full flex items-center justify-center font-bold text-teal-700 text-lg">
                {friend.avatar}
            </div>
            <div>
                <span className="font-medium text-gray-900">{friend.name}</span>
                <p className={`text-sm ${friend.balance > 0 ? 'text-green-600' : friend.balance < 0 ? 'text-red-600' : 'text-gray-500'}`}>
                    {friend.balance > 0 ? `Owes you ₹${friend.balance.toLocaleString('en-IN')}` : friend.balance < 0 ? `You owe ₹${Math.abs(friend.balance).toLocaleString('en-IN')}` : 'Settled up'}
                </p>
            </div>
        </div>
        <span className={`font-semibold text-lg ${friend.balance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {friend.balance >= 0 ? '+' : '−'}₹{Math.abs(friend.balance).toLocaleString('en-IN')}
        </span>
    </div>
);

const FriendsPage = ({ friends }) => (
     <div className="space-y-6">
        <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-900">Friends</h2>
            <button className="bg-teal-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-teal-700 transition-colors text-sm font-medium">
                <Plus size={18} /> <span>Add Friend</span>
            </button>
        </div>
        <div className="space-y-4">
            {friends.map(friend => <FriendItem key={friend.id} friend={friend} />)}
        </div>
    </div>
);

const ActivityItem = ({ activity }) => (
    <div className="flex items-start space-x-4 p-3 hover:bg-gray-50 rounded-lg">
        <div className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 ${activity.iconBg}`}>
            {activity.icon}
        </div>
        <div className="flex-1">
            <p className="text-sm text-gray-800">{activity.description}</p>
            <p className="text-xs text-gray-500">{activity.timestamp}</p>
        </div>
    </div>
);

const ActivityPage = ({ activities }) => (
    <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900">Activity Feed</h2>
        <div className="bg-white p-4 rounded-xl border">
            <div className="space-y-2">
                {activities.map(activity => <ActivityItem key={activity.id} activity={activity} />)}
            </div>
        </div>
    </div>
);

// --- MAIN APP COMPONENT ---

export default function GuestDashboardView() {
    const [activeTab, setActiveTab] = useState('overview');

    const onSignUpClick = () => {
        // Placeholder for sign-up logic
        console.log("Sign Up button clicked!");
    };

    const tabs = [
        { id: 'overview', label: 'Overview', icon: PieChart },
        { id: 'expenses', label: 'Expenses', icon: Receipt },
        { id: 'groups', label: 'Groups', icon: Users },
        { id: 'friends', label: 'Friends', icon: Users },
        { id: 'activity', label: 'Activity', icon: TrendingUp }
    ];

    const renderContent = () => {
        switch (activeTab) {
            case 'overview': return <OverviewPage data={guestData} onSignUpClick={onSignUpClick} />;
            case 'expenses': return <ExpensesPage expenses={guestData.expenses} />;
            case 'groups': return <GroupsPage groups={guestData.groups} />;
            case 'friends': return <FriendsPage friends={guestData.friends} />;
            case 'activity': return <ActivityPage activities={guestData.activities} />;
            default: return <OverviewPage data={guestData} onSignUpClick={onSignUpClick} />;
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 font-sans">
            <Header onSignUpClick={onSignUpClick} />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Tab Navigation */}
                <div className="mb-8">
                    {/* Mobile Dropdown */}
                    <div className="sm:hidden">
                        <label htmlFor="tabs" className="sr-only">Select a tab</label>
                        <select
                            id="tabs"
                            name="tabs"
                            className="block w-full pl-3 pr-10 py-2.5 text-base border-gray-300 focus:outline-none focus:ring-teal-500 focus:border-teal-500 rounded-md"
                            onChange={(e) => setActiveTab(e.target.value)}
                            value={activeTab}
                        >
                            {tabs.map(tab => <option key={tab.id} value={tab.id}>{tab.label}</option>)}
                        </select>
                    </div>
                    {/* Desktop Tabs */}
                    <div className="hidden sm:block">
                        <div className="border-b border-gray-200">
                            <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                                {tabs.map(tab => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`whitespace-nowrap flex items-center py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                                            activeTab === tab.id
                                                ? 'border-teal-500 text-teal-600'
                                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                        }`}
                                    >
                                        <tab.icon className="mr-2 h-5 w-5" />
                                        {tab.label}
                                    </button>
                                ))}
                            </nav>
                        </div>
                    </div>
                </div>

                {renderContent()}

                {/* Call to Action Banner */}
                <div className="mt-16 bg-gradient-to-r from-teal-500 to-blue-600 rounded-2xl p-8 sm:p-12 text-white shadow-2xl shadow-teal-500/20">
                    <div className="text-center space-y-4">
                        <h3 className="text-3xl font-bold">Take control of your shared expenses</h3>
                        <p className="text-teal-100 max-w-2xl mx-auto">
                            Stop chasing friends for money. Sign up for ExpenseSync and make splitting bills simple, transparent, and stress-free.
                        </p>
                        <div className="pt-4">
                            <button
                                onClick={onSignUpClick}
                                className="bg-white text-teal-600 px-8 py-3 rounded-lg font-bold text-lg hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg"
                            >
                                Get Started for Free
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}


//export default GuestDashboardView;