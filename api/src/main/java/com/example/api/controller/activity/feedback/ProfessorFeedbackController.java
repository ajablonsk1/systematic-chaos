package com.example.api.controller.activity.feedback;

import com.example.api.dto.request.activity.feedback.DeleteFileFromProfessorFeedback;
import com.example.api.dto.request.activity.feedback.SaveProfessorFeedbackForm;
import com.example.api.error.exception.EntityNotFoundException;
import com.example.api.error.exception.WrongUserTypeException;
import com.example.api.model.activity.feedback.ProfessorFeedback;
import com.example.api.service.activity.feedback.ProfessorFeedbackService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequiredArgsConstructor
@RequestMapping("/feedback/professor")
public class ProfessorFeedbackController {
    private final ProfessorFeedbackService feedbackService;

    @PostMapping(path="", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<ProfessorFeedback> saveProfessorFeedback(@ModelAttribute SaveProfessorFeedbackForm form)
            throws WrongUserTypeException, EntityNotFoundException, IOException {
        return ResponseEntity.ok().body(feedbackService.saveProfessorFeedback(form));
    }

    @GetMapping(path="/get/by-file-task-result-id", params = "fileTaskResultId")
    public ResponseEntity<ProfessorFeedback> getProfessorFeedbackForFileTaskResult(@RequestParam Long fileTaskResultId)
            throws EntityNotFoundException {
        return ResponseEntity.ok().body(feedbackService.getProfessorFeedbackForFileTaskResult(fileTaskResultId));
    }

    @GetMapping(path="/get", params = {"fileTaskId", "studentEmail"})
    public ResponseEntity<ProfessorFeedback> getProfessorFeedbackForFileTaskAndStudent(
            @RequestParam Long fileTaskId,
            @RequestParam String studentEmail
    )
            throws EntityNotFoundException {
        return ResponseEntity.ok().body(feedbackService.getProfessorFeedbackForFileTaskAndStudent(fileTaskId, studentEmail));
    }

    @DeleteMapping("file/delete")
    public ResponseEntity<ProfessorFeedback> deleteFileFromProfessorFeedback(@RequestBody DeleteFileFromProfessorFeedback form)
            throws EntityNotFoundException {
        return ResponseEntity.ok().body(feedbackService.deleteFileFromProfessorFeedback(form));
    }
}
