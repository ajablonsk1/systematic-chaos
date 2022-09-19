package com.example.api.service.validator.activity;

import com.example.api.dto.request.activity.task.create.*;
import com.example.api.dto.response.map.task.ActivityType;
import com.example.api.error.exception.EntityNotFoundException;
import com.example.api.error.exception.EntityRequiredAttributeNullException;
import com.example.api.error.exception.ExceptionMessage;
import com.example.api.error.exception.RequestValidationException;
import com.example.api.model.activity.result.GraphTaskResult;
import com.example.api.model.activity.result.TaskResult;
import com.example.api.model.activity.task.*;
import com.example.api.model.map.ActivityMap;
import com.example.api.model.map.Chapter;
import com.example.api.model.question.Difficulty;
import com.example.api.model.question.QuestionType;
import com.example.api.model.user.User;
import com.example.api.model.util.File;
import com.example.api.util.MessageManager;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.awt.*;
import java.util.Collection;
import java.util.List;
import java.util.Objects;
import java.util.stream.Stream;

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

    public void validateActivityIsNotNullWithMessage(Activity activity, String title, String message) throws EntityNotFoundException {
        if(activity == null) {
            log.error("Activity with title {} not found in database", title);
            throw new EntityNotFoundException(message);
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

    public void validateActivityPosition(CreateActivityForm form, Chapter chapter) throws RequestValidationException {
        ActivityMap activityMap = chapter.getActivityMap();
        if(form.getPosX() < 0 || form.getPosY() < 0 || form.getPosX() >= activityMap.getMapSizeX() ||
                form.getPosY() >= activityMap.getMapSizeY()) {
            log.error("Activity must be inside map boundaries!");
            throw new RequestValidationException(ExceptionMessage.ACTIVITY_OUTSIDE_BOUNDARIES);
        }
        List<Point> graphTasks = activityMap.getGraphTasks()
                .stream().map(graphTask -> new Point(graphTask.getPosX(), graphTask.getPosY())).toList();
        List<Point> fileTasks = activityMap.getFileTasks()
                .stream().map(fileTask -> new Point(fileTask.getPosX(), fileTask.getPosY())).toList();
        List<Point> surveys = activityMap.getSurveys()
                .stream().map(survey -> new Point(survey.getPosX(), survey.getPosY())).toList();
        List<Point> infos = activityMap.getInfos()
                .stream().map(info -> new Point(info.getPosX(), info.getPosY())).toList();
        List<Point> points = Stream.of(graphTasks, fileTasks, surveys, infos)
                .flatMap(Collection::stream)
                .toList();
        if (points.stream().anyMatch(point -> Objects.equals(point.getX(), Double.valueOf(form.getPosX())) &&
                Objects.equals(point.getY(), Double.valueOf(form.getPosY())))) {
            log.error("Two activities cannot be on the same position!");
            throw new RequestValidationException(ExceptionMessage.TWO_ACTIVITIES_ON_THE_SAME_POSITION);
        }
    }

    public void validateGraphTaskTitle(String title, List<GraphTask> graphTasks) throws RequestValidationException {
        graphTaskValidator.validateGraphTaskTitle(title, graphTasks);
    }

    public void validateFileTaskTitle(String title, List<FileTask> fileTasks) throws RequestValidationException {
        fileTaskValidator.validateFileTaskTitle(title, fileTasks);
    }

    public void validateRequirementsHasDateTo(List<Requirement> requirements) throws EntityRequiredAttributeNullException {
        if (requirements.size() != 1) {
            log.error("Requirements should have one requirement with type DATE_FROM");
            throw new EntityRequiredAttributeNullException("Requirements should have one requirement with type DATE_FROM");
        }
    }
}
