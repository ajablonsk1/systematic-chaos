package com.example.api.service.activity.feedback;


import com.example.api.dto.request.activity.feedback.SaveProfessorFeedbackForm;
import com.example.api.dto.response.activity.feedback.ProfessorFeedbackInfoResponse;
import com.example.api.dto.response.activity.task.util.FileResponse;
import com.example.api.error.exception.EntityNotFoundException;
import com.example.api.error.exception.MissingAttributeException;
import com.example.api.error.exception.WrongPointsNumberException;
import com.example.api.error.exception.WrongUserTypeException;
import com.example.api.model.activity.feedback.ProfessorFeedback;
import com.example.api.model.activity.result.FileTaskResult;
import com.example.api.model.activity.task.FileTask;
import com.example.api.model.user.User;
import com.example.api.model.util.File;
import com.example.api.repo.activity.feedback.ProfessorFeedbackRepo;
import com.example.api.repo.activity.result.FileTaskResultRepo;
import com.example.api.repo.activity.task.FileTaskRepo;
import com.example.api.repo.user.UserRepo;
import com.example.api.service.validator.ActivityValidator;
import com.example.api.service.validator.FeedbackValidator;
import com.example.api.service.validator.UserValidator;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.io.IOException;
import java.util.stream.Collectors;

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
    private final ActivityValidator activityValidator;
    private final UserValidator userValidator;

    public ProfessorFeedbackInfoResponse saveProfessorFeedback(ProfessorFeedback feedback)
            throws MissingAttributeException, EntityNotFoundException {
        return createInfoResponseFromProfessorFeedback(professorFeedbackRepo.save(feedback));
    }

    public ProfessorFeedbackInfoResponse saveProfessorFeedback(SaveProfessorFeedbackForm form)
            throws WrongUserTypeException, EntityNotFoundException, MissingAttributeException, WrongPointsNumberException {
        log.info("Saving professor feedback to database");
        ProfessorFeedback professorFeedback =
                feedbackValidator.validateAndSetProfessorFeedbackTaskForm(form);
        log.debug(professorFeedback.getContent());

        return createInfoResponseFromProfessorFeedback(professorFeedbackRepo.save(professorFeedback));
    }

    public ProfessorFeedback getProfessorFeedbackForFileTaskResult(Long id)
            throws EntityNotFoundException {
        log.info("Fetching professor feedback for file task result with id {}", id);
        FileTaskResult result = fileTaskResultRepo.findFileTaskResultById(id);
        activityValidator.validateTaskResultIsNotNull(result, id);
        return professorFeedbackRepo.findProfessorFeedbackByFileTaskResult(result);
    }

    public ProfessorFeedbackInfoResponse getProfessorFeedbackInfoForFileTaskResult(Long id)
            throws EntityNotFoundException, MissingAttributeException {
        return createInfoResponseFromProfessorFeedback(getProfessorFeedbackForFileTaskResult(id));

    }

    public ProfessorFeedback getProfessorFeedbackForFileTaskAndStudent(Long fileTaskId, String studentEmail)
            throws EntityNotFoundException, WrongUserTypeException {
        log.info("Fetching professor feedback for file task with id {} and student {}", fileTaskId, studentEmail);
        FileTask fileTask = fileTaskRepo.findFileTaskById(fileTaskId);
        activityValidator.validateActivityIsNotNull(fileTask, fileTaskId);
        User student = userRepo.findUserByEmail(studentEmail);
        userValidator.validateStudentAccount(student, studentEmail);
        FileTaskResult result = fileTaskResultRepo.findFileTaskResultByFileTaskAndUser(fileTask, student);
        activityValidator.validateTaskResultIsNotNull(result, student, fileTask);
        return professorFeedbackRepo.findProfessorFeedbackByFileTaskResult(result);
    }

    public ProfessorFeedbackInfoResponse getProfessorFeedbackInfoForFileTaskAndStudent(Long fileTaskId, String studentEmail)
            throws EntityNotFoundException, MissingAttributeException, WrongUserTypeException {
        return createInfoResponseFromProfessorFeedback(getProfessorFeedbackForFileTaskAndStudent(fileTaskId, studentEmail));
    }

    public Long deleteFileFromProfessorFeedback(DeleteFileFromProfessorFeedbackForm form)
            throws EntityNotFoundException, WrongUserTypeException {
        log.info("Deleting file from professor feedback for file task with id {} and student {}", form.getFileTaskId(), form.getStudentEmail());

        ProfessorFeedback feedback = getProfessorFeedbackForFileTaskAndStudent(form.getFileTaskId(), form.getStudentEmail());
        feedbackValidator.validateFeedback(feedback, form.getFileTaskId(), form.getStudentEmail(), form);
        feedback.getFeedbackFiles().remove(form.getIndex());
        professorFeedbackRepo.save(feedback);
        return feedback.getId();
    }

    public Long saveFileToProfessorFeedback(SaveFileToProfessorFeedbackForm form) throws EntityNotFoundException, MissingAttributeException, IOException, WrongUserTypeException {
        log.info("Adding file to professor feedback for file task with id {} and student {}", form.getFileTaskId(), form.getStudentEmail());

        ProfessorFeedback feedback = getProfessorFeedbackForFileTaskAndStudent(form.getFileTaskId(), form.getStudentEmail());
        feedbackValidator.validateFeedbackIsNotNull(feedback, form.getFileTaskId(), form.getStudentEmail());
        File file = new File(null, form.getFileName(), form.getFile().getBytes());
        fileRepo.save(file);
        feedback.getFeedbackFiles().add(file);
        return feedback.getId();
    }

    private ProfessorFeedbackInfoResponse createInfoResponseFromProfessorFeedback(
            ProfessorFeedback professorFeedback) throws MissingAttributeException, EntityNotFoundException {
        FileTaskResult fileTaskResult = professorFeedback.getFileTaskResult();
        User student = professorFeedback.getFileTaskResult().getUser();
        FileTask fileTask = professorFeedback.getFileTaskResult().getFileTask();
        feedbackValidator.validateFeedbackForInfoResponse(professorFeedback, fileTaskResult, student, fileTask);

        ProfessorFeedbackInfoResponse infoResponse = new ProfessorFeedbackInfoResponse();
        infoResponse.setFeedbackId(professorFeedback.getId());
        infoResponse.setFileTaskResultId(fileTaskResult.getId());
        infoResponse.setStudentEmail(student.getEmail());
        infoResponse.setFileTaskId(fileTask.getId());
        infoResponse.setTaskName(fileTask.getName());
        infoResponse.setDescription(fileTask.getDescription());
        infoResponse.setAnswer(fileTaskResult.getAnswer());
        infoResponse.setTaskFiles(fileTaskResult.getFiles()
                .stream()
                .map(FileResponse::new)
                .collect(Collectors.toList()));
        infoResponse.setPoints(fileTaskResult.getPointsReceived());
        infoResponse.setRemarks(professorFeedback.getContent());
        File feedbackFile = professorFeedback.getFeedbackFile();

        if (feedbackFile != null) {
            infoResponse.setFeedbackFile(new FileResponse(professorFeedback.getFeedbackFile()));
        }
        return infoResponse;
    }
}
