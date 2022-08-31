package com.example.api.dto.response.activity.task.result;

import com.example.api.dto.response.map.task.ActivityType;
import com.example.api.model.activity.result.FileTaskResult;
import com.example.api.model.activity.result.GraphTaskResult;
import com.example.api.model.activity.result.SurveyResult;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class TaskPointsStatisticsResponse extends PointsResponse {

    public TaskPointsStatisticsResponse(GraphTaskResult result) {
        super();
        setDateAndPoints(result.getSendDateMillis(), result.getPointsReceived());
        this.activityType = ActivityType.EXPEDITION;
        this.activityName = result.getGraphTask().getTitle();
    }

    public TaskPointsStatisticsResponse(FileTaskResult result) {
        super();
        setDateAndPoints(result.getSendDateMillis(), result.getPointsReceived());
        this.activityType = ActivityType.TASK;
        this.activityName = result.getFileTask().getTitle();
    }

    public TaskPointsStatisticsResponse(SurveyResult result) {
        super();
        setDateAndPoints(result.getSendDateMillis(), result.getPointsReceived());
        this.activityType = ActivityType.SURVEY;
        this.activityName = result.getSurvey().getTitle();
    }

    private void setDateAndPoints(Long dateMillis, Double pointsReceived) {
        this.dateMillis = dateMillis;
        this.pointsReceived = pointsReceived;
    }
}
