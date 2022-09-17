package com.example.api.service.validator;

import com.example.api.dto.request.activity.result.AnswerForm;
import com.example.api.error.exception.EntityAlreadyInDatabaseException;
import com.example.api.error.exception.EntityNotFoundException;
import com.example.api.error.exception.RequestValidationException;
import com.example.api.model.activity.result.GraphTaskResult;
import com.example.api.model.activity.result.ResultStatus;
import com.example.api.model.activity.result.TaskResult;
import com.example.api.model.question.Answer;
import com.example.api.model.question.Option;
import com.example.api.model.question.Question;
import com.example.api.repo.question.OptionRepo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.util.List;

@Slf4j
@Component
@RequiredArgsConstructor
public class ResultValidator {
    private final OptionRepo optionRepo;

    public Answer validateAndCreateAnswer(AnswerForm form) {
        Answer answer = new Answer();
        List<Long> ids = form.getOptionIds();
        List<Option> options = optionRepo.findAllById(ids);
        if (options.size() > 1) {
            answer.setOptions(options);
        } else if (options.size() == 1) {
            answer.setOption(options.get(0));
        }
        answer.setOpenAnswer(form.getOpenAnswer());
        return answer;
    }

    public void validateGraphTaskResultIsNotInDatabase(GraphTaskResult result, Long id, String email)
            throws EntityAlreadyInDatabaseException {
        if (result != null) {
            log.error("GraphTaskResult for GraphTask with id {} and user {} already exists", id, email);
            throw new EntityAlreadyInDatabaseException("GraphTaskResult for GraphTask with id " + id +
                    " and user " + email + " already exists");
        }
    }

    public void validateResultIsNotNull(TaskResult result, Long id, String email) throws EntityNotFoundException {
        if (result == null) {
            log.error("GraphTaskResult for GraphTask with id {} and user {} not found", id, email);
            throw new EntityNotFoundException("GraphTaskResult for GraphTask with id " + id +
                    " and user " + email + " not found");
        }
    }

    public void validateGraphTaskResultIsNotNullAndStatusIsChoose(GraphTaskResult result, Long id, String email)
            throws RequestValidationException {
        validateResultIsNotNull(result, id, email);
        if (result.getStatus() != ResultStatus.CHOOSE) {
            log.error("GraphTaskResult with id {} should has CHOOSE status", result.getId());
            throw new RequestValidationException("GraphTaskResult with id " + result.getId() + " should has CHOOSE status");
        }
    }

    public void validateGraphTaskResultIsNotNullAndStatusIsAnswer(GraphTaskResult result, Long id, String email)
            throws RequestValidationException {
        validateResultIsNotNull(result, id, email);
        if (result.getStatus() != ResultStatus.ANSWER) {
            log.error("GraphTaskResult with id {} should has ANSWER status", result.getId());
            throw new RequestValidationException("GraphTaskResult with id " + result.getId() + " should has ANSWER status");
        }
    }
}
