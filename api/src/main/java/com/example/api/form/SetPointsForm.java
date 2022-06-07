package com.example.api.form;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

@Data
public class SetPointsForm {
    @Schema(required = true) private Long taskId;
    @Schema(required = true) private Double points;
}
