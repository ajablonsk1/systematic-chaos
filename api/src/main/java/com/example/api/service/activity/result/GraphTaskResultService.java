package com.example.api.service.activity.result;

import com.example.api.error.exception.EntityNotFoundException;
import com.example.api.error.exception.WrongAnswerTypeException;
import com.example.api.form.GraphTaskResultSaveForm;
import com.example.api.form.SetPointsForm;
import com.example.api.model.activity.result.GraphTaskResult;
import com.example.api.model.activity.task.GraphTask;
import com.example.api.model.question.Answer;
import com.example.api.model.question.QuestionType;
import com.example.api.model.user.User;
import com.example.api.repo.activity.result.GraphTaskResultRepo;
import com.example.api.repo.activity.task.GraphTaskRepo;
import com.example.api.repo.user.UserRepo;
import com.example.api.service.activity.result.util.PointsCalculator;
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
    private final PointsCalculator pointsCalculator;

    public GraphTaskResult saveGraphTaskResult(GraphTaskResultSaveForm form) throws EntityNotFoundException {
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
        List<Answer> answers = result.getAnswers()
                .stream()
                .filter(answer -> answer.getQuestion().getType() != QuestionType.OPENED)
                .toList();
        return pointsCalculator.calculatePointsInClosedQuestions(answers);
    }

    public Double getPointsFromOpenedQuestions(Long id) throws WrongAnswerTypeException, EntityNotFoundException {
        log.info("Calculating points from opened questions for graph task result with id {}", id);
        GraphTaskResult result = graphTaskResultRepo.findGraphTaskResultById(id);
        if(result == null) {
            log.error("Graph task result with given id {} does not exist", id);
            throw new EntityNotFoundException("Graph task result with given id " + id + " does not exist");
        }
        List<Answer> answers = result.getAnswers()
                .stream()
                .filter(answer -> answer.getQuestion().getType() == QuestionType.OPENED)
                .toList();
        return pointsCalculator.calculatePointsInOpenedQuestions(answers);
    }

    public Double addPointsManually(SetPointsForm form) throws EntityNotFoundException {
        Long id = form.getTaskId();
        log.info("Adding {} points to graph task result with id {}", form.getPoints(), id);
        GraphTaskResult result = graphTaskResultRepo.findGraphTaskResultById(id);
        if(result == null) {
            log.error("Graph task result with given id {} does not exist", id);
            throw new EntityNotFoundException("Graph task result with given id " + id + " does not exist");
        }
        result.setPointsReceived(result.getPointsReceived() + form.getPoints());
        return result.getPointsReceived();
    }

    public Double setPointsManually(SetPointsForm form) throws EntityNotFoundException {
        Long id = form.getTaskId();
        log.info("Setting {} points to graph task result with id {}", form.getPoints(), id);
        GraphTaskResult result = graphTaskResultRepo.findGraphTaskResultById(id);
        if(result == null) {
            log.error("Graph task result with given id {} does not exist", id);
            throw new EntityNotFoundException("Graph task result with given id " + id + " does not exist");
        }
        result.setPointsReceived(form.getPoints());
        return result.getPointsReceived();
    }
}
