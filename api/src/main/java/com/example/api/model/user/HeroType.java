package com.example.api.model.user;

public enum HeroType {
    WARRIOR("WARRIOR"),
    WIZARD("WIZARD"),
    PRIEST("PRIEST"),
    ROUGE("ROUGE");

    private final String type;

    HeroType(String type) {
        this.type = type;
    }

    public String getType() {
        return type;
    }
}
