package com.example.api.error;

import com.example.api.error.exception.EntityAlreadyInDatabaseException;
import com.example.api.error.exception.EntityNotFoundException;
import com.example.api.error.exception.TokenException;
import com.example.api.error.exception.WrongAnswerTypeException;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import javax.servlet.ServletException;
import java.io.IOException;

import static org.springframework.http.HttpStatus.*;

@Order(Ordered.HIGHEST_PRECEDENCE)
@ControllerAdvice
public class RestExceptionHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler(UsernameNotFoundException.class)
    public ResponseEntity<Object> handleUsernameNotFound(UsernameNotFoundException ex) {
        return handleExceptionWithStatusCode(NOT_FOUND, ex);
    }

    @ExceptionHandler(EntityNotFoundException.class)
    public ResponseEntity<Object> handleEntityNotFound(EntityNotFoundException ex) {
        return handleExceptionWithStatusCode(NOT_FOUND, ex);
    }

    @ExceptionHandler(EntityAlreadyInDatabaseException.class)
    public ResponseEntity<Object> handleEntityAlreadyInDatabase(EntityAlreadyInDatabaseException ex) {
        return handleExceptionWithStatusCode(BAD_REQUEST, ex);
    }

    @ExceptionHandler(WrongAnswerTypeException.class)
    public ResponseEntity<Object> handleWrongAnswerTypeException(WrongAnswerTypeException ex) {
        ApiError apiError = new ApiError(BAD_REQUEST, ex.getMessage(), ex);
        return buildResponseEntity(apiError);
    }

    @ExceptionHandler(TokenException.class)
    public ResponseEntity<Object> handleTokenException(TokenException ex) {
        return handleExceptionWithStatusCode(NOT_FOUND, ex);
    }

    @ExceptionHandler(IOException.class)
    public ResponseEntity<Object> handleIOException(IOException ex) {
        return handleExceptionWithStatusCode(INTERNAL_SERVER_ERROR, ex);
    }

    @ExceptionHandler(ServletException.class)
    public ResponseEntity<Object> handleServletException(ServletException ex) {
        return handleExceptionWithStatusCode(INTERNAL_SERVER_ERROR, ex);
    }

    private ResponseEntity<Object> handleExceptionWithStatusCode(HttpStatus httpStatus, Exception ex) {
        ApiError apiError = new ApiError(httpStatus);
        apiError.setMessage(ex.getMessage());
        return buildResponseEntity(apiError);
    }

    private ResponseEntity<Object> buildResponseEntity(ApiError apiError) {
        return new ResponseEntity<>(apiError, apiError.getStatus());
    }
}
