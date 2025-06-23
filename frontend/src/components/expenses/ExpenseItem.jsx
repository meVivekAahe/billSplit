import React from 'react';
import { Receipt } from 'lucide-react';

const ExpenseItem = ({ expense }) => (
  <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm border">
    <div className="flex items-center space-x-3">
      <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center">
        <Receipt size={20} className="text-teal-600" />
      </div>
      <div>
        <h4 className="font-medium">{expense.description}</h4>
        <p className="text-sm text-gray-500">{expense.group} • {expense.date}</p>
      </div>
    </div>
    <div className="text-right">
      <p className="font-bold">${expense.amount}</p>
      <p className="text-sm text-gray-500">paid by {expense.paidBy}</p>
    </div>
  </div>
);

export default ExpenseItem;