package com.example.api.dto.response.activity.task.result.summary.util;

import com.example.api.dto.response.activity.task.result.summary.AverageGradeForChapter;
import com.example.api.model.group.Group;
import com.example.api.util.csv.PointsToGradeMapper;

import java.util.LinkedList;
import java.util.List;
import java.util.OptionalDouble;


public class AverageGradeForChapterCreator {
    private String groupName;
    private List<Double> grades;

    public AverageGradeForChapterCreator(Group group) {
        this.groupName = group.getName();
        this.grades = new LinkedList<>();
    }

    public void add(Double grade) {
        grades.add(grade);
    }

    public AverageGradeForChapter create() {
        Double avgGrade = PointsToGradeMapper.roundGrade(getAvg());
        Double medianGrade = PointsToGradeMapper.roundGrade(getMedian());
        return new AverageGradeForChapter(groupName, avgGrade, medianGrade);
    }

    private Double getAvg() {
        OptionalDouble avg = grades
                .stream()
                .mapToDouble(d -> d)
                .average();
        if (avg.isEmpty()) return null;
        return avg.getAsDouble();
    }

    private Double getMedian() {
        if (grades.isEmpty()) return null;
        boolean isEven = grades.size() % 2 == 0;
        int medianIndex = grades.size() / 2;

        if (isEven) {
            return (grades.get(medianIndex - 1) + grades.get(medianIndex)) / 2.0;
        }
        return grades.get(medianIndex);
    }
}
