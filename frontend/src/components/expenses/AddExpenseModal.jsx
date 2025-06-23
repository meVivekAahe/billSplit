import React, { useState } from 'react';

const AddExpenseModal = ({ onClose, onSave }) => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!description || !amount || !date) return;

    const newExpense = {
      id: Date.now(),
      description,
      amount: parseFloat(amount),
      date,
      paidBy: 'You', // or current user
      group: 'Ungrouped', // or select group logic
    };

    onSave(newExpense);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h3 className="text-lg font-bold mb-4">Add New Expense</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={e => setDescription(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          />
          <input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={e => setAmount(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
            min="0.01"
            step="0.01"
          />
          <input
            type="date"
            value={date}
            onChange={e => setDate(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          />
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded bg-teal-500 text-white hover:bg-teal-600"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddExpenseModal;
