package com.example.api.dto.response.activity.task.result.summary;

import lombok.Data;

import java.util.List;

@Data
public class AverageActivityScore {
    private String chapterName;
    private List<ActivityScore> activitiesScore;
}
