package com.cartApp.Lowes.service;

import java.util.List;
import java.util.Map;

import com.cartApp.Lowes.model.Expense;
import com.cartApp.Lowes.model.Group;

public interface IGroupService {

    Group createGroup(String groupName, List<Long> memberIds);
    Group addMembers(Long groupId, List<Long> memberIds);
    Group removeMembers(Long groupId, List<Long> memberIds);
    //Expense addExpense(Long groupId, Expense expense);
    List<Expense> getGroupExpenses(Long groupId);
    Map<Long, Double> calculateGroupBalances(Long groupId);
    double settleDebt(Long groupId, Long userId, Long friendId, double amount);
    String generateGroupInviteLink(Long groupId);

}

