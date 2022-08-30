package com.example.api.service.validator.activity;

import com.example.api.dto.request.activity.task.create.CreateSurveyForm;
import com.example.api.error.exception.ExceptionMessage;
import com.example.api.error.exception.RequestValidationException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.util.Objects;
import java.util.stream.Stream;

@Component
@Slf4j
public class SurveyValidator {

    public void validateCreateSurveyForm(CreateSurveyForm form) throws RequestValidationException {
        if (Stream.of(form.getTitle(), form.getDescription(), form.getPosX(), form.getPosY(), form.getPoints())
                .anyMatch(Objects::isNull)) {
            log.info("All fields in CreateSurveyForm should not be null");
            throw new RequestValidationException(ExceptionMessage.FORM_FIELDS_NOT_NULL);
        }
    }
}
