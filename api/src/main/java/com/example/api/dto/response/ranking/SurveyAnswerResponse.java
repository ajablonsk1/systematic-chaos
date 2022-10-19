package com.example.api.dto.response.ranking;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import javax.persistence.Lob;

@Data
public class SurveyAnswerResponse {
    @Schema(required = true) @Lob private String answer;
    @Schema(required = true) private Integer studentPoints;
}
