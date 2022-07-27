package com.example.api.dto.request.activity.result;

import com.example.api.model.question.Option;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AnswerForm {
    @Schema(required = false) private Option option;
    @Schema(required = false) List<Option> options;
    @Schema(required = false) String openAnswer;
}
