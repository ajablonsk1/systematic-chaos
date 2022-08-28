package com.example.api.dto.response.activity.task.result.summary;

import lombok.Data;

import java.util.List;

@Data
public class ActivityScore {
    private String activityName;
    private List<Score> scores;
}
