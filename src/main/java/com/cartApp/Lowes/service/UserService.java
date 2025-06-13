package com.cartApp.Lowes.service;

import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.cartApp.Lowes.Exception.UserNotFoundException;
import com.cartApp.Lowes.model.Expense;
import com.cartApp.Lowes.model.ExpenseShare;
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
        
        throw new UnsupportedOperationException("Unimplemented method 'getFriends'");
    }

    @Override
    public List<Expense> getExpensesWithFriend(Long userId, Long friendId) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'getExpensesWithFriend'");
    }

    @Override
    public Map<User, Double> getBalancesWithFriends(Long userId) {
        List<Friendship>friendships = friendshipRepo.findAcceptedFriendshipsForUser(userId);
        Set<User>friends = new HashSet<>();
        Map<User ,Double>balances = new HashMap<>();
        for(Friendship f : friendships){
            if(f.getUser().getId()== userId){
                friends.add(f.getFriend()); 
            }else{
                friends.add(f.getUser());
            }
        }
        for(User friend : friends){
            double balance = calculateBalanceBetweenUsers(userId, friend.getId());
            balances.put(friend,balance);
        }
        return balances;
    }

    private double calculateBalanceBetweenUsers(Long userId, long friendId) {
        List<Expense>expenses = friendshipRepo.findExpensesBetweenUsers(userId, friendId);
        double userOwesFriend = 0.0;
        double friendOwesUser = 0.0;
        
        for(Expense expense : expenses){
            User payer = expense.getPayer();
            // Find shares for user and friend in this expense
             double userShare = expense.getSplitShares().stream()
            .filter(es -> es.getUser().getId()==userId)
            .mapToDouble(ExpenseShare::getAmountPerUser)
            .findFirst()
            .orElse(0.0);

             double friendShare = expense.getSplitShares().stream()
            .filter(es -> es.getUser().getId()==friendId)
            .mapToDouble(ExpenseShare::getAmountPerUser)
            .findFirst()
            .orElse(0.0);
            if (payer.getId()==userId) {
                // User paid, friend owes user
                friendOwesUser += friendShare;
            } else if (payer.getId()==friendId) {
                // Friend paid, user owes friend
                userOwesFriend += userShare;
            }else{
                continue; // Payer is third party → ignore for user-friend balance
            }
        }
        return friendOwesUser - userOwesFriend;

    }

    



}
 // 1. Get user's friend list using FriendshipRepository
    // 2. Create a map to store balances: Map<User, Double> balances = new HashMap<>();
    // 3. Iterate over each friend:
    //    - Calculate the balance between the user and that friend using ExpenseRepository
    //    - Put the friend and balance into the map
    // 4. Return the map