package com.example.api.error.exception;

import com.example.api.model.question.QuestionType;

public class WrongAnswerTypeException extends RequestValidationException{
    private final QuestionType expectedType;
    private final String OPENED_MESSAGE = "Opened answer must have be provided with field (string) 'openAnswer'. " +
            "Please check your answer object.";
    private final String SINGLE_CHOICE_MESSAGE = "Single choice answer must have be provided with field (object) 'option'. " +
            "Please check your answer object.";
    private final String MULTIPLE_CHOICE_MESSAGE = "Multiple choice answer must have be provided with field (list of objects) " +
            "'options'. Please check your answer object.";

    public WrongAnswerTypeException(String message, QuestionType expectedType){
        super(message);
        this.expectedType = expectedType;
    }

    @Override
    public String getLocalizedMessage() {
        return switch (expectedType){
            case OPENED -> OPENED_MESSAGE;
            case SINGLE_CHOICE -> SINGLE_CHOICE_MESSAGE;
            case MULTIPLE_CHOICE -> MULTIPLE_CHOICE_MESSAGE;
        };
    }
}
