package com.example.api.util.csv;

import com.example.api.model.activity.result.FileTaskResult;
import com.example.api.model.activity.result.GraphTaskResult;
import com.example.api.model.activity.result.SurveyResult;
import com.example.api.model.activity.result.TaskResult;
import org.springframework.stereotype.Component;

@Component
public class PointsToGradeMapper {

    public Double getGrade(double receivedPoints, double maxPoints) {
        double gradeFraction = receivedPoints / maxPoints;
        if (gradeFraction < 0 || gradeFraction > 1) {
            return null;
        }
        if (gradeFraction < 0.5) {
            return 2.0;
        } else if (gradeFraction < 0.6){
            return 3.0;
        } else if (gradeFraction < 0.7) {
            return 3.5;
        } else if (gradeFraction < 0.8) {
            return 4.0;
        } else if (gradeFraction < 0.9) {
            return 4.5;
        } else {
            return 5.0;
        }
    }

    public Double getGrade(TaskResult taskResult) {
        return getGrade(taskResult.getPointsReceived(), getMaxPoints(taskResult));
    }

    public Double getMaxPoints(TaskResult taskResult) {
        if (taskResult instanceof GraphTaskResult) {
            return ((GraphTaskResult) taskResult).getGraphTask().getMaxPoints();
        }
        else if (taskResult instanceof FileTaskResult) {
            return ((FileTaskResult) taskResult).getFileTask().getMaxPoints();
        }
        else if (taskResult instanceof SurveyResult) {
            return ((SurveyResult) taskResult).getSurvey().getPoints();
        }
        return null;
    }
}
