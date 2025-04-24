package com.cartApp.Lowes.service;

import java.util.List;

import com.cartApp.Lowes.model.Transaction;

public interface ITransactionService {

    Transaction createTransaction(Transaction transaction);
    Transaction getTransactionById(Long id);
    List<Transaction>getAllTransactions();
    Transaction geTransactionsByExpense(Long expenseId);
    Transaction getTransactionsByUser(Long userId);
    void updateTransaction(Transaction transaction);
    void deleteTransaction(Long id); 

}
