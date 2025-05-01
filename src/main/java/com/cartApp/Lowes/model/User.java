package com.cartApp.Lowes.model;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "Users")
public class User implements Serializable{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String name;
    private String email;
    @ManyToMany 
    @JoinTable(name = "user_group",
                       joinColumns = @JoinColumn(name="user_id"),
                       inverseJoinColumns = @JoinColumn(name="group_id"))
    private Set<Group>groupUser = new HashSet<>();
    
    
    @ManyToMany(mappedBy = "users")
    @JsonBackReference
    private Set<Expense> expenses = new HashSet<>();


    public long getId() {
        return id;
    }
    public void setId(long id) {
        this.id = id;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public Set<Group> getGroups() {
        return groupUser;
    }
    public void setGroups(Set<Group> groupUser) {
        this.groupUser = groupUser;
    }

    public Set<Group> getGroupUser() {
        return groupUser;
    }
    public void setGroupUser(Set<Group> groupUser) {
        this.groupUser = groupUser;
    }
    public Set<Expense> getExpenses() {
        return expenses;
    }
    public void setExpenses(Set<Expense> expenses) {
        this.expenses = expenses;
    }
    public User(){

    }


    

}
