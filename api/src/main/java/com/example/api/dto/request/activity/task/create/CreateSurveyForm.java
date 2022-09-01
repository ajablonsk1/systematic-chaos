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
public class CreateSurveyForm extends CreateActivityForm{
    @Schema(required = true) private Double points;

    public CreateSurveyForm(String title, String description, Integer posX, Integer posY, Double points){
        super(title, description, posX, posY);
        this.points = points;
    }
}
