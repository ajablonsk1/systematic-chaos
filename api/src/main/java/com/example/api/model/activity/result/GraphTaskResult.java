package com.example.api.model.activity.result;

import com.example.api.model.activity.task.Activity;
import com.example.api.model.activity.task.GraphTask;
import com.example.api.model.question.Answer;
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
public class GraphTaskResult extends TaskResult {
    @OneToMany
    private List<Answer> answers = new LinkedList<>();

    @ManyToOne
    @JoinColumn(name = "graphTask_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private GraphTask graphTask;

    private int timeSpentSec;
    private Long startDateMillis;
    private ResultStatus status;
    private boolean finished;

    @OneToOne
    private Question currQuestion;

    @Override
    public boolean isEvaluated() {
        return this.getPointsReceived() != null;
    }

    @Override
    public Activity getActivity() {
        return graphTask;
    }

    public GraphTaskResult(GraphTask graphTask,
                           User user,
                           Long startDateMillis,
                           ResultStatus status,
                           Question currQuestion) {
        this.graphTask = graphTask;
        this.setUser(user);
        this.startDateMillis = startDateMillis;
        this.setSendDateMillis(startDateMillis);
        this.status = status;
        this.currQuestion = currQuestion;
        this.finished = false;
    }
}

