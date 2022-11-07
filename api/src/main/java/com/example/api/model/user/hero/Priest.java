package com.example.api.model.user.hero;

import com.example.api.dto.response.activity.result.SuperPowerResponse;
import com.example.api.error.exception.RequestValidationException;
import com.example.api.model.activity.result.GraphTaskResult;
import com.example.api.model.question.Question;
import com.example.api.model.user.HeroType;
import com.example.api.model.user.User;
import com.example.api.util.visitor.HeroVisitor;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Entity;
import java.util.concurrent.TimeUnit;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Priest extends Hero{
    private int healValue = 20;

    public Priest(HeroType type, Long coolDownTimeMillis) {
        super(type, coolDownTimeMillis);
    }

    @Override
    public SuperPowerResponse<?> useSuperPower(HeroVisitor visitor,
                                               User user, GraphTaskResult result,
                                               Question question) throws RequestValidationException {
        return visitor.visitPriest(this, user, result);
    }

    @Override
    public void changeValue(Double value) {
        setHealValue(value.intValue());
    }

    @Override
    public Boolean isResultStatusCorrect(GraphTaskResult result) {
        return true;
    }

    public long getHealValueForLevel(int level) {
        return TimeUnit.SECONDS.toMillis(healValue) * level;
    }
}
