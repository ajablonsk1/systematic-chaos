package com.example.api.dto.request.activity.task.create;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CreateFileTaskForm {
    @Schema(required = true) private String name;
    @Schema(required = true) private String description;
    @Schema(required = true) private Integer posX;
    @Schema(required = true) private Integer posY;
    @Schema(required = true) private String requiredKnowledge;
    @Schema(required = true) private Double maxPoints;
    @Schema(required = true) private String activityExpireDate;
}
