package com.example.api.dto.request.activity.result;

import com.example.api.model.activity.result.ResultStatus;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class QuestionActionForm {
    @Schema(required = true) private ResultStatus status;
    @Schema(required = true) private Long graphTaskId;
    @Schema(required = false) private Long questionId;
    @Schema(required = false) private AnswerForm answerForm;
}
