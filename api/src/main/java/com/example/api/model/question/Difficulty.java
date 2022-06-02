package com.example.api.model.question;

public enum Difficulty {
    EASY("EASY"),
    MEDIUM("MEDIUM"),
    HARD("HARD");

    private final String difficulty;

    Difficulty(String difficulty){
        this.difficulty = difficulty;
    }

    public String getDifficulty(){
        return difficulty;
    }
}
