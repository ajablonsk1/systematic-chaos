package com.example.api.model.user;

public enum Role {
    STUDENT("student"),
    PROFESSOR("professor"),
    ADMIN("admin");

    private final String name;

    Role(String name){
        this.name = name;
    }

    public String getName(){
        return name;
    }
}
