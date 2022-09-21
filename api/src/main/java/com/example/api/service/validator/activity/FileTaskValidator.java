package com.example.api.service.validator.activity;

import com.example.api.dto.request.activity.task.create.CreateFileTaskForm;
import com.example.api.error.exception.ExceptionMessage;
import com.example.api.error.exception.RequestValidationException;
import com.example.api.model.activity.task.FileTask;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Objects;
import java.util.stream.Stream;

@Component
@Slf4j
public class FileTaskValidator {

    public void validateCreateFileTaskForm(CreateFileTaskForm form) throws RequestValidationException {
        if (Stream.of(form.getTitle(), form.getDescription(), form.getPosX(), form.getPosY(),
                form.getRequiredKnowledge(), form.getMaxPoints()).anyMatch(Objects::isNull)) {
            log.info("All fields in CreateFileTaskForm should not be null");
            throw new RequestValidationException(ExceptionMessage.FORM_FIELDS_NOT_NULL);
        }
    }

    public void validateFileTaskTitle(String title, List<FileTask> fileTasks) throws RequestValidationException {
        int idx = title.indexOf(";");
        if (idx != -1) {
            log.error("Title cannot have a semicolon!");
            throw new RequestValidationException(ExceptionMessage.FILE_TASK_TITLE_CONTAINS_SEMICOLON);
        }
        if (fileTasks.stream().anyMatch(fileTask -> fileTask.getTitle().equals(title))) {
            log.error("Graph task has to have unique title");
            throw new RequestValidationException(ExceptionMessage.FILE_TASK_TITLE_NOT_UNIQUE);
        }
    }
}
