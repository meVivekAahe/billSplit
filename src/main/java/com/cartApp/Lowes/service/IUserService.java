package com.cartApp.Lowes.service;

import java.util.List;
import java.util.Map;

import com.cartApp.Lowes.model.Expense;
import com.cartApp.Lowes.model.User;

public interface IUserService {

    User createUser(User user);
    User getUserById(Long id);
    List<User> getAllUsers();
    void updateUser(User user);
    void deleteUser(Long id);
    List<User> getFriends(Long userId);
    List<Expense> getExpensesWithFriend(Long userId, Long friendId);
    Map<User, Double> getBalancesWithFriends(Long userId);



}
