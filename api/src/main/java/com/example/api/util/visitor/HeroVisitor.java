package com.example.api.util.visitor;

import com.example.api.dto.response.activity.result.SuperPowerResponse;
import com.example.api.error.exception.RequestValidationException;
import com.example.api.model.activity.result.GraphTaskResult;
import com.example.api.model.activity.result.ResultStatus;
import com.example.api.model.question.Question;
import com.example.api.model.question.QuestionType;
import com.example.api.model.user.User;
import com.example.api.model.user.hero.*;
import com.example.api.util.calculator.TimeCalculator;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class HeroVisitor {
    private final TimeCalculator timeCalculator;
    public SuperPowerResponse<Long> visitPriest(Priest priest,
                                             User user,
                                             GraphTaskResult result) throws RequestValidationException {
        checkIfHeroPowerCanBeUsed(priest, user, result);

        int level = user.getLevel();
        long healValue = priest.getHealValueForLevel(level);

        long startDateMillis = result.getStartDateMillis();
        long newStartDateMillis = startDateMillis + healValue;
        long timeToSolveMillis = result.getGraphTask().getTimeToSolveMillis();

        result.setStartDateMillis(newStartDateMillis);
        user.getUserHero().setLastSuperPowerUsageTimeMillis(System.currentTimeMillis());
        return new SuperPowerResponse<>(timeCalculator.getTimeRemaining(newStartDateMillis, timeToSolveMillis));
    }

    public SuperPowerResponse<Boolean> visitRogue(Rogue rogue,
                                            User user,
                                            GraphTaskResult result) throws RequestValidationException {
        checkIfHeroPowerCanBeUsed(rogue, user, result);
        result.setStatus(ResultStatus.CHOOSE);

        user.getUserHero().setLastSuperPowerUsageTimeMillis(System.currentTimeMillis());
        return new SuperPowerResponse<>(true);
    }

    public SuperPowerResponse<QuestionType> visitWarrior(Warrior warrior,
                                              User user,
                                              GraphTaskResult result,
                                              Question question) throws RequestValidationException {
        checkIfHeroPowerCanBeUsed(warrior, user, result);

        QuestionType type = question.getType();
        UserHero userHero = user.getUserHero();
        userHero.setTimesSuperPowerUsedInResult(userHero.getTimesSuperPowerUsedInResult() + 1);
        user.getUserHero().setLastSuperPowerUsageTimeMillis(System.currentTimeMillis());
        return new SuperPowerResponse<>(type);
    }

    public SuperPowerResponse<Double> visitWizard(Wizard wizard,
                                             User user,
                                             GraphTaskResult result,
                                             Question question) throws RequestValidationException {
        checkIfHeroPowerCanBeUsed(wizard, user, result);

        Double points = question.getPoints();
        UserHero userHero = user.getUserHero();
        userHero.setTimesSuperPowerUsedInResult(userHero.getTimesSuperPowerUsedInResult() + 1);
        user.getUserHero().setLastSuperPowerUsageTimeMillis(System.currentTimeMillis());
        return new SuperPowerResponse<>(points);
    }

    public void checkIfHeroPowerCanBeUsed(Hero hero,
                                           User user,
                                           GraphTaskResult result) throws RequestValidationException {
        if (!hero.canPowerBeUsed(user, result)) {
            throw new RequestValidationException("You cannot use hero power now!");
        }
    }
}
