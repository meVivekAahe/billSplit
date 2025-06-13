package com.cartApp.Lowes.service;

import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

import com.cartApp.Lowes.Exception.GroupNotFound;
import com.cartApp.Lowes.Exception.UserNotFoundException;
import com.cartApp.Lowes.model.Expense;
import com.cartApp.Lowes.model.ExpenseShare;
import com.cartApp.Lowes.model.Group;
import com.cartApp.Lowes.model.User;
import com.cartApp.Lowes.repo.GroupRepo;
import com.cartApp.Lowes.repo.UserRepository;

public class GroupService implements IGroupService {

    @Autowired
    GroupRepo groupRepo;

    @Autowired
    UserRepository userRepo;

    @Autowired
    ExpenseService expenseService;
    
    @Override
    public Group createGroup(String groupName, List<Long> memberIds) {
        Group group = new Group();
        List<User>membersList = userRepo.findAllById(memberIds); 
        Set<User>membersSet = new HashSet<>(membersList);
        group.setName(groupName);
        group.setMembers(membersSet);
        for(User user : membersSet){
            user.getGroupMember().add(group);
        }
        return groupRepo.save(group);
    }

    @Override
    @Transactional
    public Group addMembers(Long groupId, List<Long> memberIds) {
        Group group = groupRepo.findById(groupId).orElseThrow(()-> new GroupNotFound("group not found"));

        List<User>membersList = userRepo.findAllById(memberIds);
        Set<User>existingMembers = group.getMembers(); 
        Set<User>membersSet = new HashSet<>(membersList);
         
        existingMembers.addAll(membersSet);
        group.setMembers(existingMembers);
        for(User user : membersSet){
            user.getGroupMember().add(group);
        } userRepo.saveAll(membersSet);
        return groupRepo.save(group);
    }

    @Override
    public Group removeMembers(Long groupId, List<Long> memberIds) {
        Group group = groupRepo.findById(groupId).orElseThrow(()-> new GroupNotFound("group not found"));
        
        List<User>membersToRemove = userRepo.findAllById(memberIds); 
        Set<User>groupMembers  = group.getMembers();

        groupMembers.removeAll(membersToRemove);
        for(User user : membersToRemove){   
            user.getGroupMember().remove(group);
        }
        userRepo.saveAll(membersToRemove);
        return groupRepo.save(group);
    }


    @Override
    public List<Expense> getGroupExpenses(Long groupId) {
        groupRepo.findById(groupId).orElseThrow(() -> new GroupNotFound("Group not found"));
        return expenseService.getExpensesByGroup(groupId);
    }

    @Override
    public Map<Long, Double> calculateGroupBalances(Long groupId) {
        //Expense expense;
        User participant  = userRepo.findById(groupId).orElseThrow(() -> new UserNotFoundException("User not found"));
        groupRepo.findById(groupId).orElseThrow(() -> new GroupNotFound("Group not found"));
        List<Expense>listOfExpenses = expenseService.getExpensesByGroup(groupId);
        Map<Long, Double> expenseBalances = new HashMap<>();   // expenseId -> amount participant lent (+) or owes (-)
        for(Expense expense : listOfExpenses){
            User payer = expense.getPayer();
            double totalAmount = expense.getAmount();
            //List<ExpenseShare>sharesExp = expense.getSplitShares();
            Optional<ExpenseShare>participantShareOpt  = expense.getSplitShares().stream()
            .filter(sharesExp->sharesExp.getUser().equals(participant)).findFirst();

            if (!participantShareOpt.isPresent()) {
                // Participant not involved in this expense
                continue;
            }
            double participantShare = participantShareOpt.get().getAmountPerUser();
            if(participant.equals(payer)){
                double lentAmount = totalAmount - participantShare;
                expenseBalances.put(expense.getId(), lentAmount);
            }else{
                expenseBalances.put(expense.getId(), -participantShare);
            }
        }
        return expenseBalances;
    }

    @Override
    public double settleDebt(Long groupId, Long userId, Long friendId, double amount) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'settleDebt'");
    }

    @Override
    public String generateGroupInviteLink(Long groupId) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'generateGroupInviteLink'");
    }


    // public Expense addExpense(Long groupId, Expense expense) {}

}
