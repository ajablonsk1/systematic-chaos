package com.example.api.dto.request.activity.task.create;

import com.example.api.model.question.Difficulty;
import com.example.api.model.question.QuestionType;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class QuestionForm {
    @Schema(required = true) private Integer questionNum;
    @Schema(required = true) private QuestionType type;
    @Schema(required = true) private String content;
    @Schema(required = true) private String hint;
    @Schema(required = true) private Difficulty difficulty;
    @Schema(required = true) private List<OptionForm> answers;
    @Schema(required = true) private Double points;
    @Schema(required = true) private List<Integer> nextQuestions;
    @Schema(required = false) private String answerForOpenedQuestion;
}
