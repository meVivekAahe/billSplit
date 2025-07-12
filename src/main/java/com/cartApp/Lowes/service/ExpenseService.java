package com.cartApp.Lowes.service;

import java.util.List;

import com.cartApp.Lowes.model.Expense;
import com.cartApp.Lowes.model.SplitType;

public interface ExpenseService {
        //void createIndividualExpense(Expense expense, List<Long> userIds);
        List<Expense>getNonGroupExpensesByUser (Long userId);
        List<Expense> getAllExpensesByUser(Long userId);
        List<Expense> getGroupExpensesByUser(Long userId);
        Expense createExpense(Expense expense , List<Long> userIds, Long payerId, SplitType splitType);
        Expense getExpenseById(Long id);
        List<Expense>getExpensesByGroup(Long groupId);
        Expense updateExpense(Expense updateExpenseRequest);
        void deleteExpense(Long id);
        //void addUsersToExpense(Long expenseId, List<Long> userIds);

}
