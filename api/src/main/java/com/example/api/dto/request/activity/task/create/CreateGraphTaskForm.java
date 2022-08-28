package com.example.api.dto.request.activity.task.create;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CreateGraphTaskForm {
    @Schema(required = true) private String title;
    @Schema(required = true) private String description;
    @Schema(required = true) private Integer posX;
    @Schema(required = true) private Integer posY;
    @Schema(required = true) private String requiredKnowledge;
    @Schema(required = true) private String activityExpireDate;
    @Schema(required = true) private List<QuestionForm> questions;
    @Schema(required = true) private String timeToSolve;
}
