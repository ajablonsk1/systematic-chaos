package com.example.api.dto.request.activity.feedback;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SaveProfessorFeedbackForm {
    @Schema(required = true) private Long fileTaskResultId;
    @Schema(required = false) private String content;
    @Schema(required = false) private Double points;
}
