package com.example.api.service.activity.task;

import com.example.api.dto.response.task.ActivityToEvaluateResponse;
import com.example.api.dto.response.task.TaskToEvaluateResponse;
import com.example.api.dto.response.task.util.FileResponse;
import com.example.api.error.exception.EntityNotFoundException;
import com.example.api.error.exception.WrongUserTypeException;
import com.example.api.model.activity.result.FileTaskResult;
import com.example.api.model.activity.task.FileTask;
import com.example.api.model.user.AccountType;
import com.example.api.model.user.User;
import com.example.api.repo.activity.result.FileTaskResultRepo;
import com.example.api.repo.activity.task.FileTaskRepo;
import com.example.api.repo.user.UserRepo;
import com.example.api.security.AuthenticationService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.LinkedList;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class TaskService {
    private final FileTaskRepo fileTaskRepo;
    private final FileTaskResultRepo fileTaskResultRepo;
    private final UserRepo userRepo;
    private final AuthenticationService authService;

    public List<ActivityToEvaluateResponse> getAllActivitiesToEvaluate()
            throws WrongUserTypeException, UsernameNotFoundException {
        String email = authService.getAuthentication().getName();
        log.info("Fetching all activities that are needed to be evaluated for professor {}", email);
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
        log.info("Fetching first activity that is needed to be evaluated for file task with id {}", id);
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
        if(fileTaskResults.size() > 0) {
            FileTaskResult result = fileTaskResults.get(0);
            long num = fileTaskResults.size();
            boolean isLate = false;
            //TODO: investigate further
            if(result.getSendDateMillis() != null){
                isLate = result.getSendDateMillis() - result.getFileTask().getSolveDateMillis() > 0;
            }

            List<FileResponse> filesResponse = result.getFiles().stream().map(FileResponse::new).toList();

            return new TaskToEvaluateResponse(result.getUser().getEmail(), result.getId(), result.getUser().getFirstName(),
                    result.getUser().getLastName(), task.getName(), isLate, task.getDescription(),
                    result.getAnswer(), filesResponse, task.getMaxPoints(), id, num-1);
        }
        return null;
    }
}
