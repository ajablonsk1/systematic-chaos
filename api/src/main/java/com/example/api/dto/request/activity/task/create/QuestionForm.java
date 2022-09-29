package com.example.api.dto.request.activity.task.create;

import com.example.api.model.question.Question;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.HashMap;
import java.util.List;
import java.util.Objects;

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
    
    public QuestionForm(Question question, HashMap<Long, Integer> idToNum) {
        this.questionNum = idToNum.get(question.getId());
        this.questionType = Objects.nonNull(question.getType()) ? question.getType().toString(): null;
        this.content = question.getContent();
        this.hint = question.getHint();
        this.difficulty = Objects.nonNull(question.getDifficulty()) ? question.getDifficulty().toString() : null;
        this.answers = question.getOptions()
                .stream()
                .map(option -> new OptionForm(option.getContent(), option.isCorrect()))
                .toList();
        this.points = question.getPoints();
        this.nextQuestions = question.getNext()
                .stream()
                .map(q -> idToNum.get(q.getId()))
                .toList();
        this.answerForOpenedQuestion = question.getAnswerForOpenedQuestion();
    }
}
