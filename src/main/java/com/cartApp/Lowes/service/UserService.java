package com.cartApp.Lowes.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cartApp.Lowes.model.User;
import com.cartApp.Lowes.repo.UserRepository;

@Service
public class UserService {

    @Autowired
    UserRepository userRepository;

    public List<User>getAllUsers(){
        return userRepository.findAll();
    }

    public User CraeteUser(User user){
        return userRepository.save(user);
    }



}
