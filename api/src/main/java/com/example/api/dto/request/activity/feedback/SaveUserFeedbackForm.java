package com.example.api.dto.request.activity.feedback;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SaveUserFeedbackForm {
    @Schema(required = true) private String studentEmail;
    @Schema(required = false) private String content;
    @Schema(required = false) private Integer rate;
    @Schema(required = false) private Long surveyId;
}
