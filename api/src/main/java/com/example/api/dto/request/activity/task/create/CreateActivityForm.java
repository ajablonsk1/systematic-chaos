package com.example.api.dto.request.activity.task.create;

import com.example.api.dto.response.map.task.ActivityType;
import com.example.api.model.activity.task.Activity;
import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@JsonTypeInfo(use = JsonTypeInfo.Id.NAME, visible = true, property = "activityType")
@JsonSubTypes({
        @JsonSubTypes.Type(value = CreateGraphTaskForm.class, name = "EXPEDITION"),
        @JsonSubTypes.Type(value = CreateFileTaskForm.class, name = "TASK"),
        @JsonSubTypes.Type(value = CreateSurveyForm.class, name = "SURVEY"),
        @JsonSubTypes.Type(value = CreateInfoForm.class, name = "INFO")
})
public abstract class CreateActivityForm {
    @Schema(required = true) private ActivityType activityType;
    @Schema(required = true) private String title;
    @Schema(required = true) private String description;
    @Schema(required = true) private Integer posX;
    @Schema(required = true) private Integer posY;

    public CreateActivityForm(Activity activity) {
        this.activityType = activity.getActivityType();
        this.title = activity.getTitle();
        this.description = activity.getDescription();
        this.posX = activity.getPosX();
        this.posY = activity.getPosY();
    }
}
