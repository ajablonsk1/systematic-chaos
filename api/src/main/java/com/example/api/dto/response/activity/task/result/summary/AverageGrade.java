package com.example.api.dto.response.activity.task.result.summary;

import lombok.Data;

import java.util.List;

@Data
public class AverageGrade {
    private String chapterName;
    private List<AverageGradeForChapter> avgGradesForChapter;
}
