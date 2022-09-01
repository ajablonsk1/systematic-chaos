package com.example.api.error.exception;

public class MissingAttributeException extends RequestValidationException{
    public MissingAttributeException(String message) {
        super(message);
    }
}
