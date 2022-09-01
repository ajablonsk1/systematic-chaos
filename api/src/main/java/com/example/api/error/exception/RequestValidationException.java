package com.example.api.error.exception;

public class RequestValidationException extends Exception{

    public RequestValidationException(String message) {
        super(message);
    }
}
