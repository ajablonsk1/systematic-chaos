package com.example.api.dto.response.activity.result;

import com.example.api.model.activity.result.SurveyResult;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Data
@AllArgsConstructor
@Setter
public class SurveyResultInfoResponse {
    private Long surveyResultId;
    private Long surveyId;
    private String from;
    private String feedback;
    private Integer rate;

    public SurveyResultInfoResponse(SurveyResult surveyResult) {
        this.surveyResultId = surveyResult.getId();
        this.surveyId = surveyResult.getSurvey().getId();
        this.from = surveyResult.getUser().getEmail();
        this.feedback = surveyResult.getFeedback();
        this.rate = surveyResult.getRate();
    }
}
