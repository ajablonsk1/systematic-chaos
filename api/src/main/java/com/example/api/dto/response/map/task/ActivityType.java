package com.example.api.dto.response.map.task;

import com.example.api.model.activity.result.AdditionalPoints;
import com.example.api.model.activity.task.*;

public enum ActivityType {
    EXPEDITION("EXPEDITION"),
    TASK("TASK"),
    INFO("INFORMATION"),
    SURVEY("SURVEY"),
    ADDITIONAL("ADDITIONAL");

    private final String activityType;

    ActivityType(String activityType){
        this.activityType = activityType;
    }

    public String getActivityType() {
        return activityType;
    }

    public static ActivityType getActivityType(Activity activity) {
        if (GraphTask.class.equals(activity.getClass())) {
            return EXPEDITION;
        } else if (FileTask.class.equals(activity.getClass())) {
            return TASK;
        } else if (Survey.class.equals(activity.getClass())) {
            return SURVEY;
        } else if (Info.class.equals(activity.getClass())) {
            return INFO;
        } else {
            return null;
        }
    }
}
