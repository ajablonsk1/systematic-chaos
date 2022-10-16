package com.example.api.dto.response.activity.feedback;

import com.example.api.model.activity.feedback.UserFeedback;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Data
@AllArgsConstructor
@Setter
public class UserFeedbackInfoResponse {
    private Long feedbackId;
    private Long surveyId;
    private String from;
    private String feedback;
    private Integer rate;

    public UserFeedbackInfoResponse(UserFeedback feedback) {
        this.feedbackId = feedback.getId();
        this.surveyId = feedback.getSurvey().getId();
        this.from = feedback.getFrom().getEmail();
        this.feedback = feedback.getContent();
        this.rate = feedback.getRate();
    }
}
