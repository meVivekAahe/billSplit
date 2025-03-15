package com.cartApp.Lowes.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cartApp.Lowes.modal.Expense;

public interface ExpenseRepo extends JpaRepository<Expense , Long> {

}
