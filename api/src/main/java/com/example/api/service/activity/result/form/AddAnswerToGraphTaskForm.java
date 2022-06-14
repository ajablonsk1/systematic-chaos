package com.example.api.service.activity.result.form;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

@Data
public class AddAnswerToGraphTaskForm {
    @Schema(required = true) private Long resultId;
    @Schema(required = true) private Long questionId;
    @Schema(required = true) private AnswerForm answerForm;
}
