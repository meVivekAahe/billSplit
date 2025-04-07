package com.cartApp.Lowes.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cartApp.Lowes.model.Group;

public interface GroupRepo extends JpaRepository<Group , Long> {

}
