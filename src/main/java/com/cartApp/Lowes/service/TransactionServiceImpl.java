package com.cartApp.Lowes.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.cartApp.Lowes.model.Transaction;

@Service
public class TransactionServiceImpl implements TransactionService {

    @Override
    public Transaction createTransaction(Transaction transaction) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'createTransaction'");
    }

    @Override
    public Transaction getTransactionById(Long id) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'getTransactionById'");
    }

    @Override
    public List<Transaction> getAllTransactions() {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'getAllTransactions'");
    }

    @Override
    public Transaction geTransactionsByExpense(Long expenseId) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'geTransactionsByExpense'");
    }

    @Override
    public Transaction getTransactionsByUser(Long userId) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'getTransactionsByUser'");
    }

    @Override
    public void updateTransaction(Transaction transaction) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'updateTransaction'");
    }

    @Override
    public void deleteTransaction(Long id) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'deleteTransaction'");
    }

}
