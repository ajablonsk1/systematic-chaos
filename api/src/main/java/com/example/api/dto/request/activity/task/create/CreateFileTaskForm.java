package com.example.api.dto.request.activity.task.create;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CreateFileTaskForm extends CreateActivityForm{
    @Schema(required = true) private String requiredKnowledge;
    @Schema(required = true) private Double maxPoints;
    @Schema(required = true) private String activityExpireDate;

    public CreateFileTaskForm(String title,
                              String description,
                              Integer posX,
                              Integer posY,
                              String requiredKnowledge,
                              Double maxPoints,
                              String activityExpireDate) {
        super(title, description, posX, posY);
        this.requiredKnowledge = requiredKnowledge;
        this.maxPoints = maxPoints;
        this.activityExpireDate = activityExpireDate;
    }
}
