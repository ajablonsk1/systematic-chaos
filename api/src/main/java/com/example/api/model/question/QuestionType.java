package com.example.api.model.question;

public enum QuestionType {
    OPENED("opened"),
    SINGLE_CHOICE("single choice"),
    MULTIPLE_CHOICE("multiple choice");

    private final String type;

    QuestionType(String type) {
        this.type = type;
    }

    public String getType(){
        return type;
    }
}
