package com.cartApp.Lowes.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cartApp.Lowes.dto.ExpenseDto;
import com.cartApp.Lowes.model.Expense;
import com.cartApp.Lowes.model.Group;
import com.cartApp.Lowes.repo.GroupRepo;
import com.cartApp.Lowes.service.ExpenseServiceImpl;

@RestController
@RequestMapping("/expenses")
public class ExpenseController {

    @Autowired
    GroupRepo groupRepo;

    @Autowired
    ExpenseServiceImpl expenseService;

    @PostMapping("/addExpense")
    public ResponseEntity<Expense>createExpense(@RequestBody ExpenseDto expenseDto){
        Expense expense = new Expense();

        expense.setName(expenseDto.getName());
        expense.setAmount(expenseDto.getAmount());
        expense.setDescription(expenseDto.getDescription());

        if(expenseDto.getGroupId()!= null){
            Group group = groupRepo.findById(expenseDto.getGroupId()).orElseThrow(()->new GroupNotFoundException("group not found"));
            expense.setGroup(group);
        }
        Expense createdExpense = expenseService.createExpense(expense, expenseDto.getUserIds(), expenseDto.getPayerId(), expenseDto.getSplitType());
        return ResponseEntity.status(HttpStatus.CREATED).body(createdExpense);

    }

}
