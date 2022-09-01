package com.example.api.error.exception;

public class EntityAlreadyInDatabaseException extends RequestValidationException {

    public EntityAlreadyInDatabaseException(String message) {
        super(message);
    }
}
