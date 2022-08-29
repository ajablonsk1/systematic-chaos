package com.example.api.dto.response.activity.task.result.summary;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AverageGradeForChapter {
    private String groupName;
    private Double grade;
}
