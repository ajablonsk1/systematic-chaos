package com.example.api.dto.response.task;

import com.example.api.dto.response.map.task.ActivityType;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ActivityToEvaluateResponse {
    private Long activityId;
    private Long toGrade;
}
