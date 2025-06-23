import React from 'react';
import { Plus } from 'lucide-react';
import ExpenseItem from './ExpenseItem';

const ExpenseList = ({ expenses, onAddExpense }) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">All Expenses</h2>
        <button 
          onClick={onAddExpense}
          className="bg-teal-500 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-teal-600"
        >
          <Plus size={20} />
          <span>Add Expense</span>
        </button>
      </div>
      <div className="space-y-3">
        {expenses.map(expense => (
          <ExpenseItem key={expense.id} expense={expense} />
        ))}
      </div>
    </div>
  );
};

export default ExpenseList;