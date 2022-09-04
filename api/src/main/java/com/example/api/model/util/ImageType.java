package com.example.api.model.util;

public enum ImageType {
    CHAPTER("CHAPTER");

    private final String type;

    ImageType(String type) {
        this.type = type;
    }

    public String getType() {
        return type;
    }
}
