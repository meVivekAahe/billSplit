package com.cartApp.Lowes.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
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
import com.cartApp.Lowes.service.UserService;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    UserService userService;
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

    //https://www.perplexity.ai/search/juts-want-to-confrim-do-you-ha-5EOJFVlrR3Csgslsv2T9jQ
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





    
}
