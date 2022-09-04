package com.example.api.dto.response.activity.task.result.summary;

import com.example.api.model.map.Chapter;
import lombok.Data;

import java.util.List;

@Data
public class AverageGrade {
    private String chapterName;
    private List<AverageGradeForChapter> avgGradesForChapter;

    public AverageGrade(Chapter chapter) {
        this.chapterName = chapter.getName();
    }
}
