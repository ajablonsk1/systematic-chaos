package com.example.api.service.activity.task;

import com.example.api.dto.response.map.task.ActivityType;
import com.example.api.dto.response.task.ActivityToEvaluateResponse;
import com.example.api.dto.response.task.TaskToEvaluateResponse;
import com.example.api.error.exception.EntityNotFoundException;
import com.example.api.error.exception.WrongUserTypeException;
import com.example.api.model.activity.result.FileTaskResult;
import com.example.api.model.activity.result.GraphTaskResult;
import com.example.api.model.activity.task.FileTask;
import com.example.api.model.activity.task.GraphTask;
import com.example.api.model.map.Requirement;
import com.example.api.model.question.Answer;
import com.example.api.model.question.Option;
import com.example.api.model.user.AccountType;
import com.example.api.model.user.User;
import com.example.api.repo.activity.result.FileTaskResultRepo;
import com.example.api.repo.activity.result.GraphTaskResultRepo;
import com.example.api.repo.activity.task.FileTaskRepo;
import com.example.api.repo.activity.task.GraphTaskRepo;
import com.example.api.repo.user.UserRepo;
import io.swagger.v3.oas.models.links.Link;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.LinkedList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class TaskService {
    private final GraphTaskRepo graphTaskRepo;
    private final FileTaskRepo fileTaskRepo;
    private final GraphTaskResultRepo graphTaskResultRepo;
    private final FileTaskResultRepo fileTaskResultRepo;
    private final UserRepo userRepo;

    public List<ActivityToEvaluateResponse> getAllActivitiesToEvaluate(String email)
            throws WrongUserTypeException, UsernameNotFoundException {
        User professor = userRepo.findUserByEmail(email);
        if (professor == null) {
            log.error("User {} not found in database", email);
            throw new UsernameNotFoundException("User" + email + " not found in database");
        }
        if (professor.getAccountType() != AccountType.PROFESSOR) {
            log.error("Wrong user type exception!");
            throw new WrongUserTypeException("Wrong user type exception!", AccountType.PROFESSOR);
        }
        List<ActivityToEvaluateResponse> response = new LinkedList<>();
        List<FileTask> fileTasks = fileTaskRepo.findAll()
                .stream()
                .filter(fileTask -> fileTask.getProfessor().getEmail().equals(email))
                .toList();
        List<FileTaskResult> fileTaskResults = fileTaskResultRepo.findAll();
        for (FileTask task : fileTasks) {
            long num = fileTaskResults.stream()
                    .filter(result -> Objects.equals(result.getFileTask().getId(), task.getId()))
                    .filter(result -> !result.isEvaluated())
                    .count();
            response.add(new ActivityToEvaluateResponse(task.getId(), num));
        }
        return response;
    }

    public TaskToEvaluateResponse getFirstAnswerToEvaluate(Long id) throws EntityNotFoundException {
        FileTask task = fileTaskRepo.findFileTaskById(id);
        if(task == null) {
            log.error("File task with id {} not found in database", id);
            throw new EntityNotFoundException("File task with id" + id + " not found in database");
        }
        List<FileTaskResult> fileTaskResults = fileTaskResultRepo.findAll()
                .stream()
                .filter(result -> Objects.equals(result.getFileTask().getId(), task.getId()))
                .filter(result -> !result.isEvaluated())
                .toList();
        FileTaskResult fileTaskResult = fileTaskResults.get(0);
        long num = fileTaskResults.size();
        if(fileTaskResult != null) {
            return new TaskToEvaluateResponse(fileTaskResult.getId(), task.getName(), null, task.getDescription(),
                    fileTaskResult.getAnswer(), fileTaskResult.getFiles(), task.getMaxPoints(), num-1);
        }
        return null;
    }
}
