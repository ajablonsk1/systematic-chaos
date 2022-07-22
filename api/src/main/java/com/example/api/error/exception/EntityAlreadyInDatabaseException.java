package com.example.api.error.exception;

public class EntityAlreadyInDatabaseException extends Exception{

    public EntityAlreadyInDatabaseException(String message) {
        super(message);
    }
}
