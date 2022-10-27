package com.example.api.service.validator;

import com.example.api.dto.request.user.badge.BadgeForm;
import com.example.api.error.exception.EntityNotFoundException;
import com.example.api.error.exception.ExceptionMessage;
import com.example.api.error.exception.RequestValidationException;
import com.example.api.model.user.badge.Badge;
import com.example.api.util.MessageManager;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

@Component
@Slf4j
@RequiredArgsConstructor
public class BadgeValidator {

    public void validateBadgeIsNotNull(Badge badge, Long id) throws EntityNotFoundException {
        if (badge == null) {
            log.error("Badge with id {} does not exist", id);
            throw new EntityNotFoundException("Badge with id " + id + " does not exist");
        }
    }

    public Integer validateAndGetIntegerValue(String value) throws RequestValidationException {
        try {
            return Integer.valueOf(value);
        } catch (NumberFormatException e) {
            log.error("String value should be parsable to int!");
            throw new RequestValidationException(ExceptionMessage.STRING_VALUE_NOT_PARSABLE_TO_INT);
        }
    }

    public void validateBadgeForm(BadgeForm form) throws RequestValidationException {
        if (form.getTitle().length() > 30) {
            log.error("Title should be max 32 characters long!");
            throw new RequestValidationException(ExceptionMessage.BADGE_TITLE_TOO_LONG);
        }
    }

    public Double validateAndGetDoubleValue(String value) throws RequestValidationException {
        try {
            return Double.valueOf(value);
        } catch (NumberFormatException e) {
            log.error("String value should be parsable to double!");
            throw new RequestValidationException(ExceptionMessage.STRING_VALUE_NOT_PARSABLE_TO_DOUBLE);
        }
    }
}
