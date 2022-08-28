package com.example.api.model.activity.task;

import com.example.api.dto.request.activity.task.create.CreateGraphTaskForm;
import com.example.api.model.question.Question;
import com.example.api.model.user.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.OneToMany;
import java.util.LinkedList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class GraphTask extends Task {
    @OneToMany
    private List<Question> questions = new LinkedList<>();
    private Long timeToSolveMillis;

    public GraphTask(CreateGraphTaskForm form,
                     User professor,
                     List<Question> questions,
                     long expireDateMillis,
                     long timeToSolveMillis,
                     double maxPoints){
        super(form.getTitle(), form.getDescription(), form.getPosX(), form.getPosY(), professor,
                form.getRequiredKnowledge(), maxPoints, expireDateMillis);
        this.questions = questions;
        this.timeToSolveMillis = timeToSolveMillis;
        super.setExperience(maxPoints * 10);
    }
}
