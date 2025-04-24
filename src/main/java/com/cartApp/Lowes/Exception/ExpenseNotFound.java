package com.cartApp.Lowes.Exception;

public class ExpenseNotFound extends RuntimeException {

    public ExpenseNotFound(String str){
        super(str);
    }
}
