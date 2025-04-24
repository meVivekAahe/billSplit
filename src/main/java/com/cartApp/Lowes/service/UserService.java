package com.cartApp.Lowes.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cartApp.Lowes.Exception.UserNotFoundException;
import com.cartApp.Lowes.model.User;
import com.cartApp.Lowes.repo.UserRepository;

@Service
public class UserService implements IUserService{

    @Autowired
    UserRepository userRepository;

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

    



}
