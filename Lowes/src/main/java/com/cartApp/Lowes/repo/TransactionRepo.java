package com.cartApp.Lowes.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cartApp.Lowes.modal.Transaction;

public interface TransactionRepo extends JpaRepository<Transaction,Long>{

}
