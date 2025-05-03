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
        if (!userIds.contains(payerId)) {
            userIds.add(payerId);// Add payerId to userIds if not already present
        }
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
                    expenseShare.setUser(user);
                    expenseShare.setAmountPerUser(amountPerUser);
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
    public List<Expense> getNonGroupExpensesByUser (Long userId) {
    return expenseRepo.findByUsers_IdAndGroupIsNull(userId);
    }


    @Override
    public List<Expense> getExpensesByGroup(Long groupId) {
        List<Expense> expensesOfGroup = expenseRepo.findByGroupId(groupId);
        return expensesOfGroup;
    }


    @Override
    @Transactional
    public Expense updateExpense(Expense updateExpenseRequest) {

       // Expense existingExpense = expenseRepo.findById(updateExpenseRequest.getId());
       //Expense updatedExpense = updateExistingExpense(existingExpense ,updateExpenseRequest);return   expenseRepo.save(updatedExpense);

         return expenseRepo.findById(updateExpenseRequest.getId())
        .map(existingExpense-> updateExistingExpense(existingExpense, updateExpenseRequest))
        .map(expenseRepo :: save)
        .orElseThrow(()->new ExpenseNotFound("Expense not found"));
    }

    public Expense updateExistingExpense(Expense existingExpense, Expense updatedExpenseData ) {
        
        existingExpense.setName(updatedExpenseData.getName());
        existingExpense.setAmount(updatedExpenseData.getAmount());
        existingExpense.setDescription(updatedExpenseData.getDescription());

        List<ExpenseShare>newExpenseShares  = updatedExpenseData.getSplitShares();
        List<User>newParicipants = newExpenseShares.stream().map(ExpenseShare :: getUser).collect(Collectors.toList());
        List<ExpenseShare>existingExpenseShares = existingExpense.getSplitShares();
        existingExpenseShares.removeIf(share->!newParicipants.contains(share.getUser()));
        double amtPerUser = updatedExpenseData.getAmount() / newParicipants.size();
        
        for(User user : newParicipants){
            ExpenseShare share = findShareByUser(existingExpenseShares , user);
            if(share == null){
                ExpenseShare updatedExpenseShare = new ExpenseShare();
                updatedExpenseShare.setExpense(existingExpense);
                updatedExpenseShare.setUser(user);
                updatedExpenseShare.setAmountPerUser(amtPerUser);
                existingExpense.getSplitShares().add(updatedExpenseShare);
            }else{
                share.setAmountPerUser(amtPerUser);
            }
        }
        return existingExpense;
    }

    @Override
    @Transactional
    public void deleteExpense(Long id) {   
        Expense expense = expenseRepo.findById(id).orElseThrow(()-> new ExpenseNotFound("Expense not found")) ;
        expenseRepo.delete(expense);
    }

    /* 
    @Transactional
    public void addUsersToExpense(Long expenseId, List<Long> userIds) {
        Expense expense = expenseRepo.findById(expenseId).orElseThrow(()->(new ExpenseNotFound("expense not found")));
        List<User>listOfUsers = userRepo.findAllById(userIds);
        Set<User>usersSet = expense.getUsers();
        usersSet.addAll(listOfUsers);
        expenseRepo.save(expense);

    } */


    private ExpenseShare findShareByUser(List<ExpenseShare> shares, User user) {
        for (ExpenseShare share : shares) {
            if (share.getUser().equals(user)) {
                return share;
            }
        }
        return null;
    }
    


}
