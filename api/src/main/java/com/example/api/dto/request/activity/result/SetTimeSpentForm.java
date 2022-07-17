package com.example.api.dto.request.activity.result;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class SetTimeSpentForm {
    @Schema(required = true) private Long resultId;
    @Schema(required = true) private int timeSpent;
}
