package com.cartApp.Lowes.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cartApp.Lowes.model.User;

public interface UserRepository extends JpaRepository<User , Long>{

}
