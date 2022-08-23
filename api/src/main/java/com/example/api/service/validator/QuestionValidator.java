package com.example.api.service.validator;

import com.example.api.error.exception.EntityNotFoundException;
import com.example.api.model.question.Question;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

@Component
@Slf4j
public class QuestionValidator {

    public void validateQuestionIsNotNull(Question question, Long id) throws EntityNotFoundException {
        if(question == null) {
            log.error("Question with id {} not found in database", id);
            throw new EntityNotFoundException("Question with id" + id + " not found in database");
        }
    }
}
