package com.example.api.service.activity.task;

import com.example.api.dto.request.activity.task.create.CreateFileTaskForm;
import com.example.api.dto.response.activity.task.FileTaskInfoResponse;
import com.example.api.dto.response.activity.task.util.FileResponse;
import com.example.api.error.exception.EntityNotFoundException;
import com.example.api.error.exception.WrongUserTypeException;
import com.example.api.model.activity.feedback.ProfessorFeedback;
import com.example.api.model.activity.result.FileTaskResult;
import com.example.api.model.activity.task.FileTask;
import com.example.api.model.user.User;
import com.example.api.repo.activity.feedback.ProfessorFeedbackRepo;
import com.example.api.repo.activity.result.FileTaskResultRepo;
import com.example.api.repo.activity.task.FileTaskRepo;
import com.example.api.repo.user.UserRepo;
import com.example.api.security.AuthenticationService;
import com.example.api.service.validator.ActivityValidator;
import com.example.api.service.validator.FeedbackValidator;
import com.example.api.service.validator.UserValidator;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class FileTaskService {
    private final FileTaskRepo fileTaskRepo;
    private final FileTaskResultRepo fileTaskResultRepo;
    private final ProfessorFeedbackRepo professorFeedbackRepo;
    private final UserRepo userRepo;
    private final UserValidator userValidator;
    private final AuthenticationService authService;
    private final ActivityValidator activityValidator;
    private final FeedbackValidator feedbackValidator;

    public FileTask saveFileTask(FileTask fileTask) {
        return fileTaskRepo.save(fileTask);
    }

    public FileTaskInfoResponse getFileTaskInfo(Long id) throws EntityNotFoundException, WrongUserTypeException {
        String email = authService.getAuthentication().getName();
        FileTaskInfoResponse result = new FileTaskInfoResponse();
        FileTask fileTask = fileTaskRepo.findFileTaskById(id);
        activityValidator.validateActivityIsNotNull(fileTask, id);
        result.setFileTaskId(fileTask.getId());
        result.setName(fileTask.getTitle());
        result.setDescription(fileTask.getDescription());

        User student = userRepo.findUserByEmail(email);
        userValidator.validateStudentAccount(student, email);
        FileTaskResult fileTaskResult = fileTaskResultRepo.findFileTaskResultByFileTaskAndUser(fileTask, student);
        if(fileTaskResult == null){
            log.debug("File task result for {} and file task with id {} does not exist", email, fileTask.getId());
            return result;
        }
        result.setAnswer(fileTaskResult.getAnswer());
        List<FileResponse> fileResponseList = fileTaskResult.getFiles()
                .stream()
                .map(file -> new FileResponse(file.getId(), file.getName()))
                .toList();
        result.setTaskFiles(fileResponseList);

        ProfessorFeedback feedback = professorFeedbackRepo.findProfessorFeedbackByFileTaskResult(fileTaskResult);
        if (feedback == null) {
            log.debug("Feedback for file task result with id {} does not exist", fileTaskResult.getId());
            return result;
        }
        result.setPoints(feedback.getPoints());
        result.setRemarks(feedback.getContent());
        if (feedback.getFeedbackFile() != null) {
            result.setFeedbackFile(new FileResponse(feedback.getFeedbackFile()));
        }
        return result;
    }

    public void createFileTask(CreateFileTaskForm form) throws WrongUserTypeException, ParseException {
        log.info("Creating file task");
        SimpleDateFormat format = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss");
        Date date = format.parse(form.getActivityExpireDate());
        String email = authService.getAuthentication().getName();
        User professor = userRepo.findUserByEmail(email);
        userValidator.validateProfessorAccount(professor, email);
        FileTask fileTask = new FileTask(form, professor, date.getTime());
        fileTaskRepo.save(fileTask);
    }
}
