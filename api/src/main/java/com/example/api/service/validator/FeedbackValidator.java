package com.example.api.service.validator;

import com.example.api.dto.request.activity.feedback.SaveProfessorFeedbackForm;
import com.example.api.error.exception.EntityNotFoundException;
import com.example.api.error.exception.MissingAttributeException;
import com.example.api.error.exception.WrongPointsNumberException;
import com.example.api.error.exception.WrongUserTypeException;
import com.example.api.model.activity.feedback.ProfessorFeedback;
import com.example.api.model.activity.result.FileTaskResult;
import com.example.api.model.activity.result.SurveyResult;
import com.example.api.model.activity.task.FileTask;
import com.example.api.model.user.AccountType;
import com.example.api.model.user.User;
import com.example.api.model.util.File;
import com.example.api.repo.activity.feedback.ProfessorFeedbackRepo;
import com.example.api.repo.activity.result.FileTaskResultRepo;
import com.example.api.repo.user.UserRepo;
import com.example.api.repo.util.FileRepo;
import com.example.api.security.AuthenticationService;
import com.example.api.service.user.BadgeService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import javax.transaction.Transactional;
import java.io.IOException;

@Component
@Slf4j
@Transactional
@RequiredArgsConstructor
public class FeedbackValidator {
    private final ProfessorFeedbackRepo professorFeedbackRepo;
    private final FileTaskResultRepo fileTaskResultRepo;
    private final AuthenticationService authService;
    private final FileRepo fileRepo;
    private final UserRepo userRepo;
    private final BadgeService badgeService;

    /**
     * Function creates professor feedback for fileTaskResult. If feedback already exists its attributes
     * are set according to non-nullable parameters of given form. Content and points are overwritten
     * but files are added to list
    */
    public ProfessorFeedback validateAndSetProfessorFeedbackTaskForm(SaveProfessorFeedbackForm form)
            throws WrongUserTypeException, EntityNotFoundException, WrongPointsNumberException, IOException, MissingAttributeException {
        String professorEmail = authService.getAuthentication().getName();
        User professor = userRepo.findUserByEmail(professorEmail);
        if(professor == null) {
            log.error("User {} not found in database", professorEmail);
            throw new UsernameNotFoundException("User " + professorEmail + " not found in database");
        }
        if(professor.getAccountType() != AccountType.PROFESSOR) {
            throw new WrongUserTypeException("Wrong user type!", AccountType.PROFESSOR);
        }
        Long id = form.getFileTaskResultId();
        FileTaskResult fileTaskResult = fileTaskResultRepo.findFileTaskResultById(id);
        if(fileTaskResult == null) {
            log.error("File task result with id {} not found in database", id);
            throw new EntityNotFoundException("File task result with id " + id + " not found in database");
        }
        ProfessorFeedback feedback = professorFeedbackRepo.findProfessorFeedbackByFileTaskResult(fileTaskResult);

        if (feedback == null) {
            feedback = new ProfessorFeedback();
            feedback.setFrom(professor);
            feedback.setFileTaskResult(fileTaskResult);

        }
        if (form.getContent() != null) {
            feedback.setContent(form.getContent());
        }

        if(form.getPoints() != null) {
            if (form.getPoints() < 0 || form.getPoints() > fileTaskResult.getFileTask().getMaxPoints()) {
                throw new WrongPointsNumberException("Wrong points number", form.getPoints(), fileTaskResult.getFileTask().getMaxPoints());
            }
            feedback.setPoints(form.getPoints());
            fileTaskResult.setPointsReceived(form.getPoints());
            fileTaskResultRepo.save(fileTaskResult);
            badgeService.checkAllBadges();
        }

        // Feedback file can be set only once
        if(feedback.getFeedbackFile() == null && form.getFile() != null) {
            File file = new File(null, form.getFileName(), form.getFile().getBytes());
            fileRepo.save(file);
            feedback.setFeedbackFile(file);
        }

        fileTaskResult.setEvaluated(true);
        fileTaskResultRepo.save(fileTaskResult);
        return professorFeedbackRepo.save(feedback);
    }

    public void validateFeedbackIsNotNull(SurveyResult feedback, Long id, String email) throws EntityNotFoundException {
        if(feedback == null) {
            log.error("SurveyResult for survey with id {} and user {} not found in database", id, email);
            throw new EntityNotFoundException("SurveyResult for survey with id " + id + " and user " + email + " not found in database");
        }
    }

    public void validateFeedbackForInfoResponse(ProfessorFeedback professorFeedback,
                                                FileTaskResult fileTaskResult,
                                                User student,
                                                FileTask fileTask)
            throws EntityNotFoundException, MissingAttributeException {
        if (professorFeedback == null) {
            String msg = "Professor feedback doesn't exist";
            throw new EntityNotFoundException(msg);
        }
        if (fileTaskResult == null) {
            String msg = "Professor feedback with id " + professorFeedback.getId() + " is missing fileTaskResult attribute";
            throw new MissingAttributeException(msg);
        }
        if (student == null) {
            String msg = "Professor feedback with id " + professorFeedback.getId() + " is missing student attribute";
            throw new MissingAttributeException(msg);
        }
        if (fileTask == null) {
            String msg = "Professor feedback with id " + professorFeedback.getId() + " is missing fileTask attribute";
            throw new MissingAttributeException(msg);
        }
    }
}
