package com.example.api.service.activity.task;

import com.example.api.dto.response.task.FileTaskInfoResponse;
import com.example.api.dto.response.task.util.FileResponse;
import com.example.api.error.exception.EntityNotFoundException;
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
import com.example.api.repo.util.FileRepo;
import com.example.api.service.validator.UserValidator;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
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

    public FileTaskInfoResponse getFileTaskInfo(Long id, String email) throws EntityNotFoundException, WrongUserTypeException {
        FileTask fileTask = fileTaskRepo.findFileTaskById(id);
        if(fileTask == null) {
            log.error("File task with id {} not found in database", id);
            throw new EntityNotFoundException("File task with id" + id + " not found in database");
        }
        User student = userRepo.findUserByEmail(email);
        userValidator.validateStudentAccount(student, email);
        FileTaskResult result = fileTaskResultRepo.findFileTaskResultByFileTaskAndUser(fileTask, student);
        if(result == null){
            log.debug("File task result for {} and file task with id {} does not exist", email, fileTask.getId());
            return new FileTaskInfoResponse(fileTask.getId(), fileTask.getName(), fileTask.getDescription(),
                    List.of(), null);
        }
        List<FileResponse> fileResponseList = result.getFiles()
                .stream()
                .map(file -> new FileResponse(file.getId(), file.getName()))
                .toList();
        ProfessorFeedback feedback = professorFeedbackRepo.findProfessorFeedbackByFileTaskResult(result);
        if (feedback == null){
            log.debug("Feedback for file task result with id {} does not exist", result.getId());
            return new FileTaskInfoResponse(fileTask.getId(), fileTask.getName(), fileTask.getDescription(),
                    fileResponseList, null);
        }
        return new FileTaskInfoResponse(fileTask.getId(), fileTask.getName(), fileTask.getDescription(),
                fileResponseList, feedback.getContent());

    }
}
