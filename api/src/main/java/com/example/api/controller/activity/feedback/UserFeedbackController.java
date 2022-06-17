package com.example.api.controller.activity.feedback;

import com.example.api.dto.request.activity.feedback.SaveUserFeedbackForm;
import com.example.api.error.exception.EntityNotFoundException;
import com.example.api.error.exception.WrongUserTypeException;
import com.example.api.model.activity.feedback.UserFeedback;
import com.example.api.service.activity.feedback.UserFeedbackService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/feedback/user")
public class UserFeedbackController {
    private final UserFeedbackService feedbackService;

    @PostMapping
    public ResponseEntity<UserFeedback> saveUserFeedback(@RequestBody SaveUserFeedbackForm form)
            throws WrongUserTypeException, EntityNotFoundException {
        return ResponseEntity.ok().body(feedbackService.saveUserFeedback(form));
    }
}
