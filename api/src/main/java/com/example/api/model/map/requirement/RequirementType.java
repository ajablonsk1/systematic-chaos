package com.example.api.model.map.requirement;

public enum RequirementType {
    DATE_FROM(1),
    DATE_TO(2),
    MIN_POINTS(3),
    GROUPS(4),
    STUDENTS(5),
    GRAPH_TASKS(6),
    FILE_TASKS(7);

    private final int type;

    RequirementType(int type) {
        this.type = type;
    }

    public int getType() {
        return type;
    }

    @Override
    public String toString() {
        return String.valueOf(type);
    }
}
