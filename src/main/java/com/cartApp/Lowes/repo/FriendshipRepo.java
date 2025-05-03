package com.cartApp.Lowes.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.cartApp.Lowes.model.Expense;
import com.cartApp.Lowes.model.Friendship;

public interface FriendshipRepo extends JpaRepository<Friendship , Long>{

    @Query("SELECT f FROM Friendship f WHERE (f.user.id = :userId OR f.friend.id = :userId) AND f.status = 'accepted'")
    List<Friendship> findAcceptedFriendshipsForUser(@Param("userId") Long userId);

    //@Query(" SELECT e FROM Expense e JOIN e.expenseShares esUser JOIN e.expenseShares esFriend WHERE e.payer.id IN (:userId, :friendId) AND esUser.user.id = :userId AND esFriend.user.id = :friendId") //This only fetches expenses where the payer is either user or friend
    @Query("SELECT e FROM Expense e JOIN e.expenseShares esUser JOIN e.expenseShares esFriend WHERE esUser.user.id = :userId AND esFriend.user.id = :friendId") //This fetches all expenses where both user and friend participated. group and non group
    List<Expense> findExpensesBetweenUsers(@Param("userId") Long userId, @Param("friendId") Long friendId);


}
