package com.example.api.controller.activity.feedback;

import com.example.api.dto.request.activity.feedback.DeleteFileFromProfessorFeedbackForm;
import com.example.api.dto.request.activity.feedback.SaveFileToProfessorFeedbackForm;
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

    @PostMapping(path="")
    public ResponseEntity<ProfessorFeedbackInfoResponse> saveProfessorFeedback(
            @RequestParam Long fileTaskResultId,
            @RequestParam(required = false) String content,
            @RequestParam(required = false) Double points)
            throws WrongUserTypeException, EntityNotFoundException, IOException, MissingAttributeException, WrongPointsNumberException {
        SaveProfessorFeedbackForm form = new SaveProfessorFeedbackForm(fileTaskResultId, content, points);
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

    @PostMapping(path="/file/add", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<Long> saveFileToProfessorFeedback(@ModelAttribute SaveFileToProfessorFeedbackForm form)
            throws EntityNotFoundException, MissingAttributeException, IOException {
        return ResponseEntity.ok().body(feedbackService.saveFileToProfessorFeedback(form));
    }

    @DeleteMapping("/file/delete")
    public ResponseEntity<Long> deleteFileFromProfessorFeedback(
            @RequestParam Long fileTaskId,
            @RequestParam String studentEmail,
            @RequestParam int index
    )
            throws EntityNotFoundException, WrongUserTypeException {
        DeleteFileFromProfessorFeedbackForm form = new DeleteFileFromProfessorFeedbackForm(fileTaskId, studentEmail, index);
        return ResponseEntity.ok().body(feedbackService.deleteFileFromProfessorFeedback(form));
    }
}
