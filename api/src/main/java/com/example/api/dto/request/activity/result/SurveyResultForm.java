package com.example.api.dto.request.activity.result;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SurveyResultForm {
    @Schema(required = true) private Long surveyId;
    @Schema(required = true) private Integer rate;
    @Schema(required = false) private String feedback;
}
