package com.cartApp.Lowes.service;

import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.cartApp.Lowes.Exception.UserNotFoundException;
import com.cartApp.Lowes.model.Expense;
import com.cartApp.Lowes.model.Friendship;
import com.cartApp.Lowes.model.User;
import com.cartApp.Lowes.repo.FriendshipRepo;
import com.cartApp.Lowes.repo.UserRepository;

@Service
public class UserService implements IUserService{

    @Autowired
    UserRepository userRepository;

    @Autowired
    FriendshipRepo friendshipRepo;

    @Override
    public User createUser(User user) {
        return userRepository.save(user);
    }

    @Override
    public User getUserById(Long id) {
        return userRepository.findById(id)
        .orElseThrow(()->(new UserNotFoundException("user not Found")));

    }

    @Override
    public List<User> getAllUsers() {
        List<User> allUsers = userRepository.findAll();
        return allUsers;
    }

    @Override
    public void updateUser(User user) {
        
    }

    @Override
    public void deleteUser(Long id) {
        
    }

    @Override
    public List<User> getFriends(Long userId) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'getFriends'");
    }

    @Override
    public List<Expense> getExpensesWithFriend(Long userId, Long friendId) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'getExpensesWithFriend'");
    }

    @Override
    public Map<User, Double> getBalancesWithFriends(Long userId) {
        List<Friendship>friends = friendshipRepo.findAll()
    }

    



}
 // 1. Get user's friend list using FriendshipRepository
    // 2. Create a map to store balances: Map<User, Double> balances = new HashMap<>();
    // 3. Iterate over each friend:
    //    - Calculate the balance between the user and that friend using ExpenseRepository
    //    - Put the friend and balance into the map
    // 4. Return the map