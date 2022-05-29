package com.example.api.model.map;

public enum MustFulfil {
    NONE("none"),
    ANY("any"),
    ALL("all");

    private final String mustFulfil;

    MustFulfil(String mustFulfil){
        this.mustFulfil = mustFulfil;
    }

    public String getMustFulfil() {
        return mustFulfil;
    }
}
