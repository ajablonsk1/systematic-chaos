package com.example.api.model.map.requirement;

public enum RequirementType {
    DATE("date"),
    NUMBER("number"),
    BOOLEAN("boolean"),
    TEXT("text"),
    MULTI_SELECT("multi_select"),
    SELECT("select");

    private final String type;

    RequirementType(String type) {
        this.type = type;
    }

    public String getType() {
        return type;
    }

    @Override
    public String toString() {
        return type;
    }
}
