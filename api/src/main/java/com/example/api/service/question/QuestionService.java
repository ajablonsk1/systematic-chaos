package com.example.api.service.question;

import com.example.api.dto.request.activity.result.QuestionActionForm;
import com.example.api.dto.response.activity.task.result.question.QuestionDetails;
import com.example.api.dto.response.activity.task.result.question.QuestionInfoResponse;
import com.example.api.dto.response.activity.task.result.question.QuestionList;
import com.example.api.error.exception.EntityNotFoundException;
import com.example.api.error.exception.EntityRequiredAttributeNullException;
import com.example.api.error.exception.ExceptionMessage;
import com.example.api.error.exception.RequestValidationException;
import com.example.api.model.activity.result.GraphTaskResult;
import com.example.api.model.activity.result.ResultStatus;
import com.example.api.model.question.Answer;
import com.example.api.model.question.Question;
import com.example.api.repo.question.AnswerRepo;
import com.example.api.repo.question.QuestionRepo;
import com.example.api.security.AuthenticationService;
import com.example.api.service.activity.result.GraphTaskResultService;
import com.example.api.service.user.BadgeService;
import com.example.api.service.validator.QuestionValidator;
import com.example.api.service.validator.ResultValidator;
import com.example.api.util.calculator.PointsCalculator;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.naming.TimeLimitExceededException;
import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.LinkedList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class QuestionService {
    private final QuestionRepo questionRepo;
    private final AnswerRepo answerRepo;
    private final QuestionValidator questionValidator;
    private final ResultValidator resultValidator;
    private final AuthenticationService authService;
    private final GraphTaskResultService graphTaskResultService;
    private final BadgeService badgeService;
    private final PointsCalculator pointsCalculator;

    public Question saveQuestion(Question question) {
        return questionRepo.save(question);
    }

    public Question getQuestion(Long id) throws EntityNotFoundException {
        log.info("Fetching question with id {}", id);
        Question question = questionRepo.findQuestionById(id);
        questionValidator.validateQuestionIsNotNull(question, id);
        return question;
    }

    public Long performQuestionAction(QuestionActionForm form) throws RequestValidationException, TimeLimitExceededException {
        String email = authService.getAuthentication().getName();
        ResultStatus status = form.getStatus();
        Long graphTaskId = form.getGraphTaskId();

        GraphTaskResult result = graphTaskResultService.getGraphTaskResult(graphTaskId, email);

        Long timeRemaining = graphTaskResultService.getTimeRemaining(result);
        if (timeRemaining < 0) {
            throw new TimeLimitExceededException(ExceptionMessage.TIME_REMAINING_IS_UP);
        }

        switch (status) {
            case CHOOSE -> {
                resultValidator.validateGraphTaskResultStatusIsChoose(result);
                Long questionId = form.getQuestionId();
                Question question = questionRepo.findQuestionById(questionId);
                questionValidator.validateQuestionIsNotNull(question, questionId);
                result.setSendDateMillis(System.currentTimeMillis());
                result.setCurrQuestion(question);
                result.setStatus(ResultStatus.ANSWER);
                return timeRemaining;
            }
            case ANSWER -> {
                resultValidator.validateGraphTaskResultStatusIsAnswer(result);
                Question question = result.getCurrQuestion();
                Answer answer = resultValidator.validateAndCreateAnswer(form.getAnswerForm(), question);
                answer.setQuestion(question);
                answerRepo.save(answer);
                result.setSendDateMillis(System.currentTimeMillis());
                result.getAnswers().add(answer);
                result.setStatus(ResultStatus.CHOOSE);

                // counting current state of points
                double allPoints = pointsCalculator.calculateAllPoints(result);
                result.setPointsReceivedAndCheckBadges(allPoints, badgeService);
                
                // if it's the last question, set finished
                List<Question> nextQuestions = question.getNext();
                if(nextQuestions.size() == 0){
                    result.setFinished(true);
                    log.info("Expedition finished");
                }

                return timeRemaining;
            }
            default ->
                    throw new RequestValidationException("Status must be CHOOSE or ANSWER");
        }
    }

    public QuestionInfoResponse getQuestionInfo(Long graphTaskId) throws RequestValidationException {
        String email = authService.getAuthentication().getName();
        GraphTaskResult result = graphTaskResultService.getGraphTaskResult(graphTaskId, email);
        ResultStatus status = result.getStatus();

        switch (status) {
            case CHOOSE -> {
                List<QuestionList> questionList = getNextQuestions(
                        graphTaskId,
                        result,
                        email
                );
                return new QuestionInfoResponse(
                        status,
                        graphTaskResultService.getTimeRemaining(result),
                        pointsCalculator.calculateAllPoints(result),
                        questionList,
                        null,
                        result.isFinished(),
                        getGraphTaskResultPath(result)
                );
            }
            case ANSWER -> {
                Question question = result.getCurrQuestion();
                return new QuestionInfoResponse(
                        status,
                        graphTaskResultService.getTimeRemaining(result),
                        pointsCalculator.calculateAllPoints(result),
                        null,
                        new QuestionDetails(question),
                        result.isFinished(),
                        getGraphTaskResultPath(result)
                );
            }
            default ->
                    throw new EntityRequiredAttributeNullException("GraphTask must have status CHOOSE or ANSWER");
        }
    }

    private List<QuestionList> getNextQuestions(Long graphTaskId,
                                                GraphTaskResult result,
                                                String email) {
        log.info("Fetching next questions for graph task with id {} and user {}", graphTaskId, email);

        Question currQuestion = result.getCurrQuestion();
        List<Question> nextQuestions = currQuestion.getNext();

        return nextQuestions.stream()
                .map(QuestionList::new)
                .toList();
    }

    private List<Long> getGraphTaskResultPath(GraphTaskResult result) {
        Long startQuestionID = result.getGraphTask().getQuestions().get(0).getId();
        List<Long> path = result.getAnswers()
                .stream()
                .map(answer -> answer.getQuestion().getId())
                .toList();
        List<Long> fullPath = new LinkedList<>();
        fullPath.add(startQuestionID);
        fullPath.addAll(path);
        fullPath.add(result.getCurrQuestion().getId());
        return new ArrayList<>(new HashSet<>(fullPath)); // removing duplicates
    }
}
