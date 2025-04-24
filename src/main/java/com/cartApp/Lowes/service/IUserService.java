package com.cartApp.Lowes.service;

import java.util.List;

import com.cartApp.Lowes.model.User;

public interface IUserService {

    User createUser(User user);
    User getUserById(Long id);
    List<User> getAllUsers();
    void updateUser(User user);
    void deleteUser(Long id);

}
