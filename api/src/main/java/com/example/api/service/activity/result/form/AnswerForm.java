package com.example.api.service.activity.result.form;

import com.example.api.model.question.Option;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import java.util.List;

@Data
public class AnswerForm {
    @Schema(required = false) private Option option;
    @Schema(required = false) List<Option> options;
    @Schema(required = false) String openAnswer;
}
