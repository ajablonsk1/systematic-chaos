package com.example.api.model.activity.result;

import com.example.api.model.activity.task.Survey;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

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
    private Survey survey;
}
