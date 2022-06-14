package com.example.api.error.exception;

import java.util.List;

public class WrongBodyParametersNumberException extends Exception{
    private final List<String> bodyFields;
    private final int version;
    private final String MESSAGE_ALL = "Request body should contain: ";
    private final String MESSAGE_ONE = "Request body should contain ONLY ONE of: ";

    public WrongBodyParametersNumberException(String message, List<String> bodyFields, int version) {
        super(message);
        this.bodyFields = bodyFields;
        this.version = version;
    }

    @Override
    public String getLocalizedMessage() {
        String localizedMessage;
        switch (version) {
            case 1 -> localizedMessage = MESSAGE_ALL + String.join(", ", bodyFields);
            case 2 -> localizedMessage = MESSAGE_ONE + String.join(", ", bodyFields);
            default -> localizedMessage = "";
        }
        return localizedMessage;
    }
}
