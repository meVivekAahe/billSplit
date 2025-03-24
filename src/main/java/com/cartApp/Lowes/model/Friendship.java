package com.cartApp.Lowes.model;

import java.io.Serializable;
import java.time.LocalDateTime;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "friendships")
public class Friendship implements Serializable{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(cascade = CascadeType.PERSIST, fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(cascade = CascadeType.PERSIST, fetch =  FetchType.LAZY)
    @JoinColumn(name = "friend_id")
    private User friend;
    
    @Enumerated(EnumType.STRING)
    private FriendshipStatus status;

    private LocalDateTime requestDate;
    private LocalDateTime approvalDate;

    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public User getUser() {
        return user;
    }
    public void setUser(User user) {
        this.user = user;
    }
    public User getFriend() {
        return friend;
    }
    public void setFriend(User friend) {
        this.friend = friend;
    }
    public FriendshipStatus getStatus() {
        return status;
    }
    public void setStatus(FriendshipStatus status) {
        this.status = status;
    }
    public LocalDateTime getRequestDate() {
        return requestDate;
    }
    public void setRequestDate(LocalDateTime requestDate) {
        this.requestDate = requestDate;
    }
    public LocalDateTime getApprovalDate() {
        return approvalDate;
    }
    public void setApprovalDate(LocalDateTime approvalDate) {
        this.approvalDate = approvalDate;
    }

    

}
