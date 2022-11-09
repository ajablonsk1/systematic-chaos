package com.example.api.model.user.hero;

import com.example.api.dto.response.activity.result.SuperPowerResponse;
import com.example.api.error.exception.RequestValidationException;
import com.example.api.model.activity.result.GraphTaskResult;
import com.example.api.model.activity.result.ResultStatus;
import com.example.api.model.question.Question;
import com.example.api.model.user.HeroType;
import com.example.api.model.user.User;
import com.example.api.util.message.HeroMessage;
import com.example.api.util.visitor.HeroVisitor;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Entity;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Rogue extends Hero{
    private Double multiplier = 1.0;

    public Rogue(HeroType type, Long coolDownTimeMillis) {
        super(type, coolDownTimeMillis);
    }

    @Override
    public SuperPowerResponse<?> useSuperPower(HeroVisitor visitor,
                                               User user,
                                               GraphTaskResult result,
                                               Question question) throws RequestValidationException {
        return visitor.visitRogue(this, user, result);
    }

    @Override
    public Boolean isResultStatusCorrect(GraphTaskResult result) {
        return result.getStatus() == ResultStatus.ANSWER;
    }

    @Override
    public void changeValue(Double value) {
        setMultiplier(value);
    }

    public Boolean canPowerBeUsed(User user, GraphTaskResult result) {
        int level = user.getLevel();
        double points = result.getCurrQuestion().getPoints();
        if (canSkipQuestion(level, points)) {
            return false;
        }
        return super.canPowerBeUsed(user, result);
    }

    private boolean canSkipQuestion(int level, double points) {
        return level * multiplier >= points;
    }

    public String getCanBeUsedMessage(User user, GraphTaskResult result) {
        if (result.isFinished()) {
            return HeroMessage.RESULT_FINISHED;
        }
        if (!isResultStatusCorrect(result)) {
            return HeroMessage.INCORRECT_STATUS;
        }
        if (isCoolDownActive(user)) {
            return HeroMessage.COOL_DOWN_ACTIVE;
        }
        int level = user.getLevel();
        double points = result.getCurrQuestion().getPoints();
        if (!canSkipQuestion(level, points)) {
            String message = HeroMessage.CANNOT_SKIP;
            double pointsToSkip = level * multiplier;
            return message.replace("{}", String.valueOf(pointsToSkip));
        }
        return HeroMessage.POWER_READY_TO_BE_USED;
    }
}
