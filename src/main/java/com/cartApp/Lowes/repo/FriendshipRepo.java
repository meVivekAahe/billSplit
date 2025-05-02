package com.cartApp.Lowes.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cartApp.Lowes.model.Friendship;

public interface FriendshipRepo extends JpaRepository<Friendship , Long>{

    List<Friendship> findByUserId(Long userId);

    List<Friendship> findByFriendId(Long friendId);


}
