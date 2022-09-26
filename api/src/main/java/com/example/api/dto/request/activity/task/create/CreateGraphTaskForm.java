package com.example.api.dto.request.activity.task.create;

import com.example.api.model.activity.task.GraphTask;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CreateGraphTaskForm extends CreateActivityForm{
    @Schema(required = true) private String requiredKnowledge;
    @Schema(required = true) private List<QuestionForm> questions;
    @Schema(required = true) private String timeToSolve;

    public CreateGraphTaskForm(String title,
                               String description,
                               Integer posX,
                               Integer posY,
                               String requiredKnowledge,
                               List<QuestionForm> questions,
                               String timeToSolve) {
        super(title, description, posX, posY);
        this.requiredKnowledge = requiredKnowledge;
        this.questions = questions;
        this.timeToSolve = timeToSolve;
    }

    public CreateGraphTaskForm(GraphTask graphTask) {
        super(graphTask);
        this.requiredKnowledge = requiredKnowledge;
        this.questions = questions;
        this.timeToSolve = timeToSolve;
    }
}
