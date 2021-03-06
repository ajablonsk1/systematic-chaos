package com.example.api.dto.request.activity.result;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

@Data
public class SetPointsForm {
    @Schema(required = true) private Long resultId;
    @Schema(required = true) private Double points;
}
