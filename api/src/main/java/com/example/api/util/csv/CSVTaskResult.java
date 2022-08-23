package com.example.api.util.csv;

import com.example.api.model.activity.feedback.Feedback;
import com.example.api.model.activity.result.FileTaskResult;
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
        this.info = "-";
        this.points = result == null ? null : result.getPointsReceived();
    }

    public CSVTaskResult(FileTaskResult result, Feedback feedback) {
        if (feedback == null) {
            this.points = null;
            this.info = "-";
        } else {
            this.points = result.getPointsReceived();
            this.info = feedback.getContent();
        }
    }

    public List<String> toStringList() {
        return points == null ? List.of("-", info) : List.of(points.toString(), info);
    }
}
