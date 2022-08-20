package com.example.api.dto.response.activity.task.result;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AdditionalPointsResponse implements PointsResponse {
    private Long dateMillis;
    private String professor;
    private Double points;
    private String description;
}
