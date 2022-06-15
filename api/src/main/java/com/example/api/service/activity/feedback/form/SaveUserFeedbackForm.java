package com.example.api.service.activity.feedback.form;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

@Data
public class SaveUserFeedbackForm {
    @Schema(required = true) private String studentEmail;
    @Schema(required = true) private String content;
    @Schema(required = true) private Integer rate;
}