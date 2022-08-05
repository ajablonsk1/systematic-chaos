package com.example.api.service.activity.feedback;

import com.example.api.dto.request.activity.feedback.DeleteFileFromProfessorFeedback;
import com.example.api.dto.request.activity.feedback.SaveProfessorFeedbackForm;
import com.example.api.dto.response.task.feedback.ProfessorFeedbackInfoResponse;
import com.example.api.error.exception.EntityNotFoundException;
import com.example.api.error.exception.MissingProfessorFeedbackAttributeException;
import com.example.api.error.exception.WrongPointsNumberException;
import com.example.api.error.exception.WrongUserTypeException;
import com.example.api.model.activity.feedback.ProfessorFeedback;
import com.example.api.model.activity.result.FileTaskResult;
import com.example.api.model.activity.task.FileTask;
import com.example.api.model.user.User;
import com.example.api.repo.activity.feedback.ProfessorFeedbackRepo;
import com.example.api.repo.activity.result.FileTaskResultRepo;
import com.example.api.repo.activity.task.FileTaskRepo;
import com.example.api.repo.user.UserRepo;
import com.example.api.service.validator.FeedbackValidator;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.io.IOException;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class ProfessorFeedbackService {
    private final ProfessorFeedbackRepo professorFeedbackRepo;
    private final FeedbackValidator feedbackValidator;
    private final FileTaskResultRepo fileTaskResultRepo;
    private final FileTaskRepo fileTaskRepo;
    private final UserRepo userRepo;

    public ProfessorFeedbackInfoResponse saveProfessorFeedback(ProfessorFeedback feedback) throws MissingProfessorFeedbackAttributeException, EntityNotFoundException {
        return new ProfessorFeedbackInfoResponse(professorFeedbackRepo.save(feedback));
    }

    public ProfessorFeedbackInfoResponse saveProfessorFeedback(SaveProfessorFeedbackForm form) throws WrongUserTypeException, EntityNotFoundException, IOException, MissingProfessorFeedbackAttributeException, WrongPointsNumberException {
        log.info("Saving professor feedback to database");
        ProfessorFeedback professorFeedback =
                feedbackValidator.validateAndSetProfessorFeedbackTaskForm(form);
        log.debug(professorFeedback.getContent());

        return new ProfessorFeedbackInfoResponse(professorFeedbackRepo.save(professorFeedback));
    }

    public ProfessorFeedbackInfoResponse getProfessorFeedbackForFileTaskResult(Long id) throws EntityNotFoundException, MissingProfessorFeedbackAttributeException {
        log.info("Fetching professor feedback for file task result with id {}", id);
        FileTaskResult result = fileTaskResultRepo.findFileTaskResultById(id);
        if(result == null) {
            log.error("File task result with given id {} does not exist", id);
            throw new EntityNotFoundException("File task result with given id " + id + " does not exist");
        }
        return new ProfessorFeedbackInfoResponse(professorFeedbackRepo.findProfessorFeedbackByFileTaskResult(result));
    }

    public ProfessorFeedbackInfoResponse getProfessorFeedbackForFileTaskAndStudent(Long fileTaskId, String studentEmail) throws EntityNotFoundException, MissingProfessorFeedbackAttributeException {
        log.info("Fetching professor feedback for file task with id {} and student {}", fileTaskId, studentEmail);
        FileTask fileTask = fileTaskRepo.findFileTaskById(fileTaskId);
        if(fileTask == null) {
            log.error("File task with given id {} does not exist", fileTaskId);
            throw new EntityNotFoundException("File task with given id " + fileTaskId + " does not exist");
        }
        User student = userRepo.findUserByEmail(studentEmail);
        if(student == null) {
            log.error("Student with given email {} does not exist", fileTaskId);
            throw new UsernameNotFoundException("Student with given email " + studentEmail + "does not exist");
        }
        FileTaskResult result = fileTaskResultRepo.findFileTaskResultByFileTaskAndUser(fileTask, student);
        if(result == null) {
            log.error("File task result for task with id {} and student {} does not exist", fileTask, studentEmail);
            throw new EntityNotFoundException("File task result for task with id " + fileTaskId +
                    " and student " + studentEmail + " does not exist");
        }
        return new ProfessorFeedbackInfoResponse(professorFeedbackRepo.findProfessorFeedbackByFileTaskResult(result));
    }

    public Long deleteFileFromProfessorFeedback(DeleteFileFromProfessorFeedback form) throws EntityNotFoundException, MissingProfessorFeedbackAttributeException {
        log.info("Deleting file from professor feedback for file task with id {} and student {}", form.getFileTaskId(), form.getStudentEmail());

        ProfessorFeedbackInfoResponse feedbackInfo = getProfessorFeedbackForFileTaskAndStudent(form.getFileTaskId(), form.getStudentEmail());
        ProfessorFeedback feedback = professorFeedbackRepo.findProfessorFeedbackById(feedbackInfo.getFeedbackId());
        if(feedback == null) {
            log.error("Feedback for FileTaskResult with given id {} does not exist", form.getFileTaskId());
            throw new EntityNotFoundException("Feedback for FileTaskResult with given id " + form.getFileTaskId()  + " does not exist");
        }

        if(feedback.getFeedbackFiles().size() <= form.getIndex()) {
            log.error("Wrong index {} for deleting file from ProfessorFeedback for FileTask with id {} and student {}",
                    form.getIndex(), form.getFileTaskId(), form.getStudentEmail());
            throw new EntityNotFoundException("Wrong index " + form.getIndex()  +
                    " for deleting file from ProfessorFeedback for FileTask with id " + form.getFileTaskId() +
                    " and student " + form.getStudentEmail());
        }

        feedback.getFeedbackFiles().remove(form.getIndex());
        professorFeedbackRepo.save(feedback);
        return feedback.getId();
    }
}
