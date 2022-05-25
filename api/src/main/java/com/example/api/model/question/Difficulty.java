package com.example.api.model.question;

public enum Difficulty {
    EASY("easy"),
    MEDIUM("medium"),
    HARD("hard");

    private final String difficulty;

    Difficulty(String difficulty){
        this.difficulty = difficulty;
    }

    public String getDifficulty(){
        return difficulty;
    }
}
