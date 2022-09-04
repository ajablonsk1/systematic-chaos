package com.example.api.model.activity.task;

import com.example.api.dto.request.activity.task.create.CreateSurveyForm;
import com.example.api.dto.response.map.task.ActivityType;
import com.example.api.model.user.User;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Entity;

@Getter
@Setter
@NoArgsConstructor
@Entity
public class Survey extends Activity{
    private ActivityType activityType = ActivityType.SURVEY;
    private double points;

    public Survey(CreateSurveyForm form, User professor) {
        super(form.getTitle(), form.getDescription(), form.getPosX(), form.getPosY(), professor);
        this.points = form.getPoints();
    }

    @Override
    public Double getMaxPoints() {
        return points;
    }
}
