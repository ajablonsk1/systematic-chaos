package com.example.api.model.activity.result;

import com.example.api.model.activity.task.Activity;
import com.example.api.model.activity.task.Survey;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Getter
@Setter
@NoArgsConstructor
@Entity
public class SurveyResult extends TaskResult{
    @ManyToOne
    @JoinColumn(name="survey_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Survey survey;

    @Override
    public boolean isEvaluated() {
        return this.getPointsReceived() != null;
    }

    @Override
    public Activity getActivity() {
        return survey;
    }
}
