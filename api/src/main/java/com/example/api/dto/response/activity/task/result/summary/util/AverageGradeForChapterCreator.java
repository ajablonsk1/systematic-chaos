package com.example.api.dto.response.activity.task.result.summary.util;

import com.example.api.dto.response.activity.task.result.summary.AverageGradeForChapter;
import com.example.api.model.group.Group;

public class AverageGradeForChapterCreator {
    private String groupName;
    private Double sumOfGrades;
    private Integer numberOfGrades;

    public AverageGradeForChapterCreator(Group group) {
        this.groupName = group.getName();
        this.sumOfGrades = 0.0;
        this.numberOfGrades = 0;
    }

    public void add(Double grade) {
        this.numberOfGrades += 1;
        this.sumOfGrades += grade;
    }

    public AverageGradeForChapter create() {
        Double avgGrades = null;
        if (numberOfGrades > 0) avgGrades = sumOfGrades / numberOfGrades;
        return new AverageGradeForChapter(groupName, avgGrades);
    }
}
