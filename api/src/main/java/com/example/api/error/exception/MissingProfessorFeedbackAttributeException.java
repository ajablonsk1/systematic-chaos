package com.example.api.error.exception;

public class MissingProfessorFeedbackAttributeException extends Exception{
    private String missingAttribute;
    public MissingProfessorFeedbackAttributeException(String message, String missingAttribute) {
        super(message);
        this.missingAttribute = missingAttribute;
    }

    @Override
    public String getLocalizedMessage() {
        return "ProfessorFeedback is missing " + this.missingAttribute + " attribute";
    }
}
