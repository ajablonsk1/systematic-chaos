package com.example.api.model.activity.result;

import com.example.api.error.exception.EntityNotFoundException;
import com.example.api.error.exception.MissingAttributeException;
import com.example.api.error.exception.WrongUserTypeException;
import com.example.api.model.activity.task.Activity;
import com.example.api.model.user.User;
import com.example.api.service.user.BadgeService;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Entity;

@Getter
@Setter
@NoArgsConstructor
@Entity
public class AdditionalPoints extends TaskResult{
    private String professorEmail;
    private String description;

    public AdditionalPoints(Long id,
                            User student,
                            Double points,
                            Long sendDateMillis,
                            String professorEmail,
                            String description,
                            BadgeService badgeService)
            throws WrongUserTypeException, EntityNotFoundException, MissingAttributeException {
        super(id, student, points, sendDateMillis, badgeService);
        this.professorEmail = professorEmail;
        this.description = description;
    }

    @Override
    public boolean isEvaluated() {
        return true;
    }

    @Override
    public Activity getActivity() {
        return null;
    }
}
