package com.example.api.dto.request.activity.task.create;

import com.example.api.model.activity.task.Activity;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CreateActivityForm {
    @Schema(required = true) private String title;
    @Schema(required = true) private String description;
    @Schema(required = true) private Integer posX;
    @Schema(required = true) private Integer posY;

    public CreateActivityForm(Activity activity) {
        this.title = activity.getTitle();
        this.description = activity.getDescription();
        this.posX = activity.getPosX();
        this.posY = activity.getPosY();
    }
}
