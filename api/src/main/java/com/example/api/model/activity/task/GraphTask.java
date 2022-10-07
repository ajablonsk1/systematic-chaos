package com.example.api.model.activity.task;

import com.example.api.dto.request.activity.task.create.CreateGraphTaskForm;
import com.example.api.dto.response.map.task.ActivityType;
import com.example.api.model.question.Question;
import com.example.api.model.user.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import java.util.LinkedList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class GraphTask extends Task {
    private ActivityType activityType = ActivityType.EXPEDITION;
    @OneToMany
    @JoinColumn
    @OnDelete(action = OnDeleteAction.CASCADE)
    private List<Question> questions = new LinkedList<>();
    private Long timeToSolveMillis;

    public GraphTask(CreateGraphTaskForm form,
                     User professor,
                     List<Question> questions,
                     long timeToSolveMillis,
                     double maxPoints){
        super(form.getTitle(), form.getDescription(), form.getPosX(), form.getPosY(), professor,
                form.getRequiredKnowledge(), maxPoints);
        this.questions = questions;
        this.timeToSolveMillis = timeToSolveMillis;
        super.setExperience(maxPoints * 10);
    }
}
