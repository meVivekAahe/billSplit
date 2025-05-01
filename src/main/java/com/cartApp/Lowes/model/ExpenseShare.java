package com.cartApp.Lowes.model;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;


@Entity
public class ExpenseShare {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JsonBackReference
    private Expense expense;

    @ManyToOne
    private User user;

    private double amountPerUser; // amount owed or paid by this user

    private double percentage; // optional, if split by percentage

    
    public ExpenseShare() {
    }

    

     public ExpenseShare(Expense expense, User user, double amountPerUser) {
        this.expense = expense;
        this.user = user;
        this.amountPerUser = amountPerUser;
    }



    // getters and setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Expense getExpense() {
        return expense;
    }

    public void setExpense(Expense expense) {
        this.expense = expense;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    

    public double getPercentage() {
        return percentage;
    }

    public void setPercentage(double percentage) {
        this.percentage = percentage;
    }



    public double getAmountPerUser() {
        return amountPerUser;
    }



    public void setAmountPerUser(double amountPerUser) {
        this.amountPerUser = amountPerUser;
    }

   

    

    
}

