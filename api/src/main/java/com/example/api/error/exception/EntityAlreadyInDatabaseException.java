package com.example.api.error.exception;

import org.springframework.http.HttpStatus;

public class EntityAlreadyInDatabaseException extends Exception{

    public EntityAlreadyInDatabaseException(String message) {
        super(message);
    }
}
