package com.example.api.dto.response.activity.task.result;

import com.example.api.dto.response.map.task.ActivityType;
import com.example.api.model.activity.result.FileTaskResult;
import com.example.api.model.activity.result.GraphTaskResult;
import com.example.api.model.activity.result.SurveyResult;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class TaskPointsStatisticsResponse {
    private Long dateMillis;
    private Double pointsReceived;
    private ActivityType activityType;
    private String activityName;

    public TaskPointsStatisticsResponse(GraphTaskResult result) {
        setDateAndPoints(result.getSendDateMillis(), result.getPointsReceived());
        this.activityType = ActivityType.EXPEDITION;
        this.activityName = result.getGraphTask().getName();
    }

    public TaskPointsStatisticsResponse(FileTaskResult result) {
        setDateAndPoints(result.getSendDateMillis(), result.getPointsReceived());
        this.activityType = ActivityType.TASK;
        this.activityName = result.getFileTask().getName();
    }

    public TaskPointsStatisticsResponse(SurveyResult result) {
        setDateAndPoints(result.getSendDateMillis(), result.getPointsReceived());
        this.activityType = ActivityType.SURVEY;
        this.activityName = result.getSurvey().getName();
    }

    private void setDateAndPoints(Long dateMillis, Double pointsReceived) {
        this.dateMillis = dateMillis;
        this.pointsReceived = pointsReceived;
    }
}
