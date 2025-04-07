package com.cartApp.Lowes.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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

    public User createUser(User user){
        return userService.CraeteUser(user);
    }

    
}
