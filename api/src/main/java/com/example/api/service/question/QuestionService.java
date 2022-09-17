package com.example.api.service.question;

import com.example.api.dto.response.activity.task.result.question.QuestionInfo;
import com.example.api.dto.response.activity.task.result.question.QuestionResponse;
import com.example.api.error.exception.EntityNotFoundException;
import com.example.api.error.exception.RequestValidationException;
import com.example.api.model.activity.result.GraphTaskResult;
import com.example.api.model.activity.result.ResultStatus;
import com.example.api.model.activity.task.GraphTask;
import com.example.api.model.question.Answer;
import com.example.api.model.question.Question;
import com.example.api.repo.question.QuestionRepo;
import com.example.api.security.AuthenticationService;
import com.example.api.service.activity.result.GraphTaskResultService;
import com.example.api.service.validator.QuestionValidator;
import com.example.api.service.validator.ResultValidator;
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

    public List<QuestionResponse> getNextQuestions(Long graphTaskId) throws RequestValidationException {
        String email = authService.getAuthentication().getName();
        log.info("Fetching next questions for graph task with id {} and user {}", graphTaskId, email);

        Pair<GraphTask, GraphTaskResult> pair = graphTaskResultService.getGraphTaskAndResult(graphTaskId, email);
        GraphTask graphTask = pair.getFirst();

        GraphTaskResult result = pair.getSecond();
        resultValidator.validateGraphTaskResultIsNotNullAndStatusIsChoose(result, graphTaskId, email);

        List<Answer> answers = result.getAnswers();
        List<Question> nextQuestions = new LinkedList<>();
        if (answers.isEmpty()) {
            Question firstQuestion = graphTask.getQuestions().get(0);
            nextQuestions.addAll(firstQuestion.getNext());
        } else {
            Answer currAnswer = answers.get(answers.size() - 1);
            Question currQuestion = currAnswer.getQuestion();
            nextQuestions.addAll(currQuestion.getNext());
        }
        return nextQuestions.stream()
                .map(QuestionResponse::new)
                .toList();
    }

    public QuestionInfo getQuestionInfo(Long questionId, Long graphTaskId) throws RequestValidationException {
        String email = authService.getAuthentication().getName();
        log.info("Fetching questions info for question with id {}", questionId);

        Pair<GraphTask, GraphTaskResult> pair = graphTaskResultService.getGraphTaskAndResult(graphTaskId, email);
        GraphTaskResult result = pair.getSecond();

        Question question = questionRepo.findQuestionById(questionId);
        questionValidator.validateQuestionIsNotNullAndWasNotAnswered(question, questionId, result);

        result.setStatus(ResultStatus.ANSWER);
        return new QuestionInfo(question, graphTaskResultService.getTimeRemaining(result));
    }
}
