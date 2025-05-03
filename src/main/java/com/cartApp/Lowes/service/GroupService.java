package com.cartApp.Lowes.service;

import java.util.List;
import java.util.Map;

import com.cartApp.Lowes.model.Expense;
import com.cartApp.Lowes.model.Group;

public class GroupService implements IGroupService {

    @Override
    public Group createGroup(String groupName, List<Long> memberIds) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'createGroup'");
    }

    @Override
    public Group addMembers(Long groupId, List<Long> memberIds) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'addMembers'");
    }

    @Override
    public Group removeMembers(Long groupId, List<Long> memberIds) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'removeMembers'");
    }

    @Override
    public Expense addExpense(Long groupId, Expense expense) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'addExpense'");
    }

    @Override
    public List<Expense> getGroupExpenses(Long groupId) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'getGroupExpenses'");
    }

    @Override
    public Map<Long, Map<Long, Double>> calculateGroupBalances(Long groupId) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'calculateGroupBalances'");
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

}
