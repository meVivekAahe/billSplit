package com.cartApp.Lowes.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cartApp.Lowes.model.User;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User , Long>{

    Optional<User> findByEmail(String email);
    Optional<User> findByPhoneNumber(Long phoneNumber);

}
