package com.example.api.model.activity.result;

import com.example.api.model.activity.task.GraphTask;
import com.example.api.model.question.Answer;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
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

    @OneToOne
    private GraphTask graphTask;

    private int timeSpent;

    private boolean isAllEvaluated;
}

