package com.example.api.service.validator.activity;

import com.example.api.dto.request.activity.task.create.CreateInfoForm;
import com.example.api.error.exception.ExceptionMessage;
import com.example.api.error.exception.RequestValidationException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.util.Objects;
import java.util.stream.Stream;

@Component
@Slf4j
public class InfoValidator {

    public void validateCreateInfoForm(CreateInfoForm form) throws RequestValidationException {
        if (Stream.of(form.getTitle(), form.getDescription(), form.getPosX(), form.getPosY(), form.getImageUrls())
                .anyMatch(Objects::isNull)) {
            log.info("All fields in CreateInfoForm should not be null");
            throw new RequestValidationException(ExceptionMessage.FORM_FIELDS_NOT_NULL);
        }
    }
}
