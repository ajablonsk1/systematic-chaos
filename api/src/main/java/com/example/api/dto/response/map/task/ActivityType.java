package com.example.api.dto.response.map.task;

public enum ActivityType {
    EXPEDITION("EXPEDITION"),
    TASK("TASK"),
    INFO("INFORMATION");

    private final String activityType;

    ActivityType(String activityType){
        this.activityType = activityType;
    }

    public String getMustFulfil() {
        return activityType;
    }
}
