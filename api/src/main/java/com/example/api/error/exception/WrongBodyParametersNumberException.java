package com.example.api.error.exception;

import java.util.List;

public class WrongBodyParametersNumberException extends Exception{
    private final List<String> bodyFields;
    private final String MESSAGE = "Request body for should consist of: ";

    public WrongBodyParametersNumberException(String message, List<String> bodyFields) {
        super(message);
        this.bodyFields = bodyFields;
    }

    @Override
    public String getLocalizedMessage() {
        return MESSAGE + String.join(", ", bodyFields);
    }
}
