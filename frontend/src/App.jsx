import React, { useState, useEffect } from 'react';
import Header from './components/common/Header';
import Navigation from './components/common/Navigation';
import DashboardView from './components/dashboard/DashboardView';
import ExpenseList from './components/expenses/ExpenseList';
import GroupList from './components/groups/GroupList';
//import { expenseService } from './services/expenseService';
//import { groupService } from './services/groupService';
import AddExpenseModal from './components/expenses/AddExpenseModal';
import './app.css';



const App = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [expenses, setExpenses] = useState([]);
  const [groups, setGroups] = useState([]);
  const [balances, setBalances] = useState({ total: 0, owe: 0, owed: 0 });
  const [loading, setLoading] = useState(true);

  
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
  const openAddExpenseModal = () => setShowAddExpenseModal(true);
  const closeAddExpenseModal = () => setShowAddExpenseModal(false);

  // Load data on component mount
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      /*
      const [expensesData, groupsData, balanceData] = await Promise.all([
        expenseService.getAllExpenses(),
        groupService.getUserGroups(),
        expenseService.getUserBalance(),
      ]);
      
      setExpenses(expensesData);
      setGroups(groupsData);
      setBalances(balanceData); */

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

    setBalances({ total: 12.50, owe: 45.25, owed: 32.75 });
    } catch (error) {
      console.error('Error loading data:', error);
      // Handle error (show notification, etc.)
    } finally {
      setLoading(false);
    }
  }; 

  const renderContent = () => {
  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  switch (activeTab) {
    case 'dashboard':
      return (
        <>
          <DashboardView 
            expenses={expenses} 
            groups={groups} 
            balances={balances} 
            onAddExpenseClick={openAddExpenseModal} 
          />
          {showAddExpenseModal && (
            <AddExpenseModal 
              onClose={closeAddExpenseModal} 
              onSave={(newExpense) => {
                setExpenses(prev => [newExpense, ...prev]);
                closeAddExpenseModal();
              }}
            />
          )}
        </>
      );

    case 'groups':
      return <GroupList groups={groups} onAddGroup={() => console.log('Add group')} />;

    case 'expenses':
      return <ExpenseList expenses={expenses} onAddExpense={() => console.log('Add expense')} />;

    default:
      return (
        <>
          <DashboardView expenses={expenses} groups={groups} balances={balances} />
          {showAddExpenseModal && (
            <AddExpenseModal 
              onClose={closeAddExpenseModal} 
              onSave={(newExpense) => {
                setExpenses(prev => [newExpense, ...prev]);
                closeAddExpenseModal();
              }}
            />
          )}
        </>
      );
  }
};


  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderContent()}
      </main>
    </div>
  );
};

export default App;