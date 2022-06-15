package com.example.api.service.activity.feedback.form;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

@Data
public class SaveProfessorFeedbackForm {
    @Schema(required = true) private String professorEmail;
    @Schema(required = true) private String studentEmail;
    @Schema(required = true) private String content;
    @Schema(required = true) private double points;
    @Schema(required = false) private Long graphTaskResultId;
    @Schema(required = false) private Long fileTaskResultId;
}
