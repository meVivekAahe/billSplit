package com.cartApp.Lowes.controller;

import java.util.List;

import com.cartApp.Lowes.dto.AddFriendRequestDto;
import com.cartApp.Lowes.dto.InviteRequestDto;
import com.cartApp.Lowes.service.SendEmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.cartApp.Lowes.dto.UserDto;
import com.cartApp.Lowes.model.Expense;
import com.cartApp.Lowes.model.User;
import com.cartApp.Lowes.service.UserServiceImpl;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    UserServiceImpl userService;
    @Autowired
    SendEmailService sendEmailService;

    @GetMapping
    public List<User>getAllUsers(){
        return userService.getAllUsers();
    }

    @PostMapping("/createUser")
    public ResponseEntity<User> createUser(@RequestBody UserDto userDto){
        User user = new User();
        user.setName(userDto.getName());
        user.setEmail(userDto.getEmail());  
        User createdUser= userService.createUser(user);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdUser);
    }

    @GetMapping("/{userId}/friends")
    public List<User>getFriends(@PathVariable Long userId){
        return userService.getFriends(userId);
    }

    /*
    // Send friend request
    @PostMapping("/{userId}/friends/requests")
    public ResponseEntity<?> sendFriendRequest(@PathVariable Long userId, @RequestBody FriendRequestDto request) {
        
    }

    // Accept friend request
    @PutMapping("/{userId}/friends/requests/{requestId}")
    public ResponseEntity<?> respondToFriendRequest(@PathVariable Long userId, @PathVariable Long requestId, @RequestParam boolean accept) {
        // ...
    }

    @GetMapping("/{userId}/friends/expenses")
    public List<Expense>getExpensesWithFriends(@PathVariable Long userId){
        
    }

     */

    @PostMapping("/invite")
    public ResponseEntity<?>sendInvite(@RequestBody InviteRequestDto inviteRequest){
        sendEmailService.sendEmail(inviteRequest.getEmail(),inviteRequest.getSubject(), inviteRequest.getBody());
        return ResponseEntity.ok("Invite sent");
    }

    @PostMapping("/addFriend")
    public ResponseEntity<?>addFriend(@RequestBody AddFriendRequestDto addFriendRequestDto){
        try{
            // userService.addFriend(userId , addFriendRequestDto);
            sendEmailService.sendEmail(addFriendRequestDto.getEmail(), "Test Subject", "Test Body");
            return ResponseEntity.ok("Friend added or invite sent successfully.");
        } catch (Exception e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Failed to add friend or send invite.");

        }

    }





    
}
