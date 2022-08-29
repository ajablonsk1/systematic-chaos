package com.example.api.dto.response.activity.task.result.summary;

import com.example.api.dto.response.map.task.ActivityType;
import com.example.api.model.activity.result.FileTaskResult;
import com.example.api.model.activity.result.GraphTaskResult;
import com.example.api.model.activity.result.SurveyResult;
import com.example.api.model.activity.result.TaskResult;
import com.example.api.model.activity.task.Activity;
import com.example.api.model.activity.task.GraphTask;
import lombok.Data;

@Data
public class NotAssessedActivity {
    private String activityName;
    private String activityType;
    private Integer waitingAnswersNumber;

    public NotAssessedActivity(Activity activity) {
        this.activityName = activity.getName();
        this.activityType = ActivityType.getActivityType(activity).getActivityType();
    }

    public void add(GraphTaskResult graphTaskResult) {
        if (graphTaskResult.getPointsReceived() != null) {
            waitingAnswersNumber += 1;
        }
    }

    public void add(FileTaskResult fileTaskResult) {
        if (!fileTaskResult.isEvaluated()) {
            waitingAnswersNumber += 1;
        }
    }

    public void add(SurveyResult surveyResult) {
        if (surveyResult.getPointsReceived() != null) {
            waitingAnswersNumber += 1;
        }
    }
}
