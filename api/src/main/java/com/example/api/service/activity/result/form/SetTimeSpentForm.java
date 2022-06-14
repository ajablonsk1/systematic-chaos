package com.example.api.service.activity.result.form;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

@Data
public class SetTimeSpentForm {
    @Schema(required = true) private Long resultId;
    @Schema(required = true) private int timeSpent;
}
