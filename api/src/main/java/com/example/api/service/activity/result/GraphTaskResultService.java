package com.example.api.service.activity.result;

import com.example.api.dto.response.activity.result.SuperPowerResponse;
import com.example.api.dto.response.activity.result.SuperPowerUsageResponse;
import com.example.api.error.exception.*;
import com.example.api.model.activity.result.GraphTaskResult;
import com.example.api.model.activity.result.ResultStatus;
import com.example.api.model.activity.task.GraphTask;
import com.example.api.model.question.Question;
import com.example.api.model.user.User;
import com.example.api.model.user.hero.Hero;
import com.example.api.repo.activity.result.GraphTaskResultRepo;
import com.example.api.repo.activity.task.GraphTaskRepo;
import com.example.api.repo.question.QuestionRepo;
import com.example.api.repo.user.UserRepo;
import com.example.api.security.AuthenticationService;
import com.example.api.service.user.UserService;
import com.example.api.service.validator.ResultValidator;
import com.example.api.service.validator.UserValidator;
import com.example.api.service.validator.activity.ActivityValidator;
import com.example.api.util.calculator.PointsCalculator;
import com.example.api.util.calculator.TimeCalculator;
import com.example.api.util.visitor.HeroVisitor;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class GraphTaskResultService {
    private final GraphTaskResultRepo graphTaskResultRepo;
    private final GraphTaskRepo graphTaskRepo;
    private final UserRepo userRepo;
    private final QuestionRepo questionRepo;
    private final PointsCalculator pointsCalculator;
    private final ResultValidator resultValidator;
    private final UserValidator userValidator;
    private final TimeCalculator timeCalculator;
    private final AuthenticationService authService;
    private final UserService userService;
    private final ActivityValidator activityValidator;
    private final HeroVisitor heroVisitor;

    public Long getGraphTaskResultId(Long graphTaskId)
            throws WrongUserTypeException, EntityNotFoundException {
        String email = authService.getAuthentication().getName();
        User student = userRepo.findUserByEmail(email);
        userValidator.validateStudentAccount(student, email);
        GraphTask graphTask = graphTaskRepo.findGraphTaskById(graphTaskId);
        activityValidator.validateActivityIsNotNull(graphTask, graphTaskId);
        GraphTaskResult graphTaskResult = graphTaskResultRepo.findGraphTaskResultByGraphTaskAndUser(graphTask, student);
        return graphTaskResult == null ? null : graphTaskResult.getId();
    }

    public GraphTaskResult saveGraphTaskResult(GraphTaskResult result) {
        return graphTaskResultRepo.save(result);
    }

    public void startGraphTaskResult(Long id) throws EntityNotFoundException, WrongUserTypeException, EntityAlreadyInDatabaseException {
        log.info("Saving graph task result");
        GraphTask graphTask = graphTaskRepo.findGraphTaskById(id);
        activityValidator.validateActivityIsNotNull(graphTask, id);

        String email = authService.getAuthentication().getName();
        User user = userRepo.findUserByEmail(email);
        userValidator.validateStudentAccount(user, email);

        GraphTaskResult result = graphTaskResultRepo.findGraphTaskResultByGraphTaskAndUser(graphTask, user);
        resultValidator.validateGraphTaskResultIsNotInDatabase(result, id, email);

        GraphTaskResult graphTaskResult = new GraphTaskResult(
                graphTask,
                user,
                System.currentTimeMillis(),
                ResultStatus.CHOOSE,
                graphTask.getQuestions().get(0)
        );
        graphTaskResultRepo.save(graphTaskResult);
    }

    public Double getPointsFromClosedQuestions(Long id) throws EntityNotFoundException {
        log.info("Calculating points from closed questions for graph task result with id {}", id);
        GraphTaskResult result = graphTaskResultRepo.findGraphTaskResultById(id);
        activityValidator.validateTaskResultIsNotNull(result, id);
        return pointsCalculator.calculatePointsForClosedQuestions(result);
    }

    public Double getPointsFromOpenedQuestions(Long id) throws EntityNotFoundException {
        log.info("Calculating points from opened questions for graph task result with id {}", id);
        GraphTaskResult result = graphTaskResultRepo.findGraphTaskResultById(id);
        activityValidator.validateTaskResultIsNotNull(result, id);
        return pointsCalculator.calculatePointsForOpenedQuestions(result);
    }

    public Double getAllPoints(Long id) throws EntityNotFoundException {
        log.info("Fetching points from graph task result with id {}", id);
        GraphTaskResult result = graphTaskResultRepo.findGraphTaskResultById(id);
        activityValidator.validateTaskResultIsNotNull(result, id);
        return result.getPointsReceived();
    }

    public Double getMaxAvailablePoints(Long id) throws EntityNotFoundException {
        log.info("Calculating maximum available points for graph task result with id {}", id);
        GraphTaskResult result = graphTaskResultRepo.findGraphTaskResultById(id);
        activityValidator.validateTaskResultIsNotNull(result, id);
        return pointsCalculator.calculateMaxAvailablePoints(result);
    }

    public Double getMaxClosedPoints(Long id) throws EntityNotFoundException {
        log.info("Calculating maximum closed points for graph task result with id {}", id);
        GraphTaskResult result = graphTaskResultRepo.findGraphTaskResultById(id);
        activityValidator.validateTaskResultIsNotNull(result, id);
        return pointsCalculator.calculateMaxClosedPoints(result);
    }

    public Double getMaxOpenedPoints(Long id) throws EntityNotFoundException {
        log.info("Calculating maximum opened points for graph task result with id {}", id);
        GraphTaskResult result = graphTaskResultRepo.findGraphTaskResultById(id);
        activityValidator.validateTaskResultIsNotNull(result, id);
        return pointsCalculator.calculateMaxOpenedPoints(result);
    }

    public Long getTimeRemaining(Long resultId) throws EntityNotFoundException, EntityRequiredAttributeNullException {
        log.info("Calculating time remaining for graph task result with id {}", resultId);
        GraphTaskResult graphTaskResult = graphTaskResultRepo.findGraphTaskResultById(resultId);
        activityValidator.validateGraphTaskResultExistsAndHasStartDate(graphTaskResult, resultId);
        GraphTask graphTask = graphTaskResult.getGraphTask();
        return timeCalculator.getTimeRemaining(graphTaskResult.getStartDateMillis(), graphTask.getTimeToSolveMillis());
    }

    public Long getTimeLeftAfterEnd(Long resultId) throws EntityNotFoundException, EntityRequiredAttributeNullException {
        log.info("Calculating how much time left after last action for graph task result with id {}", resultId);
        GraphTaskResult graphTaskResult = graphTaskResultRepo.findGraphTaskResultById(resultId);
        activityValidator.validateGraphTaskResultExistsAndHasStartAndEndDate(graphTaskResult, resultId);
        GraphTask graphTask = graphTaskResult.getGraphTask();
        return timeCalculator.getTimeLeftAfterLastAnswer(graphTaskResult.getStartDateMillis(), graphTask.getTimeToSolveMillis(), graphTaskResult.getSendDateMillis());
    }

    public Long getTimeRemaining(GraphTaskResult result) throws EntityNotFoundException, EntityRequiredAttributeNullException {
        log.info("Calculating time remaining for graph task result with id {}", result.getId());
        activityValidator.validateGraphTaskResultExistsAndHasStartDate(result, result.getId());
        GraphTask graphTask = result.getGraphTask();
        return timeCalculator.getTimeRemaining(result.getStartDateMillis(), graphTask.getTimeToSolveMillis());
    }

    public GraphTaskResult getGraphTaskResult(Long graphTaskId, String email)
            throws EntityNotFoundException, WrongUserTypeException {
        User user = userRepo.findUserByEmail(email);
        userValidator.validateStudentAccount(user, email);

        GraphTask graphTask = graphTaskRepo.findGraphTaskById(graphTaskId);
        activityValidator.validateActivityIsNotNull(graphTask, graphTaskId);

        return getGraphTaskResultWithGraphTaskAndUser(graphTask, user);
    }

    public List<GraphTaskResult> getAllGraphTaskResultsForStudent(User student){
        return graphTaskResultRepo.findAllByUser(student);
    }

    public SuperPowerResponse<?> useSuperPower(Long graphTaskId, Long questionId) throws RequestValidationException {
        User user = userService.getCurrentUserAndValidateStudentAccount();
        Hero hero = user.getUserHero().getHero();

        GraphTask graphTask = graphTaskRepo.findGraphTaskById(graphTaskId);
        GraphTaskResult result = getGraphTaskResultWithGraphTaskAndUser(graphTask, user);
        Question question = questionRepo.findQuestionById(questionId);

        return hero.useSuperPower(heroVisitor, user, result, question);
    }

    public SuperPowerUsageResponse canSuperPowerBeUsed(Long graphTaskId) throws RequestValidationException {
        User user = userService.getCurrentUserAndValidateStudentAccount();
        Hero hero = user.getUserHero().getHero();

        GraphTask graphTask = graphTaskRepo.findGraphTaskById(graphTaskId);
        GraphTaskResult result = getGraphTaskResultWithGraphTaskAndUser(graphTask, user);

        boolean canBeUsed = hero.canPowerBeUsed(user, result);
        String message = hero.getCanBeUsedMessage(user, result);

        return new SuperPowerUsageResponse(canBeUsed, message);
    }

    private GraphTaskResult getGraphTaskResultWithGraphTaskAndUser(GraphTask graphTask, User user) throws EntityNotFoundException {
        GraphTaskResult result = graphTaskResultRepo.findGraphTaskResultByGraphTaskAndUser(graphTask, user);
        resultValidator.validateResultIsNotNull(result, graphTask.getId(), user.getEmail());
        return result;
    }
}
