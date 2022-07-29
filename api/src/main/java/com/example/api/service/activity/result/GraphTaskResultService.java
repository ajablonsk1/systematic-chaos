package com.example.api.service.activity.result;

import com.example.api.dto.request.activity.result.AddAnswerToGraphTaskForm;
import com.example.api.dto.request.activity.result.SetStartTimeForm;
import com.example.api.dto.request.activity.result.SetTimeSpentForm;
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
import com.example.api.service.validator.AnswerFormValidator;
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
    private final AnswerFormValidator answerFormValidator;
    private final UserValidator userValidator;
    private final TimeCalculator timeCalculator;
    private final AuthenticationService authService;

    public GraphTaskResult getGraphTaskResult(Long graphTaskId)
            throws WrongUserTypeException, EntityNotFoundException {
        String email = authService.getAuthentication().getName();
        User student = userRepo.findUserByEmail(email);
        userValidator.validateStudentAccount(student, email);
        GraphTask task = graphTaskRepo.findGraphTaskById(graphTaskId);
        if(task == null) {
            log.error("Graph task with given id {} does not exist", graphTaskId);
            throw new EntityNotFoundException("Graph task with given id " + graphTaskId + " does not exist");
        }
        return graphTaskResultRepo.findGraphTaskResultByGraphTaskAndUser(task, student);
    }

    public GraphTaskResult saveGraphTaskResult(GraphTaskResult result) {
        return graphTaskResultRepo.save(result);
    }

    public GraphTaskResult saveGraphTaskResult(Long id) throws EntityNotFoundException {
        log.info("Saving graph task result");
        GraphTask graphTask = graphTaskRepo.findGraphTaskById(id);
        if(graphTask == null) {
            log.error("Graph task with given id {} does not exist", id);
            throw new EntityNotFoundException("Graph task with given id " + id + " does not exist");
        }
        String email = authService.getAuthentication().getName();
        User user = userRepo.findUserByEmail(email);
        if(user == null) {
            log.error("User {} not found in database", email);
            throw new EntityNotFoundException("User" + email + " not found in database");
        }
        GraphTaskResult graphTaskResult = new GraphTaskResult();
        graphTaskResult.setGraphTask(graphTask);
        graphTaskResult.setUser(user);
        graphTaskResult.setStartTimeMillis(System.currentTimeMillis());
        return graphTaskResultRepo.save(graphTaskResult);
    }

    public Double getPointsFromClosedQuestions(Long id) throws WrongAnswerTypeException, EntityNotFoundException {
        log.info("Calculating points from closed questions for graph task result with id {}", id);
        GraphTaskResult result = graphTaskResultRepo.findGraphTaskResultById(id);
        if(result == null) {
            log.error("Graph task result with given id {} does not exist", id);
            throw new EntityNotFoundException("Graph task result with given id " + id + " does not exist");
        }
        return pointsCalculator.calculatePointsForClosedQuestions(result);
    }

    public Double getPointsFromOpenedQuestions(Long id) throws WrongAnswerTypeException, EntityNotFoundException {
        log.info("Calculating points from opened questions for graph task result with id {}", id);
        GraphTaskResult result = graphTaskResultRepo.findGraphTaskResultById(id);
        if(result == null) {
            log.error("Graph task result with given id {} does not exist", id);
            throw new EntityNotFoundException("Graph task result with given id " + id + " does not exist");
        }
        return pointsCalculator.calculatePointsForOpenedQuestions(result);
    }

    public Double getAndSetAllPoints(Long id) throws EntityNotFoundException, WrongAnswerTypeException {
        log.info("Calculating and setting points from all questions for graph task result with id {}", id);
        GraphTaskResult result = graphTaskResultRepo.findGraphTaskResultById(id);
        if(result == null) {
            log.error("Graph task result with given id {} does not exist", id);
            throw new EntityNotFoundException("Graph task result with given id " + id + " does not exist");
        }
        double allPoints = pointsCalculator.calculateAllPoints(result);
        result.setPointsReceived(allPoints);
        return allPoints;
    }

    public Double getMaxAvailablePoints(Long id) throws EntityNotFoundException {
        log.info("Calculating maximum available points for graph task result with id {}", id);
        GraphTaskResult result = graphTaskResultRepo.findGraphTaskResultById(id);
        if(result == null) {
            log.error("Graph task result with given id {} does not exist", id);
            throw new EntityNotFoundException("Graph task result with given id " + id + " does not exist");
        }
        return pointsCalculator.calculateMaxAvailablePoints(result);
    }

    public Double getMaxClosedPoints(Long id) throws EntityNotFoundException {
        log.info("Calculating maximum closed points for graph task result with id {}", id);
        GraphTaskResult result = graphTaskResultRepo.findGraphTaskResultById(id);
        if(result == null) {
            log.error("Graph task result with given id {} does not exist", id);
            throw new EntityNotFoundException("Graph task result with given id " + id + " does not exist");
        }
        return pointsCalculator.calculateMaxClosedPoints(result);
    }

    public Double getMaxOpenedPoints(Long id) throws EntityNotFoundException {
        log.info("Calculating maximum opened points for graph task result with id {}", id);
        GraphTaskResult result = graphTaskResultRepo.findGraphTaskResultById(id);
        if(result == null) {
            log.error("Graph task result with given id {} does not exist", id);
            throw new EntityNotFoundException("Graph task result with given id " + id + " does not exist");
        }
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

    public Integer setTimeSpent(SetTimeSpentForm form) throws EntityNotFoundException {
        Long id = form.getResultId();
        log.info("Setting time spent for graph task result with id {}", id);
        GraphTaskResult result = graphTaskResultRepo.findGraphTaskResultById(id);
        if(result == null) {
            log.error("Graph task result with given id {} does not exist", id);
            throw new EntityNotFoundException("Graph task result with given id " + id + " does not exist");
        }
        int timeSpent = form.getTimeSpent();
        result.setTimeSpentSec(timeSpent);
        return timeSpent;
    }

    public Long setStartTime(SetStartTimeForm form) throws EntityNotFoundException {
        Long id = form.getResultId();
        log.info("Setting start time for graph task result with id {}", id);
        GraphTaskResult graphTaskResult = graphTaskResultRepo.findGraphTaskResultById(id);
        if(graphTaskResult == null) {
            log.error("Graph task result with given id {} does not exist", id);
            throw new EntityNotFoundException("Graph task result with given id " + id + " does not exist");
        }
        graphTaskResult.setStartTimeMillis(form.getStartTimeMillis());
        return form.getStartTimeMillis();
    }


    public Long getTimeRemaining(Long resultId) throws EntityNotFoundException, EntityRequiredAttributeNullException {
        log.info("Calculating time remaining for graph task result with id {}", resultId);
        GraphTaskResult graphTaskResult = graphTaskResultRepo.findGraphTaskResultById(resultId);
        if(graphTaskResult == null) {
            log.error("Graph task result with given id {} does not exist", resultId);
            throw new EntityNotFoundException("Graph task result with given id " + resultId + " does not exist");
        }
        if(graphTaskResult.getStartTimeMillis() == null) {
            log.error("Start time not set for graph task with id {}", resultId);
            throw new EntityRequiredAttributeNullException("Required attribute startTimeMillis is null for " +
                    "graph task result with id " + resultId);
        }
        GraphTask graphTask = graphTaskResult.getGraphTask();
        return timeCalculator.getTimeRemaining(graphTaskResult.getStartTimeMillis(), graphTask.getTimeToSolveMillis());
    }
}
