package com.example.api.controller.activity.feedback;

import com.example.api.dto.request.activity.feedback.DeleteFileFromProfessorFeedback;
import com.example.api.dto.request.activity.feedback.SaveProfessorFeedbackForm;
import com.example.api.dto.response.task.FileTaskInfoResponse;
import com.example.api.dto.response.task.feedback.ProfessorFeedbackInfoResponse;
import com.example.api.error.exception.EntityNotFoundException;
import com.example.api.error.exception.MissingProfessorFeedbackAttributeException;
import com.example.api.error.exception.WrongPointsNumberException;
import com.example.api.error.exception.WrongUserTypeException;
import com.example.api.model.activity.feedback.Feedback;
import com.example.api.model.activity.feedback.ProfessorFeedback;
import com.example.api.service.activity.feedback.ProfessorFeedbackService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.File;
import java.io.IOException;

@RestController
@RequiredArgsConstructor
@RequestMapping("/feedback/professor")
@SecurityRequirement(name = "JWT_AUTH")
public class ProfessorFeedbackController {
    private final ProfessorFeedbackService feedbackService;

    @PostMapping(path="", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<ProfessorFeedbackInfoResponse> saveProfessorFeedback(@ModelAttribute SaveProfessorFeedbackForm form)
            throws WrongUserTypeException, EntityNotFoundException, IOException, MissingProfessorFeedbackAttributeException, WrongPointsNumberException {
        return ResponseEntity.ok().body(feedbackService.saveProfessorFeedback(form));
    }

    @GetMapping(path="/get/by-file-task-result-id", params = "fileTaskResultId")
    public ResponseEntity<ProfessorFeedbackInfoResponse> getProfessorFeedbackForFileTaskResult(@RequestParam Long fileTaskResultId)
            throws EntityNotFoundException, MissingProfessorFeedbackAttributeException {
        return ResponseEntity.ok().body(feedbackService.getProfessorFeedbackForFileTaskResult(fileTaskResultId));
    }

    @GetMapping(path="/get", params = {"fileTaskId", "studentEmail"})
    public ResponseEntity<ProfessorFeedbackInfoResponse> getProfessorFeedbackForFileTaskAndStudent(
            @RequestParam Long fileTaskId,
            @RequestParam String studentEmail
    )
            throws EntityNotFoundException, MissingProfessorFeedbackAttributeException {
        return ResponseEntity.ok().body(feedbackService.getProfessorFeedbackForFileTaskAndStudent(fileTaskId, studentEmail));
    }

    @DeleteMapping("file/delete")
    public ResponseEntity<Long> deleteFileFromProfessorFeedback(
            @RequestParam Long fileTaskId,
            @RequestParam String studentEmail,
            @RequestParam int index
    )
            throws EntityNotFoundException, MissingProfessorFeedbackAttributeException {
        DeleteFileFromProfessorFeedback form = new DeleteFileFromProfessorFeedback(fileTaskId, studentEmail, index);
        return ResponseEntity.ok().body(feedbackService.deleteFileFromProfessorFeedback(form));
    }
}
