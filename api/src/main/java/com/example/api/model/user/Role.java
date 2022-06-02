package com.example.api.model.user;

public enum Role {
    STUDENT("STUDENT"),
    PROFESSOR("PROFESSOR"),
    ADMIN("ADMIN");

    private final String name;

    Role(String name){
        this.name = name;
    }

    public String getName(){
        return name;
    }
}
