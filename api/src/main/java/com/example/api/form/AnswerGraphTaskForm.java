package com.example.api.form;

import com.example.api.model.question.Answer;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

@Data
public class AnswerGraphTaskForm {
    @Schema(required = true) private Long graphTaskId;
    @Schema(required = true) private Long questionId;
    @Schema(required = true) private Answer answer;
}
