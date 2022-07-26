package com.example.api.util.csv;

import com.example.api.dto.response.map.task.ActivityType;
import com.example.api.model.activity.result.FileTaskResult;
import com.example.api.model.activity.result.GraphTaskResult;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class CSVTaskResult {
    private String name;
    private ActivityType type;
    private Double grade;
    private Double points;

    public CSVTaskResult(GraphTaskResult result) {
        PointsToGradeMapper mapper = new PointsToGradeMapper();
        this.name = result.getGraphTask().getName();
        this.type = ActivityType.EXPEDITION;
        this.points = result.getPointsReceived();
        this.grade = mapper.getGrade(points, result.getGraphTask().getMaxPoints());
    }

    public CSVTaskResult(FileTaskResult result) {
        PointsToGradeMapper mapper = new PointsToGradeMapper();
        this.name = result.getFileTask().getName();
        this.type = ActivityType.EXPEDITION;
        this.points = result.getPointsReceived();
        this.grade = mapper.getGrade(points, result.getFileTask().getMaxPoints());
    }

    public List<String> toStringList() {
        return List.of(name, type.getActivityType(), grade.toString(), points.toString());
    }
}
