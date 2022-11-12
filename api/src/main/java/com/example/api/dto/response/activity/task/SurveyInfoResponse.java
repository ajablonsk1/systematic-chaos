package com.example.api.dto.response.activity.task;

import com.example.api.dto.response.activity.result.SurveyResultInfoResponse;
import com.example.api.model.activity.task.Survey;
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class SurveyInfoResponse {
    private String name;
    private String description;
    private Double experience;
    private SurveyResultInfoResponse feedback;

    public SurveyInfoResponse(Survey survey) {
        this.name = survey.getTitle();
        this.description = survey.getDescription();
        this.experience = survey.getMaxPoints();
    }
}
