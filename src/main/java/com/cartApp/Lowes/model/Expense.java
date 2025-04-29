package com.cartApp.Lowes.model;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import jakarta.persistence.OneToMany;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;

@Entity
public class Expense implements Serializable{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id ;

    private String name;
    private double amount;

    @Column(name = "expense_desc")
    private String description;


    @ManyToOne(cascade = CascadeType.PERSIST, fetch = FetchType.LAZY )
    @JoinColumn(name = "group_id")
    private Group group;

    @ManyToMany(cascade = CascadeType.PERSIST, fetch = FetchType.LAZY)
    @JoinTable( name = "expense_user",
    joinColumns = @JoinColumn(name = "expense_id"),
    inverseJoinColumns = @JoinColumn(name = "user_id"))
    private Set<User>users = new HashSet<>();

    @OneToMany(mappedBy="expense" ,cascade = CascadeType.PERSIST, fetch = FetchType.LAZY)
    private List<Transaction>transactions = new ArrayList<>();

    
    @Enumerated(EnumType.STRING)
    private SplitType splitType;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "payer_id", nullable = false)
    private User payer;

    @OneToMany(mappedBy = "expense", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ExpenseShare> splitShares = new ArrayList<>();
    

    
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public double getAmount() {
        return amount;
    }
    public void setAmount(double amount) {
        this.amount = amount;
    }
    public String getDescription() {
        return description;
    }
    public void setDescription(String description) {
        this.description = description;
    }
    public Group getGroup() {
        return group;
    }
    public void setGroup(Group group) {
        this.group = group;
    }
    public SplitType getSplitType() {
        return splitType;
    }
    public void setSplitType(SplitType splitType) {
        this.splitType = splitType;
    }
    public List<Transaction> getTransactions() {
        return transactions;
    }
    public void setTransactions(List<Transaction> transactions) {
        this.transactions = transactions;
    }
    public Set<User> getUsers() {
        return users;
    }
    public void setUsers(Set<User> users) {
        this.users = users;
    }
    public User getPayer() {
        return payer;
    }
    public void setPayer(User payer) {
        this.payer = payer;
    }
    public List<ExpenseShare> getSplitShares() {
        return splitShares;
    }
    public void setSplitShares(List<ExpenseShare> splitShares) {
        this.splitShares = splitShares;
    }
    




}
