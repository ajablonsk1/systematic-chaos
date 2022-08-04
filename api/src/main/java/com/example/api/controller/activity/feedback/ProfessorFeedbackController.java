package com.example.api.controller.activity.feedback;

import com.example.api.dto.request.activity.feedback.SaveProfessorFeedbackForm;
import com.example.api.error.exception.EntityNotFoundException;
import com.example.api.error.exception.WrongUserTypeException;
import com.example.api.model.activity.feedback.ProfessorFeedback;
import com.example.api.service.activity.feedback.ProfessorFeedbackService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/feedback/professor")
@SecurityRequirement(name = "JWT_AUTH")
public class ProfessorFeedbackController {
    private final ProfessorFeedbackService feedbackService;

    @PostMapping
    public ResponseEntity<ProfessorFeedback> saveProfessorFeedback(@RequestBody SaveProfessorFeedbackForm form)
            throws WrongUserTypeException, EntityNotFoundException {
        return ResponseEntity.ok().body(feedbackService.saveProfessorFeedback(form));
    }

    @GetMapping("/task/file")
    public ResponseEntity<ProfessorFeedback> getProfessorFeedbackForFileTask(@RequestParam Long fileTaskId)
            throws EntityNotFoundException {
        return ResponseEntity.ok().body(feedbackService.getProfessorFeedbackForFileTask(fileTaskId));
    }
}
