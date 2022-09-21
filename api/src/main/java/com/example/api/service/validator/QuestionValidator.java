package com.example.api.service.validator;

import com.example.api.error.exception.EntityNotFoundException;
import com.example.api.error.exception.RequestValidationException;
import com.example.api.model.activity.result.GraphTaskResult;
import com.example.api.model.question.Answer;
import com.example.api.model.question.Question;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@Slf4j
public class QuestionValidator {

    public void validateQuestionIsNotNull(Question question, Long id) throws EntityNotFoundException {
        if(question == null) {
            log.error("Question with id {} not found in database", id);
            throw new EntityNotFoundException("Question with id" + id + " not found in database");
        }
    }

    public void validateQuestionIsNotNullAndWasNotAnswered(Question question, Long id, GraphTaskResult result)
            throws RequestValidationException {
        validateQuestionIsNotNull(question, id);
        List<Answer> answers = result.getAnswers();
        if (!answers.isEmpty()) {
            List<Question> questions = answers.stream()
                    .map(Answer::getQuestion)
                    .toList();
            if (questions.contains(question)) {
                log.error("Question was already answered!");
                throw new RequestValidationException("Question was already answered!");
            }
        }
    }
}
