package com.example.api.dto.request.activity.task.edit;

import com.example.api.dto.request.activity.task.create.CreateSurveyForm;
import com.example.api.dto.response.map.task.ActivityType;
import com.example.api.model.activity.task.Survey;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class EditSurveyForm extends EditActivityForm {
    public EditSurveyForm(Survey survey) {
        super(survey.getId(), ActivityType.SURVEY, new CreateSurveyForm(survey));
    }
}
