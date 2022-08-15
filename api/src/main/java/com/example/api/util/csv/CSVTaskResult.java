package com.example.api.util.csv;

import com.example.api.dto.response.map.task.ActivityType;
import com.example.api.model.activity.feedback.Feedback;
import com.example.api.model.activity.feedback.ProfessorFeedback;
import com.example.api.model.activity.result.FileTaskResult;
import com.example.api.model.activity.result.GraphTaskResult;
import com.example.api.model.activity.result.SurveyResult;
import com.example.api.model.activity.result.TaskResult;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class CSVTaskResult {
    private Double points;
    private String info;

    public CSVTaskResult(TaskResult result) {
        if (result == null) {
            this.points = null;
            this.info = null;
        } else {
            this.points = result.getPointsReceived();
            this.info = "-";
        }
    }

    public CSVTaskResult(FileTaskResult result, Feedback feedback) {
        if (feedback == null) {
            this.points = null;
            this.info = null;
        } else {
            this.points = result.getPointsReceived();
            this.info = feedback.getContent();
        }
    }

    public List<String> toStringList() {
        return List.of(points.toString(), info);
    }
}
