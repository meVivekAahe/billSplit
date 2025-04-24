package com.cartApp.Lowes.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cartApp.Lowes.model.Expense;

public interface ExpenseRepo extends JpaRepository<Expense , Long> {

    List<Expense> findByGroupId(Long groupId);
    List<Expense> findByUsers_IdAndGroupIsNull(Long userId);   //— for individual expenses.
    List<Expense>findByUsers_IdAndGroupIsNotNull(Long userId); //— for group expenses.
}
