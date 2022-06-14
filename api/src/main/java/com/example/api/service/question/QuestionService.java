package com.example.api.service.question;

import com.example.api.error.exception.EntityNotFoundException;
import com.example.api.model.question.Question;
import com.example.api.repo.question.QuestionRepo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class QuestionService {
    private final QuestionRepo questionRepo;

    public Question saveQuestion(Question question) {
        return questionRepo.save(question);
    }

    public Question getQuestion(Long id) throws EntityNotFoundException {
        Question question = questionRepo.findQuestionById(id);
        if(question == null) {
            log.error("Question with id {} not found in database", id);
            throw new EntityNotFoundException("Question with id" + id + " not found in database");
        }
        return question;
    }

    public List<Question> getNextQuestions(Long id) throws EntityNotFoundException {
        Question question = questionRepo.findQuestionById(id);
        if(question == null) {
            log.error("Question with id {} not found in database", id);
            throw new EntityNotFoundException("Question with id" + id + " not found in database");
        }
        return question.getNext();
    }
}
