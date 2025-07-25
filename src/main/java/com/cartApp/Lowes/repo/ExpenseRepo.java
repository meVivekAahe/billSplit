package com.cartApp.Lowes.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cartApp.Lowes.model.Expense;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ExpenseRepo extends JpaRepository<Expense , Long> {

    List<Expense> findByGroupId(Long groupId);
    List<Expense> findByParticipants_IdAndGroupIsNull(Long userId);   //— for individual expenses.
    List<Expense>findByParticipants_IdAndGroupIsNotNull(Long userId); //— for group expenses.
    @Query("SELECT e FROM Expense e JOIN e.participants  u1 JOIN e.participants  u2 WHERE u1.id = :userId AND u2.id = :friendId")
    List<Expense> findExpensesBetweenUsers(@Param("userId") Long userId, @Param("friendId") Long friendId);

}
