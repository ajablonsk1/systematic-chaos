package com.example.api.dto.response.activity.task.result.question;

import com.example.api.model.question.Question;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class QuestionInfo {
    private Long id;
    private String content;
    private Double points;
    private Long timeRemaining;
    private List<OptionInfo> optionInfos;

    public QuestionInfo(Question question, Long timeRemaining) {
        this.id = question.getId();
        this.content = question.getContent();
        this.points = question.getPoints();
        this.timeRemaining = timeRemaining;
        this.optionInfos = question.getOptions()
                .stream()
                .map(OptionInfo::new)
                .toList();
    }
}
