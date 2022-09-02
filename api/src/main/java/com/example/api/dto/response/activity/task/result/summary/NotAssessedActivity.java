package com.example.api.dto.response.activity.task.result.summary;

import com.example.api.model.activity.result.TaskResult;
import com.example.api.model.activity.task.Activity;
import lombok.Data;

@Data
public class NotAssessedActivity {
    private String activityName;
    private String activityType;
    private Integer waitingAnswersNumber;

    public NotAssessedActivity(Activity activity) {
        this.activityName = activity.getTitle();
        this.activityType = activity.getActivityType().getActivityType();
        this.waitingAnswersNumber = 0;
    }

    public void add(TaskResult taskResult) {
        if (taskResult.isEvaluated()) {
            waitingAnswersNumber += 1;
        }
    }
}
