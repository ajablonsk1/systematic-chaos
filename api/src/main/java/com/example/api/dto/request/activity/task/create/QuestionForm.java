package com.example.api.dto.request.activity.task.create;

import com.example.api.model.question.Question;
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
    @Schema(required = true) private String questionType;
    @Schema(required = true) private String content;
    @Schema(required = true) private String hint;
    @Schema(required = true) private String difficulty;
    @Schema(required = false) private List<OptionForm> answers;
    @Schema(required = true) private Double points;
    @Schema(required = true) private List<Integer> nextQuestions;
    @Schema(required = false) private String answerForOpenedQuestion;

    public QuestionForm(int questionNum, List<Integer> nextQuestions) {
        this.questionNum = questionNum;
        this.nextQuestions = nextQuestions;
    }
    
    public QuestionForm(Question question, int questionNum) {
        this.
    }
}
