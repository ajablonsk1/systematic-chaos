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
import com.example.api.model.question.QuestionType;
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

    public Answer validateAndCreateAnswer(AnswerForm form, Question question) throws RequestValidationException {
        if (form == null) {
            log.error("Answer form cannot be null!");
            throw new RequestValidationException("Answer form cannot be null!");
        }
        QuestionType questionType = question.getType();
        Answer answer = new Answer();
        switch (questionType) {
            case OPENED -> {
                if (form.getOpenAnswer() == null) {
                    log.error("Opened answer for question type OPENED cannot be null!");
                    throw new RequestValidationException("Opened answer for question type OPENED cannot be null!");
                }
               answer.setOpenAnswer(form.getOpenAnswer());
            }
            case SINGLE_CHOICE -> {
                List<Long> optionIds = form.getOptionIds();
                if (optionIds == null || optionIds.size() != 1) {
                    log.error("Option ids for question type SINGLE_CHOICE has to contain one element and cannot be null!");
                    throw new RequestValidationException("Option ids for question type SINGLE_CHOICE has to contain one element and cannot be null!");
                }
                Long id = optionIds.get(0);
                Option option = optionRepo.findOptionById(id);
                if (option == null) {
                    log.error("Option with id {} not found in database!", id);
                    throw new EntityNotFoundException("Option with id " + id + " not found in database!");
                }
                answer.setOption(option);
            }
            case MULTIPLE_CHOICE -> {
                List<Long> optionIds = form.getOptionIds();
                if (optionIds == null) {
                    log.error("Option ids for question type SINGLE_CHOICE cannot be null!");
                    throw new RequestValidationException("Option ids for question type SINGLE_CHOICE cannot be null!");
                }
                List<Option> options = optionRepo.findAllById(optionIds);
                int optionSize = options.size();
                int optionIdsSize = optionIds.size();
                if (optionSize != optionIdsSize) {
                    log.error("All options should match the number of ids provided. Num of options: {}, ids: {}", optionSize, optionIdsSize);
                    throw new RequestValidationException("All options should match the number of ids provided. Num of options: " + optionSize + ", ids: " + optionIdsSize);
                }
                answer.setOptions(options);
            }
        }
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

    public void validateGraphTaskResultStatusIsChoose(GraphTaskResult result)
            throws RequestValidationException {
        if (result.getStatus() != ResultStatus.CHOOSE) {
            log.error("Wrong request body status! It should be {}", result.getStatus());
            throw new RequestValidationException("Wrong request body status! It should be " +  result.getStatus());
        }
    }

    public void validateGraphTaskResultStatusIsAnswer(GraphTaskResult result)
            throws RequestValidationException {
        if (result.getStatus() != ResultStatus.ANSWER) {
            log.error("Wrong request body status! It should be {}", result.getStatus());
            throw new RequestValidationException("Wrong request body status! It should be " +  result.getStatus());
        }
    }
}
