package com.example.api.service.activity.result;

import com.example.api.dto.request.activity.result.AddAnswerToGraphTaskForm;
import com.example.api.dto.request.activity.result.SetSendDateMillisForm;
import com.example.api.dto.request.activity.result.SetStartDateMillisForm;
import com.example.api.error.exception.*;
import com.example.api.model.activity.result.GraphTaskResult;
import com.example.api.model.activity.task.GraphTask;
import com.example.api.model.question.Answer;
import com.example.api.model.question.Question;
import com.example.api.model.user.User;
import com.example.api.repo.activity.result.GraphTaskResultRepo;
import com.example.api.repo.activity.task.GraphTaskRepo;
import com.example.api.repo.question.AnswerRepo;
import com.example.api.repo.question.QuestionRepo;
import com.example.api.repo.user.UserRepo;
import com.example.api.security.AuthenticationService;
import com.example.api.service.validator.ActivityValidator;
import com.example.api.service.validator.ResultValidator;
import com.example.api.service.validator.UserValidator;
import com.example.api.util.calculator.PointsCalculator;
import com.example.api.util.calculator.TimeCalculator;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class GraphTaskResultService {
    private final GraphTaskResultRepo graphTaskResultRepo;
    private final GraphTaskRepo graphTaskRepo;
    private final UserRepo userRepo;
    private final QuestionRepo questionRepo;
    private final AnswerRepo answerRepo;
    private final PointsCalculator pointsCalculator;
    private final ResultValidator answerFormValidator;
    private final UserValidator userValidator;
    private final TimeCalculator timeCalculator;
    private final AuthenticationService authService;
    private final ActivityValidator activityValidator;

    public GraphTaskResult getGraphTaskResult(Long graphTaskId)
            throws WrongUserTypeException, EntityNotFoundException {
        String email = authService.getAuthentication().getName();
        User student = userRepo.findUserByEmail(email);
        userValidator.validateStudentAccount(student, email);
        GraphTask graphTask = graphTaskRepo.findGraphTaskById(graphTaskId);
        activityValidator.validateActivityIsNotNull(graphTask, graphTaskId);
        return graphTaskResultRepo.findGraphTaskResultByGraphTaskAndUser(graphTask, student);
    }

    public GraphTaskResult saveGraphTaskResult(GraphTaskResult result) {
        return graphTaskResultRepo.save(result);
    }

    public GraphTaskResult saveGraphTaskResult(Long id) throws EntityNotFoundException, WrongUserTypeException {
        log.info("Saving graph task result");
        GraphTask graphTask = graphTaskRepo.findGraphTaskById(id);
        activityValidator.validateActivityIsNotNull(graphTask, id);
        String email = authService.getAuthentication().getName();
        User user = userRepo.findUserByEmail(email);
        userValidator.validateStudentAccount(user, email);
        GraphTaskResult graphTaskResult = new GraphTaskResult();
        graphTaskResult.setGraphTask(graphTask);
        graphTaskResult.setUser(user);
        graphTaskResult.setStartDateMillis(System.currentTimeMillis());
        return graphTaskResultRepo.save(graphTaskResult);
    }

    public Double getPointsFromClosedQuestions(Long id) throws WrongAnswerTypeException, EntityNotFoundException {
        log.info("Calculating points from closed questions for graph task result with id {}", id);
        GraphTaskResult result = graphTaskResultRepo.findGraphTaskResultById(id);
        activityValidator.validateTaskResultIsNotNull(result, id);
        return pointsCalculator.calculatePointsForClosedQuestions(result);
    }

    public Double getPointsFromOpenedQuestions(Long id) throws WrongAnswerTypeException, EntityNotFoundException {
        log.info("Calculating points from opened questions for graph task result with id {}", id);
        GraphTaskResult result = graphTaskResultRepo.findGraphTaskResultById(id);
        activityValidator.validateTaskResultIsNotNull(result, id);
        return pointsCalculator.calculatePointsForOpenedQuestions(result);
    }

    public Double getAndSetAllPoints(Long id) throws EntityNotFoundException, WrongAnswerTypeException {
        log.info("Calculating and setting points from all questions for graph task result with id {}", id);
        GraphTaskResult result = graphTaskResultRepo.findGraphTaskResultById(id);
        activityValidator.validateTaskResultIsNotNull(result, id);
        double allPoints = pointsCalculator.calculateAllPoints(result);
        result.setPointsReceived(allPoints);
        return allPoints;
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

    public Long addAnswerToGraphTaskResult(AddAnswerToGraphTaskForm form) throws EntityNotFoundException,
            WrongBodyParametersNumberException, EntityRequiredAttributeNullException {
        Long id = form.getResultId();
        long timeRemaining = getTimeRemaining(id);
        if(timeRemaining < 0) {
            log.debug("Time for graph task result with id {} has ended", id);
            return timeRemaining;
        }
        log.info("Saving answer to database for task result with id {}", id);
        GraphTaskResult graphTaskResult = graphTaskResultRepo.findGraphTaskResultById(id);
        Answer answer = answerFormValidator.validateAndCreateAnswer(form.getAnswerForm());
        Question question = questionRepo.findQuestionById(form.getQuestionId());
        answer.setQuestion(question);
        answerRepo.save(answer);
        graphTaskResult.getAnswers().add(answer);
        return timeRemaining;
    }

    public Long setStartDateMillis(SetStartDateMillisForm form) throws EntityNotFoundException {
        Long id = form.getResultId();
        log.info("Setting start time for graph task result with id {}", id);
        GraphTaskResult graphTaskResult = graphTaskResultRepo.findGraphTaskResultById(id);
        activityValidator.validateTaskResultIsNotNull(graphTaskResult, id);
        graphTaskResult.setStartDateMillis(form.getStartDateMillis());
        return form.getStartDateMillis();
    }


    public Long getTimeRemaining(Long resultId) throws EntityNotFoundException, EntityRequiredAttributeNullException {
        log.info("Calculating time remaining for graph task result with id {}", resultId);
        GraphTaskResult graphTaskResult = graphTaskResultRepo.findGraphTaskResultById(resultId);
        activityValidator.validateGraphTaskResultExistsAndHasStartDate(graphTaskResult, resultId);
        GraphTask graphTask = graphTaskResult.getGraphTask();
        return timeCalculator.getTimeRemaining(graphTaskResult.getStartDateMillis(), graphTask.getTimeToSolveMillis());
    }

    public Long setSendDateMillis(SetSendDateMillisForm form) throws EntityNotFoundException {
        Long resultId = form.getResultId();
        log.info("Setting sendDateMillis for graph task result with id {}", resultId);
        GraphTaskResult graphTaskResult = graphTaskResultRepo.findGraphTaskResultById(resultId);
        activityValidator.validateTaskResultIsNotNull(graphTaskResult, resultId);
        graphTaskResult.setSendDateMillis(form.getSendDateMillis());
        return resultId;
    }
}
