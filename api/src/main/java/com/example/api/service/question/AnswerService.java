package com.example.api.service.question;

import com.example.api.error.exception.EntityNotFoundException;
import com.example.api.form.AnswerGraphTaskForm;
import com.example.api.model.activity.result.GraphTaskResult;
import com.example.api.model.question.Answer;
import com.example.api.repo.activity.result.GraphTaskResultRepo;
import com.example.api.repo.question.AnswerRepo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class AnswerService {
    private final AnswerRepo answerRepo;
    private final GraphTaskResultRepo graphTaskResultRepo;


    public Answer saveAnswer(AnswerGraphTaskForm form) throws EntityNotFoundException {
        Long id = form.getGraphTaskId();
        log.info("Saving answer to database for task result with id {}", id);
        GraphTaskResult graphTaskResult = graphTaskResultRepo.findGraphTaskResultById(id);
        if(graphTaskResult == null) {
            log.error("Graph task result with given id {} does not exist", id);
            throw new EntityNotFoundException("Graph task result with given id  does not exist");
        }
        Answer answer = form.getAnswer();
        graphTaskResult.getAnswers().add(answer);
        return answerRepo.save(answer);
    }
}
