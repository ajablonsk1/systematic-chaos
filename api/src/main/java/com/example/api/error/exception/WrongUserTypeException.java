package com.example.api.error.exception;

import com.example.api.model.user.AccountType;

public class WrongUserTypeException extends RequestValidationException{
    private final AccountType accountType;

    public WrongUserTypeException(String message, AccountType accountType){
        super(message);
        this.accountType = accountType;
    }

    @Override
    public String getLocalizedMessage() {
        return "Wrong account type! For this email account type should be: " + accountType;
    }
}
