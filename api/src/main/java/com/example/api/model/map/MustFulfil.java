package com.example.api.model.map;

public enum MustFulfil {
    NONE("NONE"),
    ANY("ANY"),
    ALL("ALL");

    private final String mustFulfil;

    MustFulfil(String mustFulfil){
        this.mustFulfil = mustFulfil;
    }

    public String getMustFulfil() {
        return mustFulfil;
    }
}
