package com.example.api.dto.response.activity.task;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class SurveyInfoResponse {
    private String name;
    private String description;
    private Integer experience;
}
