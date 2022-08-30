package com.example.api.dto.response.activity.task.result.summary;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@AllArgsConstructor
@Getter
@Setter
public class AverageGradeForChapter {
    private String groupName;
    private Double avgGrade;
}
