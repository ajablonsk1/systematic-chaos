package com.example.api.dto.response.activity.task.result.question;

import com.example.api.model.question.Option;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class OptionInfo {
    private Long id;
    private String content;

    public OptionInfo(Option option) {
        this.id = option.getId();
        this.content = option.getContent();
    }
}
