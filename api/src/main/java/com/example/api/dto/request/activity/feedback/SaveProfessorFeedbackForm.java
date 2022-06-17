package com.example.api.dto.request.activity.feedback;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

@Data
public class SaveProfessorFeedbackForm {
    @Schema(required = true) private String professorEmail;
    @Schema(required = true) private String content;
    @Schema(required = true) private double points;
    @Schema(required = true) private Long fileTaskResultId;
}
