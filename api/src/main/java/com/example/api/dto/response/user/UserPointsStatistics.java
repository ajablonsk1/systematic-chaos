package com.example.api.dto.response.user;

import com.example.api.dto.response.map.task.ActivityType;
import com.example.api.model.activity.result.FileTaskResult;
import com.example.api.model.activity.result.GraphTaskResult;
import com.example.api.model.activity.result.SurveyResult;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UserPointsStatistics {
    private Long dateInMillis;
    private Double pointsReceived;
    private ActivityType activityType;
    private String activityName;

    public UserPointsStatistics(GraphTaskResult result) {
        this.dateInMillis = result.getSendDateMillis();
        this.pointsReceived = result.getPointsReceived();
        this.activityType = ActivityType.EXPEDITION;
        this.activityName = result.getGraphTask().getTitle();
    }

    public UserPointsStatistics(FileTaskResult result) {
        this.dateInMillis = result.getSendDateMillis();
        this.pointsReceived = result.getPointsReceived();
        this.activityType = ActivityType.TASK;
        this.activityName = result.getFileTask().getTitle();
    }

    public UserPointsStatistics(SurveyResult result) {
        this.dateInMillis = result.getSendDateMillis();
        this.pointsReceived = result.getPointsReceived();
        this.activityType = ActivityType.SURVEY;
        this.activityName = result.getSurvey().getTitle();
    }
}
