import React from 'react';
import BalanceCard from './BalanceCard';
import ExpenseItem from '../expenses/ExpenseItem';
import GroupItem from '../groups/GroupItem';
import { Plus } from 'lucide-react';


const DashboardView = ({ expenses, groups, balances , onAddExpenseClick  }) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Dashboard</h2>
        <button
          onClick={onAddExpenseClick}
          className="bg-teal-500 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-teal-600"
        >
          <Plus size={20} />
          <span>Add Expense</span>
        </button>
      </div>
      <div className="balance-grid">
        <BalanceCard title="Total balance" amount={balances.total} type="positive" />
        <BalanceCard title="You owe" amount={balances.owe} type="negative" />
        <BalanceCard title="You are owed" amount={balances.owed} type="positive" />
      </div>
      
      <div className="section">
        <h2>Recent Activity</h2>
        <div className="item-list">
          {expenses.slice(0, 3).map(expense => (
            <ExpenseItem key={expense.id} expense={expense} />
          ))}
        </div>
      </div>

      <div className="section">
        <h2>Groups Overview</h2>
        <div className="groups-grid">
          {groups.slice(0, 4).map(group => (
            <GroupItem key={group.id} group={group} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardView;