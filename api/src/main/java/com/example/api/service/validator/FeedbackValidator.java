package com.example.api.service.validator;

import com.example.api.dto.request.activity.feedback.DeleteFileFromProfessorFeedbackForm;
import com.example.api.dto.request.activity.feedback.SaveProfessorFeedbackForm;
import com.example.api.error.exception.EntityNotFoundException;
import com.example.api.error.exception.MissingAttributeException;
import com.example.api.error.exception.WrongPointsNumberException;
import com.example.api.error.exception.WrongUserTypeException;
import com.example.api.model.activity.feedback.Feedback;
import com.example.api.model.activity.feedback.ProfessorFeedback;
import com.example.api.model.activity.feedback.UserFeedback;
import com.example.api.model.activity.result.FileTaskResult;
import com.example.api.model.activity.result.GraphTaskResult;
import com.example.api.model.activity.task.FileTask;
import com.example.api.model.user.AccountType;
import com.example.api.model.user.User;
import com.example.api.repo.activity.feedback.ProfessorFeedbackRepo;
import com.example.api.repo.activity.result.FileTaskResultRepo;
import com.example.api.repo.user.UserRepo;
import com.example.api.repo.util.FileRepo;
import com.example.api.security.AuthenticationService;
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
    private final UserRepo userRepo;

    /**
     * Function creates professor feedback for fileTaskResult. If feedback already exists its attributes
     * are set according to non-nullable parameters of given form. Content and points are overwritten
     * but files are added to list
    */
    public ProfessorFeedback validateAndSetProfessorFeedbackTaskForm(SaveProfessorFeedbackForm form)
            throws WrongUserTypeException, EntityNotFoundException, WrongPointsNumberException {
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
        }

        fileTaskResult.setEvaluated(true);
        fileTaskResultRepo.save(fileTaskResult);
        return professorFeedbackRepo.save(feedback);
    }

    public void validateFeedbackIsNotNull(Feedback feedback, Long id) throws EntityNotFoundException {
        if(feedback == null) {
            log.error("Feedback with id {} not found in database", id);
            throw new EntityNotFoundException("Feedback with id" + id + " not found in database");
        }
    }

    public void validateFeedbackIsNotNull(Feedback feedback, FileTaskResult result) throws EntityNotFoundException {
        if(feedback == null) {
            log.error("Feedback for graph task result with id {} not found in database", result.getId());
            throw new EntityNotFoundException("Feedback for graph task result with id " + result.getId() + " not found in database");
        }
    }

    public void validateFeedbackIsNotNull(Feedback feedback, Long id, String email) throws EntityNotFoundException {
        if(feedback == null) {
            log.error("Feedback for file task with id {} and user {} not found in database", id, email);
            throw new EntityNotFoundException("Feedback for file task with id " + id + " and user " + email + " not found in database");
        }
    }

    public void validateFeedback(ProfessorFeedback feedback, Long id, String email, DeleteFileFromProfessorFeedbackForm form) throws EntityNotFoundException {
        if(feedback == null) {
            log.error("Feedback for file task with id {} and user {} not found in database", id, email);
            throw new EntityNotFoundException("Feedback for file task with id " + id + " and user " + email + " not found in database");
        }
        if(feedback.getFeedbackFiles().size() <= form.getIndex()) {
            log.error("Wrong index {} for deleting file from ProfessorFeedback for FileTask with id {} and student {}",
                    form.getIndex(), form.getFileTaskId(), form.getStudentEmail());
            throw new EntityNotFoundException("Wrong index " + form.getIndex()  +
                    " for deleting file from ProfessorFeedback for FileTask with id " + form.getFileTaskId() +
                    " and student " + form.getStudentEmail());
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
