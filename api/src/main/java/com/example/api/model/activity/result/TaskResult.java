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

import javax.persistence.*;

@Getter
@Setter
@NoArgsConstructor
@MappedSuperclass
public abstract class TaskResult {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    private User user;

    private Double pointsReceived;
    private Long sendDateMillis;

    public abstract boolean isEvaluated();
    public abstract Activity getActivity();

    public TaskResult(Long id, User user, Double pointsReceived, Long sendDateMillis, BadgeService badgeService)
            throws WrongUserTypeException, EntityNotFoundException, MissingAttributeException {
        this.id = id;
        this.user = user;
        this.setPointsReceivedAndCheckBadges(pointsReceived, badgeService);
        this.sendDateMillis = sendDateMillis;
    }

    public void setPointsReceivedAndCheckBadges(Double newPoints, BadgeService badgeService)
            throws WrongUserTypeException, EntityNotFoundException, MissingAttributeException {
        if (pointsReceived == null) user.changePoints(newPoints);
        else user.changePoints(newPoints - pointsReceived);
        pointsReceived = newPoints;
        badgeService.checkAllBadges();
    }
}
