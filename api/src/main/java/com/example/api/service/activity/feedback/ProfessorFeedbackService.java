package com.example.api.service.activity.feedback;


import com.example.api.dto.request.activity.feedback.SaveProfessorFeedbackForm;
import com.example.api.dto.response.task.feedback.ProfessorFeedbackInfoResponse;
import com.example.api.dto.response.task.util.FileResponse;
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
import com.example.api.service.validator.FeedbackValidator;
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

    public ProfessorFeedbackInfoResponse saveProfessorFeedback(ProfessorFeedback feedback) throws MissingAttributeException, EntityNotFoundException {
        return createInfoResponseFromProfessorFeedback(professorFeedbackRepo.save(feedback));
    }

    public ProfessorFeedbackInfoResponse saveProfessorFeedback(SaveProfessorFeedbackForm form) throws WrongUserTypeException, EntityNotFoundException, IOException, MissingAttributeException, WrongPointsNumberException {
        log.info("Saving professor feedback to database");
        ProfessorFeedback professorFeedback =
                feedbackValidator.validateAndSetProfessorFeedbackTaskForm(form);
        log.debug(professorFeedback.getContent());

        return createInfoResponseFromProfessorFeedback(professorFeedbackRepo.save(professorFeedback));
    }

    public ProfessorFeedback getProfessorFeedbackForFileTaskResult(Long id) throws EntityNotFoundException, MissingAttributeException {
        log.info("Fetching professor feedback for file task result with id {}", id);
        FileTaskResult result = fileTaskResultRepo.findFileTaskResultById(id);
        if(result == null) {
            log.error("File task result with given id {} does not exist", id);
            throw new EntityNotFoundException("File task result with given id " + id + " does not exist");
        }
        return professorFeedbackRepo.findProfessorFeedbackByFileTaskResult(result);
    }

    public ProfessorFeedbackInfoResponse getProfessorFeedbackInfoForFileTaskResult(Long id) throws EntityNotFoundException, MissingAttributeException {
        return createInfoResponseFromProfessorFeedback(getProfessorFeedbackForFileTaskResult(id));

    }

    public ProfessorFeedback getProfessorFeedbackForFileTaskAndStudent(Long fileTaskId, String studentEmail) throws EntityNotFoundException, MissingAttributeException {
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
        return professorFeedbackRepo.findProfessorFeedbackByFileTaskResult(result);
    }

    public ProfessorFeedbackInfoResponse getProfessorFeedbackInfoForFileTaskAndStudent(Long fileTaskId, String studentEmail) throws EntityNotFoundException, MissingAttributeException  {
        return createInfoResponseFromProfessorFeedback(getProfessorFeedbackForFileTaskAndStudent(fileTaskId, studentEmail));
    }

    private ProfessorFeedbackInfoResponse createInfoResponseFromProfessorFeedback(
            ProfessorFeedback professorFeedback) throws MissingAttributeException, EntityNotFoundException {
        if (professorFeedback == null) {
            String msg = "Professor feedback doesn't exist";
            throw new EntityNotFoundException(msg);
        }
        FileTaskResult fileTaskResult = professorFeedback.getFileTaskResult();
        if (fileTaskResult == null) {
            String msg = "Professor feedback with id " + professorFeedback.getId() + " is missing fileTaskResult attribute";
            throw new MissingAttributeException(msg);
        }
        User student = professorFeedback.getFileTaskResult().getUser();
        if (student == null) {
            String msg = "Professor feedback with id " + professorFeedback.getId() + " is missing student attribute";
            throw new MissingAttributeException(msg);
        }
        FileTask fileTask = professorFeedback.getFileTaskResult().getFileTask();
        if (fileTask == null) {
            String msg = "Professor feedback with id " + professorFeedback.getId() + " is missing fileTask attribute";
            throw new MissingAttributeException(msg);
        }

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
