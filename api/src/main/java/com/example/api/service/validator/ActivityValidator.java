package com.example.api.service.validator;

import com.example.api.error.exception.EntityNotFoundException;
import com.example.api.model.activity.result.TaskResult;
import com.example.api.model.activity.task.Activity;
import com.example.api.model.activity.task.FileTask;
import com.example.api.model.user.User;
import com.example.api.model.util.File;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

@Component
@Slf4j
public class ActivityValidator {

    public void validateActivityIsNotNull(Activity activity, Long id) throws EntityNotFoundException {
        if(activity == null) {
            log.error("Activity with id {} not found in database", id);
            throw new EntityNotFoundException("Activity with id" + id + " not found in database");
        }
    }

    public void validateTaskResultIsNotNull(TaskResult taskResult, Long id) throws EntityNotFoundException {
        if(taskResult == null) {
            log.error("Task result with id {} not found in database", id);
            throw new EntityNotFoundException("Task result with id" + id + " not found in database");
        }
    }

    public void validateTaskResultIsNotNull(TaskResult taskResult, User user, FileTask fileTask) throws EntityNotFoundException {
        if(taskResult == null) {
            log.error("Task result for user {} and file task {} not found in database", user.getEmail(), fileTask.getId());
            throw new EntityNotFoundException("Task result for user " + user.getEmail() +
                    " and file task " + fileTask.getId() + " not found in database");
        }
    }

    public void validateFileIsNotNull(File file, Long id) throws EntityNotFoundException {
        if(file == null) {
            log.error("File with id {} not found in database", id);
            throw new EntityNotFoundException("File with id" + id + " not found in database");
        }
    }
}
