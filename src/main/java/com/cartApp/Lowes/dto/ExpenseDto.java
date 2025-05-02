package com.cartApp.Lowes.dto;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

import com.cartApp.Lowes.model.SplitType;




public class ExpenseDto {
    private Long id;
    private String name;
    private double amount;
    private String description;
    private Long groupId;        // Optional: null for individual expense
    private List<Long> userIds;  // IDs of users involved
    private Long payerId;        // ID of the user who paid
    private SplitType splitType; // Strategy for splitting the expense
    private Map<Long, Double> customShares; // Map of userId -> share amount or percentage
    private LocalDateTime expenseDate;
    private String currency;

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
    public Long getGroupId() {
        return groupId;
    }
    public void setGroupId(Long groupId) {
        this.groupId = groupId;
    }
    public List<Long> getUserIds() {
        return userIds;
    }
    public void setUserIds(List<Long> userIds) {
        this.userIds = userIds;
    }
    public Long getPayerId() {
        return payerId;
    }
    public void setPayerId(Long payerId) {
        this.payerId = payerId;
    }
    public SplitType getSplitType() {
        return splitType;
    }
    public void setSplitType(SplitType splitType) {
        this.splitType = splitType;
    }
    public Map<Long, Double> getCustomShares() {
        return customShares;
    }
    public void setCustomShares(Map<Long, Double> customShares) {
        this.customShares = customShares;
    }
    public LocalDateTime getExpenseDate() {
        return expenseDate;
    }
    public void setExpenseDate(LocalDateTime expenseDate) {
        this.expenseDate = expenseDate;
    }
    public String getCurrency() {
        return currency;
    }
    public void setCurrency(String currency) {
        this.currency = currency;
    }
    
    
}

