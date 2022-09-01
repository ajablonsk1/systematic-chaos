package com.example.api.error.exception;

public class EntityNotFoundException extends RequestValidationException {

    public EntityNotFoundException(String message) {
        super(message);
    }
}
