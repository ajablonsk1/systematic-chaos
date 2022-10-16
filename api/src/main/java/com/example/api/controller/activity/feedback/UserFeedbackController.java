package com.example.api.controller.activity.feedback;

import com.example.api.dto.request.activity.feedback.SaveUserFeedbackForm;
import com.example.api.dto.response.activity.feedback.UserFeedbackInfoResponse;
import com.example.api.error.exception.EntityNotFoundException;
import com.example.api.error.exception.MissingAttributeException;
import com.example.api.error.exception.RequestValidationException;
import com.example.api.error.exception.WrongUserTypeException;
import com.example.api.model.activity.feedback.UserFeedback;
import com.example.api.service.activity.feedback.UserFeedbackService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/feedback/user")
@SecurityRequirement(name = "JWT_AUTH")
public class UserFeedbackController {
    private final UserFeedbackService feedbackService;

    @PostMapping
    public ResponseEntity<UserFeedbackInfoResponse> saveUserFeedback(@RequestBody SaveUserFeedbackForm form)
            throws RequestValidationException {
        return ResponseEntity.ok().body(feedbackService.saveUserFeedback(form));
    }

    @GetMapping
    public ResponseEntity<UserFeedbackInfoResponse> getUserFeedback(@RequestParam Long surveyId) throws WrongUserTypeException, EntityNotFoundException {
        return ResponseEntity.ok().body(feedbackService.getUserFeedback(surveyId));
    }
}
