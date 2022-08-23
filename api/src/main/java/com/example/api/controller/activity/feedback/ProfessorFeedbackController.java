package com.example.api.controller.activity.feedback;

import com.example.api.dto.request.activity.feedback.SaveProfessorFeedbackForm;
import com.example.api.dto.response.activity.feedback.ProfessorFeedbackInfoResponse;
import com.example.api.error.exception.EntityNotFoundException;
import com.example.api.error.exception.MissingAttributeException;
import com.example.api.error.exception.WrongPointsNumberException;
import com.example.api.error.exception.WrongUserTypeException;
import com.example.api.service.activity.feedback.ProfessorFeedbackService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequiredArgsConstructor
@RequestMapping("/feedback/professor")
@SecurityRequirement(name = "JWT_AUTH")
public class ProfessorFeedbackController {
    private final ProfessorFeedbackService feedbackService;

    @PostMapping(path="", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<ProfessorFeedbackInfoResponse> saveProfessorFeedback(@ModelAttribute SaveProfessorFeedbackForm form)
            throws WrongUserTypeException, EntityNotFoundException, IOException, MissingAttributeException, WrongPointsNumberException {
        return ResponseEntity.ok().body(feedbackService.saveProfessorFeedback(form));
    }

    @GetMapping("/get/by-file-task-result-id")
    public ResponseEntity<ProfessorFeedbackInfoResponse> getProfessorFeedbackForFileTaskResult(@RequestParam Long fileTaskResultId)
            throws EntityNotFoundException, MissingAttributeException {
        return ResponseEntity.ok().body(feedbackService.getProfessorFeedbackInfoForFileTaskResult(fileTaskResultId));
    }

    @GetMapping("/get")
    public ResponseEntity<ProfessorFeedbackInfoResponse> getProfessorFeedbackForFileTaskAndStudent(
            @RequestParam Long fileTaskId,
            @RequestParam String studentEmail
    )
            throws EntityNotFoundException, MissingAttributeException, WrongUserTypeException {
        return ResponseEntity.ok().body(feedbackService.getProfessorFeedbackInfoForFileTaskAndStudent(fileTaskId, studentEmail));
    }
}
