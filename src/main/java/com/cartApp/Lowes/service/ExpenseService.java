package com.cartApp.Lowes.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cartApp.Lowes.Exception.ExpenseNotFound;
import com.cartApp.Lowes.Exception.UserNotFoundException;
import com.cartApp.Lowes.dto.ExpenseDto;
import com.cartApp.Lowes.model.Expense;
import com.cartApp.Lowes.model.ExpenseShare;
import com.cartApp.Lowes.model.Group;
import com.cartApp.Lowes.model.SplitType;
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

    ExpenseDto expenseDTO;

    @Override
    public Expense createExpense(Expense expense , List<Long> userIds, Long payerId, SplitType splitType) {

        // 1. Validate input (e.g., users exist, amounts are positive) i know it's important but i will do this later  . validateExpenseDTO(expenseDTO);
        List<User>allParticipents = userRepo.findAllById(userIds);
        User payer = userRepo.findById(payerId).orElseThrow(()->new UserNotFoundException("user not found"));
        expense.setPayer(payer);
        List<ExpenseShare>splits = calculateExpenseShares(expense , allParticipents , splitType);
        expense.setSplitShares(splits);
        return expenseRepo.save(expense);
    }

    private List<ExpenseShare> calculateExpenseShares(Expense expense, List<User> allParticipents,
            SplitType splitType) {
        
                double amountPerUser = expense.getAmount() / allParticipents.size();
                List<ExpenseShare>splits = allParticipents.stream().map(user->{
                    ExpenseShare expenseShare = new ExpenseShare();
                    expenseShare.setExpense(expense);
                    expenseShare.setAmountPerUser(amountPerUser);
                    expenseShare.setUser(user);
                    return expenseShare;
                }).collect(Collectors.toList());

                return splits;

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
