package com.example.api.dto.response.activity.task.result.question;

import com.example.api.model.question.Difficulty;
import com.example.api.model.question.Question;
import com.example.api.model.question.QuestionType;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class QuestionList {
    private Long id;
    private QuestionType type;
    private String hint;
    private Difficulty difficulty;
    private Double points;

    public QuestionList(Question question) {
        this.id = question.getId();
        this.type = question.getType();
        this.hint = question.getHint();
        this.difficulty = question.getDifficulty();
        this.points = question.getPoints();
    }
}
