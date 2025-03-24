package com.cartApp.Lowes.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cartApp.Lowes.model.Friendship;

public interface FriendshipRepo extends JpaRepository<Friendship , Long>{

}
