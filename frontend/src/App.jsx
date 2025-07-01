import React, { useState, useEffect } from 'react';
// Import routing components and useLocation hook
import { Routes, Route, Navigate, useLocation  } from 'react-router-dom';

// Import your components
import ExpenseSyncLanding from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import GuestDashboardView from './components/dashboard/GuestDashboardView';

// Import your existing components
import Header from './components/common/Header';
import Navigation from './components/common/Navigation';
import DashboardView from './components/dashboard/DashboardView';
import ExpenseList from './components/expenses/ExpenseList';
import GroupList from './components/groups/GroupList';
import FriendList from './components/friends/friendList';
import AddExpenseModal from './components/expenses/AddExpenseModal';

import './App.css';

const App = () => {
  // activeTab is kept to manage the visual highlighting in the Navigation component
  const [activeTab, setActiveTab] = useState('dashboard');

  const [expenses, setExpenses] = useState([]);
  const [groups, setGroups] = useState([]);
  const [balances, setBalances] = useState({ total: 0, owe: 0, owed: 0 });
  const [loading, setLoading] = useState(true); // Loading state for initial data/auth check
  const [friends, setFriends] = useState([]);

  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
  const openAddExpenseModal = () => setShowAddExpenseModal(true);
  const closeAddExpenseModal = () => setShowAddExpenseModal(false);

  // Authentication state - set to false to show landing page by default
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // useLocation hook to get current path for Navigation component
  const location = useLocation();

  // Effect to update activeTab based on current route path
  useEffect(() => {
    const path = location.pathname;
    if (path === '/dashboard') {
      setActiveTab('dashboard');
    } else if (path === '/groups') {
      setActiveTab('groups');
    } else if (path === '/friends') {
      setActiveTab('friends');
    } else if (path === '/expenses') {
      setActiveTab('expenses');
    } else {
      // For landing page or other unauthenticated paths, no tab should be active
      setActiveTab('');
    }
  }, [location.pathname, isAuthenticated]);

  // Initial load effect for data and potential auth check
  useEffect(() => {
    const checkAuthAndLoadData = async () => {
        setLoading(true);
        // Simulate authentication check
        // For now, it defaults to false, so the landing page is shown.

        // Load mock data
        try {
            setExpenses([
                { id: 1, description: 'Dinner at Pizza Place', amount: 45.50, date: '2025-06-22', paidBy: 'You', group: 'Weekend Gang' },
                { id: 2, description: 'Movie Tickets', amount: 28.00, date: '2025-06-21', paidBy: 'Alice', group: 'College Friends' },
                { id: 3, description: 'Grocery Shopping', amount: 67.25, date: '2025-06-20', paidBy: 'Bob', group: 'Roommates' }
            ]);
            setGroups([
                { id: 1, name: 'Weekend Gang', members: 4, balance: -12.50 },
                { id: 2, name: 'College Friends', members: 6, balance: 8.75 },
                { id: 3, name: 'Roommates', members: 3, balance: -5.00 }
            ]);
            setFriends([
                { id: 1, name: 'Alice', avatar: 'A', balance: 20.50 },
                { id: 2, name: 'Bob', avatar: 'B', balance: -15.00 },
                { id: 3, name: 'Charlie', avatar: 'C', balance: 0.00 }
            ]);
            setBalances({ total: 12.50, owe: 45.25, owed: 32.75 });
        } catch (error) {
            console.error('Error loading data:', error);
        } finally {
            setLoading(false);
        }
    };
    checkAuthAndLoadData();
  }, []);

  // Helper component for protected routes
  const ProtectedRoute = ({ children, isAuthenticated, loading }) => {
    if (loading) {
      return <div className="text-center py-8">Loading application...</div>;
    }
    return isAuthenticated ? children : <Navigate to="/" replace />;
  };

  // Check if current route should show header and navigation
  const shouldShowNavigation = () => {
    const publicRoutes = ['/', '/login', '/register', '/guest-dashboard'];
    return !publicRoutes.includes(location.pathname) && isAuthenticated;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Render Header and Navigation only for authenticated routes */}
      {shouldShowNavigation() && (
        <>
          <Header />
          <Navigation activeTab={activeTab} onTabChange={() => {}} />
        </>
      )}

      <main className={shouldShowNavigation()
              ? "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" // Classes for authenticated content
              : "w-full h-full p-0 m-0" // Classes for public pages (full width/height, no padding/margin)
            }>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<ExpenseSyncLanding />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/guest-dashboard" element={
            <GuestDashboardView
              onSignUpClick={() => window.location.href = '/register'}
            />
          } />

          {/* Protected Routes - only accessible if isAuthenticated is true */}
          <Route path="/dashboard" element={
            <ProtectedRoute isAuthenticated={isAuthenticated} loading={loading}>
              <DashboardView
                expenses={expenses}
                groups={groups}
                balances={balances}
                onAddExpenseClick={openAddExpenseModal}
              />
            </ProtectedRoute>
          } />
          <Route path="/groups" element={
            <ProtectedRoute isAuthenticated={isAuthenticated} loading={loading}>
              <GroupList groups={groups} onAddGroup={() => console.log('Add group')} />
            </ProtectedRoute>
          } />
          <Route path="/friends" element={
            <ProtectedRoute isAuthenticated={isAuthenticated} loading={loading}>
              <FriendList friends={friends} />
            </ProtectedRoute>
          } />
          <Route path="/expenses" element={
            <ProtectedRoute isAuthenticated={isAuthenticated} loading={loading}>
              <ExpenseList expenses={expenses} onAddExpense={() => console.log('Add expense')} />
            </ProtectedRoute>
          } />

          {/* Redirect any unmatched routes to the home page */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

        {/* Modal can be rendered conditionally based on state, outside of Routes */}
        {showAddExpenseModal && isAuthenticated && (
          <AddExpenseModal
            onClose={closeAddExpenseModal}
            onSave={(newExpense) => {
              setExpenses(prev => [newExpense, ...prev]);
              closeAddExpenseModal();
            }}
          />
        )}
      </main>
    </div>
  );
};

export default App;