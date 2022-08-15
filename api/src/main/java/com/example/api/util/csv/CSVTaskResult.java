package com.example.api.util.csv;

import com.example.api.dto.response.map.task.ActivityType;
import com.example.api.model.activity.feedback.ProfessorFeedback;
import com.example.api.model.activity.result.FileTaskResult;
import com.example.api.model.activity.result.GraphTaskResult;
import com.example.api.model.activity.result.SurveyResult;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class CSVTaskResult {
    private Double points;
    private String info;

    public CSVTaskResult(GraphTaskResult result) {
        this.points = result.getPointsReceived();
        this.info = "-";
    }

    public CSVTaskResult(FileTaskResult result, String content) {
        this.points = result.getPointsReceived();
        this.info = content;
    }

    public CSVTaskResult(SurveyResult result) {
        this.points = result.getPointsReceived();
        this.info = "-";
    }

    public List<String> toStringList() {
        return List.of(points.toString(), info);
    }
}
