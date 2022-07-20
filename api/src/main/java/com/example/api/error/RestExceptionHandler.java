package com.example.api.error;

import com.example.api.error.exception.*;
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
        return handleExceptionWithStatusCode(CONFLICT, ex);
    }

    @ExceptionHandler(WrongAnswerTypeException.class)
    public ResponseEntity<Object> handleWrongAnswerTypeException(WrongAnswerTypeException ex) {
        ApiError apiError = new ApiError(BAD_REQUEST, ex.getMessage(), ex);
        return buildResponseEntity(apiError);
    }

    @ExceptionHandler(WrongBodyParametersNumberException.class)
    public ResponseEntity<Object> handleWrongAnswerTypeException(WrongBodyParametersNumberException ex) {
        ApiError apiError = new ApiError(BAD_REQUEST, ex.getMessage(), ex);
        return buildResponseEntity(apiError);
    }

    @ExceptionHandler(WrongUserTypeException.class)
    public ResponseEntity<Object> handleWrongUserTypeException(WrongUserTypeException ex) {
        ApiError apiError = new ApiError(BAD_REQUEST, ex.getMessage(), ex);
        return buildResponseEntity(apiError);
    }

    @ExceptionHandler(BadRequestHeadersException.class)
    public ResponseEntity<Object> handleTokenException(BadRequestHeadersException ex) {
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

    @ExceptionHandler(EntityRequiredAttributeNullException.class)
    public ResponseEntity<Object> handleEntityRequiredAttributeNullException(EntityRequiredAttributeNullException ex) {
        return handleExceptionWithStatusCode(NOT_FOUND, ex);
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
