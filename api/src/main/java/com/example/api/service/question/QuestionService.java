package com.example.api.service.question;

import com.example.api.error.exception.EntityNotFoundException;
import com.example.api.model.question.Question;
import com.example.api.repo.question.QuestionRepo;
import com.example.api.service.validator.QuestionValidator;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class QuestionService {
    private final QuestionRepo questionRepo;
    private final QuestionValidator questionValidator;

    public Question saveQuestion(Question question) {
        return questionRepo.save(question);
    }

    public Question getQuestion(Long id) throws EntityNotFoundException {
        log.info("Fetching question with id {}", id);
        Question question = questionRepo.findQuestionById(id);
        questionValidator.validateQuestionIsNotNull(question, id);
        return question;
    }

    public List<Question> getNextQuestions(Long id) throws EntityNotFoundException {
        log.info("Fetching next questions for question with id {}", id);
        Question question = questionRepo.findQuestionById(id);
        questionValidator.validateQuestionIsNotNull(question, id);
        return question.getNext();
    }
}
