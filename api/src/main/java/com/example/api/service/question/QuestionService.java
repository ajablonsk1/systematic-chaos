package com.example.api.service.question;

import com.example.api.dto.request.activity.result.AnswerForm;
import com.example.api.dto.request.activity.result.SetStatusForm;
import com.example.api.dto.response.activity.task.result.question.QuestionDetails;
import com.example.api.dto.response.activity.task.result.question.QuestionInfoResponse;
import com.example.api.dto.response.activity.task.result.question.QuestionList;
import com.example.api.error.exception.EntityNotFoundException;
import com.example.api.error.exception.EntityRequiredAttributeNullException;
import com.example.api.error.exception.RequestValidationException;
import com.example.api.model.activity.result.GraphTaskResult;
import com.example.api.model.activity.result.ResultStatus;
import com.example.api.model.activity.task.GraphTask;
import com.example.api.model.question.Answer;
import com.example.api.model.question.Question;
import com.example.api.repo.question.AnswerRepo;
import com.example.api.repo.question.QuestionRepo;
import com.example.api.security.AuthenticationService;
import com.example.api.service.activity.result.GraphTaskResultService;
import com.example.api.service.validator.QuestionValidator;
import com.example.api.service.validator.ResultValidator;
import com.example.api.service.validator.activity.ActivityValidator;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.util.Pair;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
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

    public Question saveQuestion(Question question) {
        return questionRepo.save(question);
    }

    public Question getQuestion(Long id) throws EntityNotFoundException {
        log.info("Fetching question with id {}", id);
        Question question = questionRepo.findQuestionById(id);
        questionValidator.validateQuestionIsNotNull(question, id);
        return question;
    }

    public Long setStatus(SetStatusForm form) throws RequestValidationException {
        String email = authService.getAuthentication().getName();
        ResultStatus status = form.getStatus();
        Long graphTaskId = form.getGraphTaskId();

        Pair<GraphTask, GraphTaskResult> graphTaskAndResultPair =
                graphTaskResultService.getGraphTaskAndResult(graphTaskId, email);
        GraphTaskResult result = graphTaskAndResultPair.getSecond();

        Long timeRemaining = graphTaskResultService.getTimeRemaining(result);
        if (timeRemaining < 0) {
            return timeRemaining;
        }

        switch (status) {
            case CHOOSE -> {
                resultValidator.validateGraphTaskResultStatusIsChoose(result, graphTaskId, email);
                Long questionId = form.getQuestionId();
                Question question = questionRepo.findQuestionById(questionId);
                questionValidator.validateQuestionIsNotNull(question, questionId);
                result.setCurrQuestion(question);
                return timeRemaining;
            }
            case ANSWER -> {
                resultValidator.validateGraphTaskResultStatusIsAnswer(result, graphTaskId, email);
                Answer answer = resultValidator.validateAndCreateAnswer(form.getAnswerForm());
                Question question = result.getCurrQuestion();
                answer.setQuestion(question);
                answerRepo.save(answer);
                result.getAnswers().add(answer);
                return timeRemaining;
            }
            default ->
                    throw new RequestValidationException("Status must be CHOOSE or ANSWER");
        }
    }

    public QuestionInfoResponse getQuestionInfo(Long graphTaskId) throws RequestValidationException {
        String email = authService.getAuthentication().getName();

        Pair<GraphTask, GraphTaskResult> graphTaskAndResultPair = graphTaskResultService.getGraphTaskAndResult(graphTaskId, email);

        GraphTask graphTask = graphTaskAndResultPair.getFirst();
        GraphTaskResult result = graphTaskAndResultPair.getSecond();

        ResultStatus status = result.getStatus();
        switch (status) {
            case CHOOSE -> {
                List<QuestionList> questionList = getNextQuestions(
                        graphTaskId,
                        graphTask,
                        result,
                        email
                );
                return new QuestionInfoResponse(
                        status,
                        graphTaskResultService.getTimeRemaining(result),
                        questionList,
                        null
                );
            }
            case ANSWER -> {
                Question question = result.getCurrQuestion();
                return new QuestionInfoResponse(
                        status,
                        graphTaskResultService.getTimeRemaining(result),
                        null,
                        new QuestionDetails(question)
                );
            }
            default ->
                    throw new EntityRequiredAttributeNullException("GraphTask must have status CHOOSE or ANSWER");
        }
    }

    private List<QuestionList> getNextQuestions(Long graphTaskId,
                                                GraphTask graphTask,
                                                GraphTaskResult result,
                                                String email) {
        log.info("Fetching next questions for graph task with id {} and user {}", graphTaskId, email);

        Question currQuestion = result.getCurrQuestion();
        List<Question> nextQuestions = currQuestion.getNext();

        return nextQuestions.stream()
                .map(QuestionList::new)
                .toList();
    }
}
