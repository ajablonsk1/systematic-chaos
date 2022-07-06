package com.example.api.dto.response.task;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ActivityToEvaluateResponse {
    private Long activityId;
    private Long toGrade;
}
