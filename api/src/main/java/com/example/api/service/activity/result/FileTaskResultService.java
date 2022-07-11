package com.example.api.service.activity.result;

import com.example.api.dto.request.activity.task.DeleteFileFromFileTaskForm;
import com.example.api.dto.request.activity.task.SaveFileToFileTaskResultForm;
import com.example.api.error.exception.EntityNotFoundException;
import com.example.api.error.exception.WrongUserTypeException;
import com.example.api.model.activity.result.FileTaskResult;
import com.example.api.model.activity.task.FileTask;
import com.example.api.model.user.AccountType;
import com.example.api.model.user.User;
import com.example.api.model.util.File;
import com.example.api.repo.activity.result.FileTaskResultRepo;
import com.example.api.repo.activity.task.FileTaskRepo;
import com.example.api.repo.user.UserRepo;
import com.example.api.repo.util.FileRepo;
import com.example.api.service.validator.UserValidator;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.LinkedList;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class FileTaskResultService {
    private final FileTaskResultRepo fileTaskResultRepo;
    private final FileTaskRepo fileTaskRepo;
    private final UserRepo userRepo;
    private final FileRepo fileRepo;
    private final UserValidator userValidator;

    public Long saveFileToFileTaskResult(SaveFileToFileTaskResultForm form) throws EntityNotFoundException, WrongUserTypeException {
        log.info("Saving file to file task result with id {}", form.getFileTaskId());
        FileTaskResult result = getFileTaskResultByFileTaskAndUser(form.getFileTaskId(), form.getStudentEmail());
        if(result == null){
            result = new FileTaskResult();
            result.setAnswer("");
            result.setFileTask(fileTaskRepo.getById(form.getFileTaskId()));
            result.setEvaluated(false);
            result.setUser(userRepo.findUserByEmail(form.getStudentEmail()));
            fileTaskResultRepo.save(result);
        }
        if(form.getFileString() != null) {
            File file = new File(null, form.getFileName(), form.getFileString());
            fileRepo.save(file);
            result.getFiles().add(file);
        }
        if(form.getOpenAnswer() != null) {
            result.setAnswer(form.getOpenAnswer());
        }
        return result.getId();
    }

    public Long deleteFileFromFileTask(Long fileTaskId, String email, int index) throws EntityNotFoundException, WrongUserTypeException {
        log.info("Deleting file from file task result with id {}", fileTaskId);
        FileTaskResult result = getFileTaskResultByFileTaskAndUser(fileTaskId, email);
        result.getFiles().remove(index);
        return result.getId();
    }

    private FileTaskResult getFileTaskResultByFileTaskAndUser(Long fileTaskId, String email) throws EntityNotFoundException, WrongUserTypeException {
        FileTask fileTask = fileTaskRepo.findFileTaskById(fileTaskId);
        if(fileTask == null) {
            log.error("File task with given id {} does not exist", fileTaskId);
            throw new EntityNotFoundException("File task with given id " + fileTaskId + " does not exist");
        }
        User student = userRepo.findUserByEmail(email);
        userValidator.validateStudentAccount(student, email);
        return fileTaskResultRepo.findFileTaskResultByFileTaskAndUser(fileTask, student);
    }

}
