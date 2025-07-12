package com.cartApp.Lowes.service;

import java.time.LocalDateTime;
import java.util.*;
import com.cartApp.Lowes.dto.AddFriendRequestDto;
import com.cartApp.Lowes.model.*;
import com.cartApp.Lowes.repo.ExpenseRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.cartApp.Lowes.Exception.UserNotFoundException;
import com.cartApp.Lowes.repo.FriendshipRepo;
import com.cartApp.Lowes.repo.UserRepository;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    FriendshipRepo friendshipRepo;

    @Autowired
    ExpenseRepo expenseRepo;

    @Autowired
    SendEmailService emailService;

    @Override
    public User createUser(User user) {
        return userRepository.save(user);
    }


    @Override
    public User getUserById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> (new UserNotFoundException("user not Found")));
    }

    @Override
    public List<User> getAllUsers() {
        List<User> allUsers = userRepository.findAll();
        return allUsers;
    }

    @Override
    public void updateUser(User user) {
        User s = userRepository.findById(user.getId()).orElse(null) ;
        s.setEmail(user.getEmail());
        s.setName(user.getName());
        userRepository.save(s);
    }

    @Override
    public void deleteUser(Long id) {
        User user = userRepository.findById(id).
                orElseThrow(() -> new UserNotFoundException(STR."User not found with id: \{id}"));
        userRepository.deleteById(id);
    }

    @Override
    public List<User> getFriends(Long userId) {

        User user = userRepository.findById(userId).
                orElseThrow(() -> new UserNotFoundException(STR."User not found with id: \{userId}"));
        List<Friendship>friendships = friendshipRepo.findAcceptedFriendshipsForUser(userId) ;
        List<User> friends = new ArrayList<>();
        for(Friendship friendship : friendships){
            //FriendshipStatus status =  friend.getStatus();
            if (friendship.getUser().getId().equals(userId)) {
                friends.add(friendship.getFriend());
            }else {
                friends.add(friendship.getUser());
            }
        }
        return friends;
    }


    @Override
    public List<Expense> getExpensesWithFriend(Long userId, Long friendId) {

        List <Expense> expensesWithFriend = expenseRepo.findExpensesBetweenUsers(userId , friendId);

        return  expensesWithFriend;
    }

    @Override
    public Map<User, Double> getBalancesWithFriends(Long userId) {
        List<Friendship> friendships = friendshipRepo.findAcceptedFriendshipsForUser(userId);
        Set<User> friends = new HashSet<>();
        Map<User, Double> balances = new HashMap<>();
        for (Friendship f : friendships) {
            if (f.getUser().getId() == userId) {
                friends.add(f.getFriend());
            } else {
                friends.add(f.getUser());
            }
        }
        for (User friend : friends) {
            double balance = calculateBalanceBetweenUsers(userId, friend.getId());
            balances.put(friend, balance);
        }
        return balances;
    }

    @Override
    public void addFriend(Long senderId, AddFriendRequestDto requestDto) {
        User sender = userRepository.findById(senderId)
                .orElseThrow(() -> new UserNotFoundException("Sender not found"));
        User receiver = resolveReceiver(requestDto);
        if (receiver != null) {
            handleRegisteredReceiver(sender, receiver);
        } else {
            handleUnregisteredReceiver(sender, requestDto.getEmail(), requestDto.getPhoneNumber());

        }
    }

    private User resolveReceiver (AddFriendRequestDto dto){
        if (dto.getReceiverId() != null) {
            return userRepository.findById(dto.getReceiverId()).orElse(null);
        }
        if (dto.getEmail() != null) {
            return userRepository.findByEmail(dto.getEmail()).orElse(null);
        }
        if (dto.getPhoneNumber() != null) {
            return userRepository.findByPhoneNumber(dto.getPhoneNumber()).orElse(null);
        }
        throw new IllegalArgumentException("No identification provided");
    }

    private double calculateBalanceBetweenUsers (Long userId,long friendId){
            List<Expense> expenses = friendshipRepo.findExpensesBetweenUsers(userId, friendId);
            double userOwesFriend = 0.0;
            double friendOwesUser = 0.0;

            for (Expense expense : expenses) {
                User payer = expense.getPayer();
                // Find shares for user and friend in this expense
                double userShare = expense.getSplitShares().stream()
                        .filter(es -> es.getUser().getId() == userId)
                        .mapToDouble(ExpenseShare::getAmountPerUser)
                        .findFirst()
                        .orElse(0.0);

                double friendShare = expense.getSplitShares().stream()
                        .filter(es -> es.getUser().getId() == friendId)
                        .mapToDouble(ExpenseShare::getAmountPerUser)
                        .findFirst()
                        .orElse(0.0);
                if (payer.getId() == userId) {
                    // User paid, friend owes user
                    friendOwesUser += friendShare;
                } else if (payer.getId() == friendId) {
                    // Friend paid, user owes friend
                    userOwesFriend += userShare;
                } else {
                    continue; // Payer is third party → ignore for user-friend balance
                }
            }
            return friendOwesUser - userOwesFriend;

        }
    

    private void handleUnregisteredReceiver(User sender, String email, Long phoneNumber) {
        String token = generateInviteToken();
        String inviteLink = STR."https://expensesync.pages.dev/invite?token=\{token}";
        if(email != null){
            sendEmailInvite(email, inviteLink, sender.getName());
        } else if (phoneNumber != null) {
            sendSmsInvite(phoneNumber.toString(), inviteLink, sender.getName());
        }
    }

    private void sendSmsInvite(String string, String inviteLink, String name) {
    }


    private void handleRegisteredReceiver(User sender, User receiver) {
        //a user cannot add themselves
        if (sender.getId().equals(receiver.getId())) {
            throw new IllegalArgumentException("Cannot add yourself as friend");
        }
        Optional<Friendship>existingFriendship = friendshipRepo.findByUserAndFriend(sender,receiver);
        if(existingFriendship.isPresent()){
            throw new IllegalStateException("Friendship already exists");
        }
        Friendship friendship = new Friendship();
        friendship.setUser(sender);
        friendship.setFriend(receiver);
        friendship.setRequestDate(LocalDateTime.now());
        friendship.setStatus(FriendshipStatus.ACCEPTED);
        friendshipRepo.save(friendship);

        sendFriendNotification(sender, receiver);

    }

    private void sendFriendNotification(User sender, User receiver) {
        // Implement email notification logic
        String subject = "You've been added as a friend!";
        String body = STR."\{sender.getName()} added you as a friend on Expense Sync";
        emailService.sendEmail(receiver.getEmail(), subject, body);
    }

    private void sendEmailInvite(String email, String inviteLink, String senderName) {
        String subject = "Join Expense Sync!";
        String body = STR."\{senderName} invited you to join Expense Sync. Use this link: \{inviteLink}";
        emailService.sendEmail(email, subject, body);
    }

    /*
    private void sendSmsInvite(String phoneNumber, String inviteLink, String senderName) {
        String message = STR."\{senderName} invited you to BillSplit. Join here: \{inviteLink}";
        smsService.sendSms(phoneNumber, message);
    } */

    private String generateInviteToken() {
        // Use UUID for simplicity, consider JWT for more security
        return UUID.randomUUID().toString();
    }




}














   /*
    public void sendFriendRequest(Long senderId, Long receiverId) {
        // 1. Validate users exist
        // 2. Check if a Friendship already exists (any status) between sender and receiver
        // 3. If not, create new Friendship with status PENDING and set requestDate
        // 4. Save the entity
    }

    public void respondToFriendRequest(Long receiverId, Long friendshipId, boolean accept) {
        // 1. Validate friendship exists and receiver is correct
        // 2. If accept: set status to ACCEPTED, set approvalDate
        // 3. If reject: set status to REJECTED, set approvalDate
        // 4. Save the entity
    }*/









// 1. Get user's friend list using FriendshipRepository
        // 2. Create a map to store balances: Map<User, Double> balances = new HashMap<>();
        // 3. Iterate over each friend:
        //    - Calculate the balance between the user and that friend using ExpenseRepository
        //    - Put the friend and balance into the map
        // 4. Return the map