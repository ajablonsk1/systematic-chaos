package com.example.api.service.validator;

import com.example.api.error.exception.ExceptionMessage;
import com.example.api.error.exception.RequestValidationException;
import com.example.api.model.user.PasswordResetToken;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import javax.transaction.Transactional;
import java.util.Date;

@Component
@Slf4j
@RequiredArgsConstructor
@Transactional
public class PasswordResetValidator {

    public void validateTokenIsNotNull(String email, PasswordResetToken token) throws RequestValidationException {
        if (token == null) {
            log.error("PasswordResetToken for {} is null", email);
            throw new RequestValidationException(ExceptionMessage.PASSWORD_RESET_TOKEN_IS_NULL);
        }
    }

    public void validateTokenIsNotUsed(String email, PasswordResetToken token) throws RequestValidationException {
        if (token.getIsUsed()) {
            log.error("PasswordResetToken for {} is used", email);
            throw new RequestValidationException(ExceptionMessage.PASSWORD_RESET_TOKEN_IS_USED);
        }
    }

    public void validateExpirationTime(String email, Long currentTime, Long expirationTime) throws RequestValidationException {
        if (currentTime > expirationTime) {
            log.error("Password token for {} expired on {}", email, new Date(expirationTime));
            throw new RequestValidationException(ExceptionMessage.PASSWORD_RESET_TOKEN_EXPIRED);
        }
    }

    public void validateToken(String email, PasswordEncoder passwordEncoder, String receivedToken, String actualToken) throws RequestValidationException {
        if (!passwordEncoder.matches(receivedToken, actualToken)) {
            log.error("Password token for {} is not correct", email);
            throw new RequestValidationException(ExceptionMessage.PASSWORD_RESET_TOKEN_INCORRECT);
        }
    }
}
