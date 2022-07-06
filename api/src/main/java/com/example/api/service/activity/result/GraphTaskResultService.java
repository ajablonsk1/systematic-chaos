package com.example.api.service.activity.result;

import com.example.api.dto.request.activity.result.AddAnswerToGraphTaskForm;
import com.example.api.dto.request.activity.result.SaveGraphTaskResultForm;
import com.example.api.dto.request.activity.result.SetTimeSpentForm;
import com.example.api.error.exception.EntityNotFoundException;
import com.example.api.error.exception.WrongAnswerTypeException;
import com.example.api.error.exception.WrongBodyParametersNumberException;
import com.example.api.error.exception.WrongUserTypeException;
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
import com.example.api.service.validator.AnswerFormValidator;
import com.example.api.service.activity.result.util.PointsCalculator;
import com.example.api.service.validator.UserValidator;
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
    private final PointsCalculator pointsCalculator;
    private final AnswerFormValidator answerFormValidator;
    private final AnswerRepo answerRepo;
    private final UserValidator userValidator;

    public GraphTaskResult getGraphTaskResult(Long graphTaskResultId, String email)
            throws WrongUserTypeException, EntityNotFoundException {
        User student = userRepo.findUserByEmail(email);
        userValidator.validateStudentAccount(student, email);
        GraphTask task = graphTaskRepo.findGraphTaskById(graphTaskResultId);
        if(task == null) {
            log.error("Graph task with given id {} does not exist", graphTaskResultId);
            throw new EntityNotFoundException("Graph task with given id " + graphTaskResultId + " does not exist");
        }
        return graphTaskResultRepo.findGraphTaskResultByGraphTaskAndUser(task, student);
    }

    public GraphTaskResult saveGraphTaskResult(GraphTaskResult result) {
        return graphTaskResultRepo.save(result);
    }

    public GraphTaskResult saveGraphTaskResult(SaveGraphTaskResultForm form) throws EntityNotFoundException {
        log.info("Saving graph task result");
        Long id = form.getGraphTaskId();
        GraphTask graphTask = graphTaskRepo.findGraphTaskById(id);
        if(graphTask == null) {
            log.error("Graph task with given id {} does not exist", id);
            throw new EntityNotFoundException("Graph task with given id " + id + " does not exist");
        }
        String email = form.getUserEmail();
        User user = userRepo.findUserByEmail(email);
        if(user == null) {
            log.error("User {} not found in database", email);
            throw new EntityNotFoundException("User" + email + " not found in database");
        }
        GraphTaskResult graphTaskResult = new GraphTaskResult();
        graphTaskResult.setGraphTask(graphTask);
        graphTaskResult.setUser(user);
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

    public Answer addAnswerToGraphTaskResult(AddAnswerToGraphTaskForm form) throws EntityNotFoundException, WrongBodyParametersNumberException {
        Long id = form.getResultId();
        log.info("Saving answer to database for task result with id {}", id);
        GraphTaskResult graphTaskResult = graphTaskResultRepo.findGraphTaskResultById(id);
        if(graphTaskResult == null) {
            log.error("Graph task result with given id {} does not exist", id);
            throw new EntityNotFoundException("Graph task result with given id  does not exist");
        }
        Answer answer = answerFormValidator.validateAndCreateAnswer(form.getAnswerForm());
        Question question = questionRepo.findQuestionById(form.getQuestionId());
        answer.setQuestion(question);
        answerRepo.save(answer);
        graphTaskResult.getAnswers().add(answer);
        return answer;
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
        result.setTimeSpent(timeSpent);
        return timeSpent;
    }
}
