package com.example.api.error.exception;

public class BadRequestHeadersException extends RequestValidationException{

    public BadRequestHeadersException(String message) {
        super(message);
    }
}
