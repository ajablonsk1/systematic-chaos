package com.example.api.error.exception;

public class EntityRequiredAttributeNullException extends RequestValidationException{

    public EntityRequiredAttributeNullException(String message) {
        super(message);
    }
}
