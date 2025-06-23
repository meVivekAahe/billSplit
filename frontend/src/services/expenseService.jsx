import ApiService from './api';

export const expenseService = {
  // Get all expenses
  getAllExpenses: () => ApiService.get('/expenses'),

  // Get expenses by group
  getExpensesByGroup: (groupId) => ApiService.get(`/expenses/group/${groupId}`),

  // Create new expense
  createExpense: (expenseData) => ApiService.post('/expenses', expenseData),

  // Update expense
  updateExpense: (id, expenseData) => ApiService.put(`/expenses/${id}`, expenseData),

  // Delete expense
  deleteExpense: (id) => ApiService.delete(`/expenses/${id}`),

  // Get user's balance summary
  getUserBalance: () => ApiService.get('/expenses/balance'),
};