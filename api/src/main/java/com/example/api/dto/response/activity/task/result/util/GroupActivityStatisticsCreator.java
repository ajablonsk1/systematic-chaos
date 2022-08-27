package com.example.api.dto.response.activity.task.result.util;

import com.example.api.dto.response.activity.task.result.GroupActivityStatistics;
import com.example.api.model.activity.result.SurveyResult;
import com.example.api.model.activity.result.TaskResult;
import com.example.api.model.activity.task.Survey;
import com.example.api.model.activity.task.Task;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class GroupActivityStatisticsCreator {
    private String groupName;
    private Integer answersNumber = 0;
    private Double sumPoints;
    private Double maxPointsForTask;


    public GroupActivityStatisticsCreator(Task task, TaskResult taskResult) {
        this.groupName = taskResult.getUser().getGroup().getName();
        this.answersNumber = 1;
        this.sumPoints = taskResult.getPointsReceived();
        this.maxPointsForTask = task.getMaxPoints();
    }

    public GroupActivityStatisticsCreator(Survey survey, SurveyResult surveyResult) {
        this.groupName = surveyResult.getUser().getGroup().getName();
        this.answersNumber = 1;
        this.sumPoints = surveyResult.getPointsReceived();
    }

    public void add(TaskResult taskResult) {
        this.answersNumber += 1;
        this.sumPoints += taskResult.getPointsReceived();
    }

    public void add(SurveyResult surveyResult) {
        this.answersNumber += 1;
        this.sumPoints += surveyResult.getPointsReceived();
    }

    public GroupActivityStatistics create() {
        GroupActivityStatistics result = new GroupActivityStatistics();
        result.setGroupName(groupName);
        if (answersNumber > 0) {
            result.setAvgPoints(sumPoints / answersNumber);
        }
        if (maxPointsForTask != null && maxPointsForTask > 0) {
            result.setAvgPercentageResult(100 * sumPoints / (maxPointsForTask));
        }
        return result;
    }
}
