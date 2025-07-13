package com.cartApp.Lowes.model;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

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

    @OneToMany(mappedBy="expense" ,cascade = CascadeType.PERSIST, fetch = FetchType.LAZY)
    private List<Transaction>transactions = new ArrayList<>();
    
    @Enumerated(EnumType.STRING)
    private SplitType splitType;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "payer_id", nullable = false)
    @JsonManagedReference
    private User payer;

    @OneToMany(mappedBy = "expense", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<ExpenseShare> splitShares = new ArrayList<>();

    @ManyToMany
    @JoinTable(
            name = "user_expense",
            joinColumns = @JoinColumn(name = "expense_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id")
    )
    private Set<User> participants;


    //note to self : the use of @JsonManagedReference And @JsonBackReference  tells Jackson to serialize the forward reference (@JsonManagedReference) but ignore the back reference (@JsonBackReference) during serialization, thus breaking the infinite loop


    
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
