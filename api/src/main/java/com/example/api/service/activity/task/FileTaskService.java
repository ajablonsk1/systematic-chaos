package com.example.api.service.activity.task;

import com.example.api.dto.response.task.FileTaskInfoResponse;
import com.example.api.dto.response.task.util.FileResponse;
import com.example.api.error.exception.EntityNotFoundException;
import com.example.api.error.exception.WrongUserTypeException;
import com.example.api.model.activity.feedback.ProfessorFeedback;
import com.example.api.model.activity.result.FileTaskResult;
import com.example.api.model.activity.task.FileTask;
import com.example.api.model.user.AccountType;
import com.example.api.model.user.User;
import com.example.api.model.util.File;
import com.example.api.repo.activity.feedback.ProfessorFeedbackRepo;
import com.example.api.repo.activity.result.FileTaskResultRepo;
import com.example.api.repo.activity.task.FileTaskRepo;
import com.example.api.repo.user.UserRepo;
import com.example.api.repo.util.FileRepo;
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
public class FileTaskService {
    private final FileTaskRepo fileTaskRepo;
    private final FileTaskResultRepo fileTaskResultRepo;
    private final ProfessorFeedbackRepo professorFeedbackRepo;
    private final UserRepo userRepo;
    private final FileRepo fileRepo;

    public FileTaskInfoResponse getFileTaskInfo(Long id, String email) throws EntityNotFoundException, WrongUserTypeException {
        FileTask fileTask = fileTaskRepo.findFileTaskById(id);
        if(fileTask == null) {
            log.error("File task with id {} not found in database", id);
            throw new EntityNotFoundException("File task with id" + id + " not found in database");
        }
        User student = userRepo.findUserByEmail(email);
        if(student == null) {
            log.error("User {} not found in database", email);
            throw new UsernameNotFoundException("User" + email + " not found in database");
        }
        if(student.getAccountType() != AccountType.STUDENT) {
            throw new WrongUserTypeException("Wrong user type!", AccountType.STUDENT);
        }
        FileTaskResult result = fileTaskResultRepo.findFileTaskResultByFileTaskAndUser(fileTask, student);
        ProfessorFeedback feedback = professorFeedbackRepo.findProfessorFeedbackByFileTaskResult(result);
        if(result == null){
            return new FileTaskInfoResponse(fileTask.getId(), fileTask.getName(), fileTask.getDescription(),
                    null, "");
        }

        List<FileResponse> fileResponseList = result.getFiles()
                .stream()
                .map(file -> new FileResponse(file.getId(), file.getName()))
                .toList();
        if (feedback == null){
            return new FileTaskInfoResponse(fileTask.getId(), fileTask.getName(), fileTask.getDescription(),
                    fileResponseList, "");
        }

        return new FileTaskInfoResponse(fileTask.getId(), fileTask.getName(), fileTask.getDescription(),
                fileResponseList, feedback.getContent());

    }

    public File getFileById(Long fileId, String studentEmail) {
        return fileRepo.findById(fileId).orElseThrow();
    }
}
