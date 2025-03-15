package com.cartApp.Lowes.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
public class AddUser {

    @RequestMapping("/allUsers")
    public List<Map<String, Object>> allUsers() {
        Map<String, Object> user1 = new HashMap<>();
        user1.put("id", 1);
        user1.put("name", "John Doe");

        Map<String, Object> user2 = new HashMap<>();
        user2.put("id", 2);
        user2.put("name", "Jane Smith");

        return Arrays.asList(user1, user2);
    }       
}

