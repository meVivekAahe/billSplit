package com.cartApp.Lowes.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cartApp.Lowes.Exception.ExpenseNotFound;
import com.cartApp.Lowes.model.Expense;
import com.cartApp.Lowes.model.User;
import com.cartApp.Lowes.repo.ExpenseRepo;
import com.cartApp.Lowes.repo.UserRepository;

import jakarta.transaction.Transactional;

@Service
public class ExpenseService implements IExpenseService{

    @Autowired
    ExpenseRepo expenseRepo;

    @Autowired
    UserRepository userRepo;

    @Override
    public Expense createExpense(Expense expense) {
        return expenseRepo.save(expense);
    }

    @Override
    public Expense getExpenseById(Long id) {
        return expenseRepo
        .findById(id).orElseThrow(()->new ExpenseNotFound("expense not found"));
    }

    @Override
    public List<Expense> getAllExpenses() {
        List<Expense> allExpenses = expenseRepo.findAll();
        return allExpenses;
    }

    @Override
    public List<Expense> getGroupExpensesByUser(Long userId) {
        List<Expense>listOfGroupExpensesByAUser  = expenseRepo.findByUsers_IdAndGroupIsNotNull(userId); 
        return listOfGroupExpensesByAUser;
    }

    @Override
    public List<Expense> getAllExpensesByUser(Long userId) {
        List<Expense> allExpenses = new ArrayList<>();
        allExpenses.addAll(expenseRepo.findByUsers_IdAndGroupIsNotNull(userId));
        allExpenses.addAll(expenseRepo.findByUsers_IdAndGroupIsNull(userId));
        return allExpenses;
    }

    @Override
    public List<Expense> getIndividualExpensesByUser(Long userId) {
    return expenseRepo.findByUsers_IdAndGroupIsNull(userId);
    }


    @Override
    public List<Expense> getExpensesByGroup(Long groupId) {
        List<Expense> expensesOfGroup = expenseRepo.findByGroupId(groupId);
        return expensesOfGroup;
    }


    @Override
    public void updateExpense(Expense expense) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'updateExpense'");
    }

    @Override
    public void deleteExpense(Long id) {    
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'deleteExpense'");
    }

    @Override
    @Transactional
    public void addUsersToExpense(Long expenseId, List<Long> userIds) {
        Expense expense = expenseRepo.findById(expenseId).orElseThrow(()->(new ExpenseNotFound("expense not found")));
        List<User>listOfUsers = userRepo.findAllById(userIds);
        Set<User>usersSet = expense.getUsers();
        usersSet.addAll(listOfUsers);
        expenseRepo.save(expense);

    }


}
