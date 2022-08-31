package com.example.api.service.validator.activity;

import com.example.api.dto.request.activity.task.create.CreateFileTaskForm;
import com.example.api.dto.request.activity.task.create.CreateGraphTaskForm;
import com.example.api.dto.request.activity.task.create.CreateInfoForm;
import com.example.api.dto.request.activity.task.create.CreateSurveyForm;
import com.example.api.error.exception.EntityNotFoundException;
import com.example.api.error.exception.EntityRequiredAttributeNullException;
import com.example.api.error.exception.RequestValidationException;
import com.example.api.model.activity.result.GraphTaskResult;
import com.example.api.model.activity.result.TaskResult;
import com.example.api.model.activity.task.Activity;
import com.example.api.model.activity.task.FileTask;
import com.example.api.model.question.Difficulty;
import com.example.api.model.question.QuestionType;
import com.example.api.model.user.User;
import com.example.api.model.util.File;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

@Component
@Slf4j
@RequiredArgsConstructor
public class ActivityValidator {
    private final GraphTaskValidator graphTaskValidator;
    private final FileTaskValidator fileTaskValidator;
    private final InfoValidator infoValidator;
    private final SurveyValidator surveyValidator;

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
            throw new EntityNotFoundException("File with id " + id + " not found in database");
        }
    }

    public void validateGraphTaskResultExistsAndHasStartDate(GraphTaskResult result, Long id) throws EntityNotFoundException, EntityRequiredAttributeNullException {
        if(result == null) {
            log.error("Graph task result with given id {} does not exist", id);
            throw new EntityNotFoundException("Graph task result with given id " + id + " does not exist");
        }
        if(result.getStartDateMillis() == null) {
            log.error("Start time not set for graph task with id {}", id);
            throw new EntityRequiredAttributeNullException("Required attribute startTimeMillis is null for " +
                    "graph task result with id " + id);
        }
    }

    public void validateCreateFileTaskFormFields(CreateFileTaskForm form) throws RequestValidationException {
        fileTaskValidator.validateCreateFileTaskForm(form);
    }

    public void validateCreateGraphTaskFormFields(CreateGraphTaskForm form) throws RequestValidationException {
        graphTaskValidator.validateCreateGraphTaskFormFields(form);
    }

    public void validateCreateInfoForm(CreateInfoForm form) throws RequestValidationException {
        infoValidator.validateCreateInfoForm(form);
    }

    public void validateCreateSurveyForm(CreateSurveyForm form) throws RequestValidationException {
        surveyValidator.validateCreateSurveyForm(form);
    }

    public QuestionType getQuestionTypeFromString(String questionType) throws RequestValidationException {
        return graphTaskValidator.getQuestionTypeFromString(questionType);
    }

    public Difficulty getDifficultyFromString(String difficulty) throws RequestValidationException {
        return graphTaskValidator.getDifficultyFromString(difficulty);
    }
}
