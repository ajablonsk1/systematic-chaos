package com.example.api.unit.util.visitor;

import com.example.api.dto.response.activity.result.SuperPowerResponse;
import com.example.api.dto.response.map.task.ActivityType;
import com.example.api.error.exception.RequestValidationException;
import com.example.api.model.activity.result.GraphTaskResult;
import com.example.api.model.activity.result.ResultStatus;
import com.example.api.model.activity.task.GraphTask;
import com.example.api.model.question.Difficulty;
import com.example.api.model.question.Question;
import com.example.api.model.question.QuestionType;
import com.example.api.model.user.AccountType;
import com.example.api.model.user.HeroType;
import com.example.api.model.user.User;
import com.example.api.model.user.hero.*;
import com.example.api.util.calculator.TimeCalculator;
import com.example.api.util.visitor.HeroVisitor;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.LinkedList;
import java.util.List;
import java.util.concurrent.TimeUnit;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.Mockito.when;

public class HeroVisitorTest {
    private HeroVisitor heroVisitor;
    @Mock private TimeCalculator timeCalculator;
    private User user;
    private GraphTaskResult result;
    private Long currTime;
    private Question firstQuestion;

    @BeforeEach
    public void init() {
        MockitoAnnotations.openMocks(this);
        heroVisitor = new HeroVisitor(timeCalculator);
        user = new User("email", "Name", "LastName", AccountType.STUDENT);
        user.setLevel(1);

        firstQuestion = new Question();
        Question question1 = new Question(null, QuestionType.MULTIPLE_CHOICE, "", "", Difficulty.EASY, List.of(), 10.0, new LinkedList<>(), null);
        Question question2 = new Question(null, QuestionType.SINGLE_CHOICE, "", "", Difficulty.MEDIUM, List.of(), 20.0, new LinkedList<>(), null);
        Question question3 = new Question(null, QuestionType.OPENED, "", "", Difficulty.HARD, null, 30.0, new LinkedList<>(), "");
        Question question4 = new Question(null, QuestionType.OPENED, "", "", Difficulty.MEDIUM, null, 20.0, new LinkedList<>(), "");
        Question question5 = new Question(null, QuestionType.OPENED, "", "", Difficulty.HARD, null, 30.0, new LinkedList<>(), "");
        firstQuestion.getNext().addAll(List.of(question1, question2, question3));
        question1.getNext().addAll(List.of(question2, question4));
        question3.getNext().add(question5);

        GraphTask graphTask = new GraphTask(ActivityType.EXPEDITION,
                List.of(firstQuestion, question1, question2, question3, question4, question5),
                TimeUnit.MINUTES.toMillis(10)
        );
        currTime = System.currentTimeMillis();
        result = new GraphTaskResult(graphTask, user, currTime, ResultStatus.CHOOSE, firstQuestion);
        result.setFinished(false);
        result.setMaxPoints100(0d);
    }

    @Test
    public void shouldUsePriestSuperPowerNormally() throws RequestValidationException {
        //given
        Priest priest = new Priest(HeroType.PRIEST, TimeUnit.DAYS.toMillis(10));
        user.setUserHero(new UserHero(priest, 0, 0L));
        long startDateMillis = result.getStartDateMillis();
        long healValue = priest.getHealValueForLevel(user.getLevel());
        long timeToSolve = result.getGraphTask().getTimeToSolveMillis();
        long newTimeRemaining = TimeUnit.MINUTES.toMillis(10) + healValue;
        when(timeCalculator.getTimeRemaining(startDateMillis+healValue, timeToSolve)).thenReturn(newTimeRemaining);

        //when
        SuperPowerResponse<Long> response = heroVisitor.visitPriest(priest, user, result);
        Long time = response.getValue();

        //then
        assertThat(time).isEqualTo(newTimeRemaining);
        assertThat(result.getStartDateMillis()).isEqualTo(startDateMillis + healValue);
    }

    @Test
    public void shouldUsePriestSuperPowerNormallyWithHigherUserLevel() throws RequestValidationException {
        //given
        Priest priest = new Priest(HeroType.PRIEST, TimeUnit.DAYS.toMillis(10));
        user.setUserHero(new UserHero(priest, 0, 0L));
        user.setLevel(3);
        long startDateMillis = result.getStartDateMillis();
        long healValue = priest.getHealValueForLevel(user.getLevel());
        long timeToSolve = result.getGraphTask().getTimeToSolveMillis();
        long newTimeRemaining = TimeUnit.MINUTES.toMillis(10) + healValue;
        when(timeCalculator.getTimeRemaining(startDateMillis + healValue, timeToSolve)).thenReturn(newTimeRemaining);

        //when
        SuperPowerResponse<Long> response = heroVisitor.visitPriest(priest, user, result);
        Long time = response.getValue();

        //then
        assertThat(time).isEqualTo(newTimeRemaining);
        assertThat(result.getStartDateMillis()).isEqualTo(startDateMillis + healValue);
    }

    @Test
    public void shouldThrowRequestValidationExceptionBecauseResultIsFinished() {
        //given
        Priest priest = new Priest(HeroType.PRIEST, TimeUnit.DAYS.toMillis(10));
        user.setUserHero(new UserHero(priest, 0, 0L));
        result.setFinished(true);

        //when
        //then
        assertThatThrownBy(() -> heroVisitor.visitPriest(priest, user, result))
                .isInstanceOf(RequestValidationException.class)
                .hasMessageContaining("You cannot use hero power now!");
    }

    @Test
    public void shouldThrowRequestValidationExceptionBecauseCoolDownIsActive() {
        //given
        Priest priest = new Priest(HeroType.PRIEST, TimeUnit.DAYS.toMillis(10));
        user.setUserHero(new UserHero(priest, 0, currTime - TimeUnit.DAYS.toMillis(9)));

        //when
        //then
        assertThatThrownBy(() -> heroVisitor.visitPriest(priest, user, result))
                .isInstanceOf(RequestValidationException.class)
                .hasMessageContaining("You cannot use hero power now!");
    }

    @Test
    public void shouldUseRogueSuperPowerNormally() throws RequestValidationException {
        //given
        Rogue rogue = new Rogue(HeroType.ROGUE, TimeUnit.DAYS.toMillis(10));
        user.setUserHero(new UserHero(rogue, 0, 0L));
        user.setLevel(11);
        result.setCurrQuestion(firstQuestion.getNext().get(0));
        result.setStatus(ResultStatus.ANSWER);


        //when
        SuperPowerResponse<Boolean> response = heroVisitor.visitRogue(rogue, user, result);
        Boolean isDone = response.getValue();

        //then
        assertThat(isDone).isEqualTo(true);
        assertThat(result.getStatus()).isEqualTo(ResultStatus.CHOOSE);
    }

    @Test
    public void shouldThrowRequestValidationExceptionBecauseLevelIsTooLowRogue() {
        //given
        Rogue rogue = new Rogue(HeroType.ROGUE, TimeUnit.DAYS.toMillis(10));
        user.setUserHero(new UserHero(rogue, 0, 0L));
        result.setCurrQuestion(firstQuestion.getNext().get(0));
        result.setStatus(ResultStatus.ANSWER);

        //when
        //then
        assertThatThrownBy(() -> heroVisitor.visitRogue(rogue, user, result))
                .isInstanceOf(RequestValidationException.class)
                .hasMessageContaining("You cannot use hero power now!");
    }

    @Test
    public void shouldThrowRequestValidationExceptionBecauseStatusIsIncorrect() {
        //given
        Rogue rogue = new Rogue(HeroType.ROGUE, TimeUnit.DAYS.toMillis(10));
        user.setUserHero(new UserHero(rogue, 0, 0L));
        Question question = firstQuestion.getNext().get(0);
        user.setLevel((int) Math.round(rogue.getMultiplier() * question.getPoints()) + 1);
        result.setCurrQuestion(firstQuestion.getNext().get(0));
        result.setStatus(ResultStatus.CHOOSE);

        //when
        //then
        assertThatThrownBy(() -> heroVisitor.visitRogue(rogue, user, result))
                .isInstanceOf(RequestValidationException.class)
                .hasMessageContaining("You cannot use hero power now!");
    }

    @Test
    public void shouldUseWarriorSuperPowerNormally() throws RequestValidationException {
        //given
        Warrior warrior = new Warrior(HeroType.WARRIOR, TimeUnit.DAYS.toMillis(10));
        user.setUserHero(new UserHero(warrior, 2, 0L));
        Question question = firstQuestion.getNext().get(0);
        user.setLevel((int) Math.round(user.getUserHero().getTimesSuperPowerUsedInResult() / warrior.getMultiplier()) + 1);


        //when
        SuperPowerResponse<QuestionType> response = heroVisitor.visitWarrior(warrior, user, result, question);
        QuestionType type = response.getValue();

        //then
        assertThat(type).isEqualTo(QuestionType.MULTIPLE_CHOICE);
    }

    @Test
    public void shouldThrowRequestValidationExceptionBecauseLevelIsTooLowWarrior() throws RequestValidationException {
        //given
        Warrior warrior = new Warrior(HeroType.WARRIOR, TimeUnit.DAYS.toMillis(10));
        user.setUserHero(new UserHero(warrior, 1, 0L));
        Question question = firstQuestion.getNext().get(0);
        user.setLevel((int) Math.round(user.getUserHero().getTimesSuperPowerUsedInResult() / warrior.getMultiplier()) - 1);


        //when
        //then
        assertThatThrownBy(() -> heroVisitor.visitWarrior(warrior, user, result, question))
                .isInstanceOf(RequestValidationException.class)
                .hasMessageContaining("You cannot use hero power now!");
    }

    @Test
    public void shouldUseWizardSuperPowerNormally() throws RequestValidationException {
        //given
        Wizard wizard = new Wizard(HeroType.WIZARD, TimeUnit.DAYS.toMillis(10));
        user.setUserHero(new UserHero(wizard, 0, 0L));
        Question question = firstQuestion.getNext().get(0);
        user.setLevel((int) Math.round(user.getUserHero().getTimesSuperPowerUsedInResult() / wizard.getMultiplier()) + 1);


        //when
        SuperPowerResponse<Double> response = heroVisitor.visitWizard(wizard, user, result, question);
        Double points = response.getValue();

        //then
        assertThat(points).isEqualTo(10.0);
    }

    @Test
    public void shouldThrowRequestValidationExceptionBecauseCoolDownIsActiveWizard() throws RequestValidationException {
        //given
        Wizard wizard = new Wizard(HeroType.WIZARD, TimeUnit.DAYS.toMillis(10));
        user.setUserHero(new UserHero(wizard, 0, currTime - TimeUnit.DAYS.toMillis(9)));
        Question question = firstQuestion.getNext().get(0);
        user.setLevel((int) Math.round(user.getUserHero().getTimesSuperPowerUsedInResult() / wizard.getMultiplier()) + 1);


        //when
        //then
        assertThatThrownBy(() -> heroVisitor.visitWizard(wizard, user, result, question))
                .isInstanceOf(RequestValidationException.class)
                .hasMessageContaining("You cannot use hero power now!");
    }
}
