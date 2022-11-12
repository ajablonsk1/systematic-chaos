package com.example.api.service.validator;

import com.example.api.error.exception.ExceptionMessage;
import com.example.api.error.exception.RequestValidationException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import javax.transaction.Transactional;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Component
@Slf4j
@RequiredArgsConstructor
@Transactional
public class PasswordValidator {
    private final String PASSWORD_FORMAT = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{1,}$";
    private final Pattern p = Pattern.compile(PASSWORD_FORMAT);

    public void validatePassword(String password) throws RequestValidationException {
        Matcher matcher = p.matcher(password);
        if (!matcher.find()) {
            log.error("Password doesn't meet the requirements");
            throw new RequestValidationException(ExceptionMessage.PASSWORD_NOT_MEET_REQUIREMENTS);

        }
    }
}
