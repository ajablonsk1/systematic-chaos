package com.example.api.dto.request.activity.task.edit;

import com.example.api.dto.request.activity.task.create.CreateSurveyForm;
import com.example.api.model.activity.task.Survey;
import lombok.Data;

@Data
public class EditSurveyForm extends EditActivityForm {
    public EditSurveyForm(Survey survey) {
        this.setActivityID(survey.getId());
        this.setActivityBody(new CreateSurveyForm(survey));
    }
}
