package com.example.api.dto.response.activity.task.result.question;

import com.example.api.model.question.Question;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class QuestionDetails {
    private Long questionId;
    private String content;
    private Double points;
    private List<OptionInfo> options;

    public QuestionDetails(Question question) {
        this.questionId = question.getId();
        this.content = question.getContent();
        this.points = question.getPoints();
        this.options = question.getOptions()
                .stream()
                .map(OptionInfo::new)
                .toList();
    }
}