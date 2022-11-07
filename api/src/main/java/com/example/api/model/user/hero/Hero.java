package com.example.api.model.user.hero;

import com.example.api.dto.response.activity.result.SuperPowerResponse;
import com.example.api.error.exception.RequestValidationException;
import com.example.api.model.activity.result.GraphTaskResult;
import com.example.api.model.question.Question;
import com.example.api.model.user.HeroType;
import com.example.api.model.user.User;
import com.example.api.util.message.HeroMessage;
import com.example.api.util.visitor.HeroVisitor;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public abstract class Hero {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    private HeroType type;
    private Long coolDownTimeMillis;

    public Hero(HeroType type, Long coolDownTimeMillis) {
        this.type = type;
        this.coolDownTimeMillis = coolDownTimeMillis;
    }

    public abstract SuperPowerResponse<?> useSuperPower(HeroVisitor visitor,
                                                        User user,
                                                        GraphTaskResult result,
                                                        Question question) throws RequestValidationException;

    public abstract Boolean isResultStatusCorrect(GraphTaskResult result);
    public abstract void changeValue(Double value);

    public Boolean canPowerBeUsed(User user, GraphTaskResult result) {
        if (isResultFinishedOrStatusIncorrect(result)) {
            return false;
        }
        return !isCoolDownActive(user);
    }

    public Boolean canPowerBeUsed(User user, GraphTaskResult result, double multiplier) {
        if (isResultFinishedOrStatusIncorrect(result)) {
            return false;
        }
        int timesSuperPowerUsedInResult = user.getUserHero().getTimesSuperPowerUsedInResult();
        if (timesSuperPowerUsedInResult != 0) {
            int level = user.getLevel();
            long timesSuperPowerCanBeUsed = Math.round(multiplier * level);
            return timesSuperPowerUsedInResult < timesSuperPowerCanBeUsed;
        } else {
            return !isCoolDownActive(user);
        }
    }

    protected Boolean isResultFinishedOrStatusIncorrect(GraphTaskResult result) {
        boolean isFinished = result.isFinished();
        if (isFinished) {
            return true;
        }
        return !isResultStatusCorrect(result);
    }

    protected Boolean isCoolDownActive(User user) {
        Long currentTimeMillis = System.currentTimeMillis();
        Long lastPowerUsageDateMillis = user.getUserHero().getLastSuperPowerUsageTimeMillis();
        return currentTimeMillis - lastPowerUsageDateMillis < coolDownTimeMillis;
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
        return HeroMessage.POWER_READY_TO_BE_USED;
    }

    public String getCanBeUsedMessage(User user, GraphTaskResult result, double multiplier) {
        if (result.isFinished()) {
            return HeroMessage.RESULT_FINISHED;
        }
        if (!isResultStatusCorrect(result)) {
            return HeroMessage.INCORRECT_STATUS;
        }
        int timesSuperPowerUsedInResult = user.getUserHero().getTimesSuperPowerUsedInResult();
        int level = user.getLevel();
        long timesSuperPowerCanBeUsed = Math.round(multiplier * level);
        if (timesSuperPowerUsedInResult != 0) {
            if (timesSuperPowerUsedInResult <= timesSuperPowerCanBeUsed) {
                return HeroMessage.CANNOT_USE_MORE;
            }
        } else {
            if (isCoolDownActive(user)) {
                return HeroMessage.COOL_DOWN_ACTIVE;
            }
        }
        String message = HeroMessage.POWER_READY_TO_BE_USED_WITH_NUMBER;
        return message.replace("{}", String.valueOf(timesSuperPowerCanBeUsed - timesSuperPowerUsedInResult));
    }
}
