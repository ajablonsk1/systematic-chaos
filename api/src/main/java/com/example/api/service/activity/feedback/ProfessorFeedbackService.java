package com.example.api.service.activity.feedback;

import com.example.api.error.exception.EntityNotFoundException;
import com.example.api.error.exception.WrongBodyParametersNumberException;
import com.example.api.error.exception.WrongUserTypeException;
import com.example.api.model.activity.feedback.ProfessorFeedback;
import com.example.api.model.activity.result.FileTaskResult;
import com.example.api.model.activity.result.GraphTaskResult;
import com.example.api.model.user.AccountType;
import com.example.api.model.user.User;
import com.example.api.repo.activity.feedback.ProfessorFeedbackRepo;
import com.example.api.repo.activity.result.FileTaskResultRepo;
import com.example.api.repo.activity.result.GraphTaskResultRepo;
import com.example.api.repo.user.UserRepo;
import com.example.api.service.activity.feedback.form.SaveProfessorFeedbackForm;
import com.example.api.service.activity.feedback.util.FeedbackValidator;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class ProfessorFeedbackService {
    private final ProfessorFeedbackRepo professorFeedbackRepo;
    private final FeedbackValidator feedbackValidator;
    private final GraphTaskResultRepo graphTaskResultRepo;
    private final FileTaskResultRepo fileTaskResultRepo;

    public ProfessorFeedback saveProfessorFeedback(ProfessorFeedback feedback) {
        return professorFeedbackRepo.save(feedback);
    }

    public ProfessorFeedback saveProfessorFeedback(SaveProfessorFeedbackForm form) throws WrongUserTypeException, WrongBodyParametersNumberException {
        log.info("Saving professor feedback to database");
        ProfessorFeedback professorFeedback =
                feedbackValidator.validateAndSetProfessorFeedbackTaskForm(form);
        log.debug(professorFeedback.getContent());
        return professorFeedbackRepo.save(professorFeedback);
    }

    public ProfessorFeedback getProfessorFeedbackForGraphTask(Long id) throws EntityNotFoundException {
        log.info("Fetching professor feedback for graph task result with id {}", id);
        GraphTaskResult result = graphTaskResultRepo.findGraphTaskResultById(id);
        if(result == null) {
            log.error("Graph task result with given id {} does not exist", id);
            throw new EntityNotFoundException("Graph task result with given id " + id + " does not exist");
        }
        return professorFeedbackRepo.findProfessorFeedbackByGraphTaskResult(result);
    }

    public ProfessorFeedback getProfessorFeedbackForFileTask(Long id) throws EntityNotFoundException {
        log.info("Fetching professor feedback for file task result with id {}", id);
        FileTaskResult result = fileTaskResultRepo.findFileTaskResultById(id);
        if(result == null) {
            log.error("Graph task result with given id {} does not exist", id);
            throw new EntityNotFoundException("Graph task result with given id " + id + " does not exist");
        }
        return professorFeedbackRepo.findProfessorFeedbackByFileTaskResult(result);
    }
}
