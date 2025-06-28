package com.cartApp.Lowes.dto;

public class AddFriendRequestDto {
     private Long receiverId;
     private String email;
     private Long phoneNumber;

     public Long getReceiverId() {
          return receiverId;
     }

     public void setReceiverId(Long receiverId) {
          this.receiverId = receiverId;
     }

     public String getEmail() {
          return email;
     }

     public void setEmail(String email) {
          this.email = email;
     }

     public Long getPhoneNumber() {
          return phoneNumber;
     }

     public void setPhoneNumber(Long phoneNumber) {
          this.phoneNumber = phoneNumber;
     }

     // Getters/setters
}
