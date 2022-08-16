package com.example.api.dto.request.activity.result;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AddAdditionalPointsForm {
    @Schema(required = true) private Long studentId;
    @Schema(required = true) private Double points;
    @Schema(required = false) private String description;
    @Schema(required = true) private Long dateInMillis;
}
