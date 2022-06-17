package com.example.api.controller.activity.feedback;

import com.example.api.dto.request.activity.feedback.SaveProfessorFeedbackForm;
import com.example.api.error.exception.EntityNotFoundException;
import com.example.api.error.exception.WrongBodyParametersNumberException;
import com.example.api.error.exception.WrongUserTypeException;
import com.example.api.model.activity.feedback.ProfessorFeedback;
import com.example.api.service.activity.feedback.ProfessorFeedbackService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/feedback/professor")
public class ProfessorFeedbackController {
    private final ProfessorFeedbackService feedbackService;

    @PostMapping
    public ResponseEntity<ProfessorFeedback> saveProfessorFeedback(@RequestBody SaveProfessorFeedbackForm form)
            throws WrongUserTypeException, WrongBodyParametersNumberException {
        return ResponseEntity.ok().body(feedbackService.saveProfessorFeedback(form));
    }

    @GetMapping("/task/graph")
    public ResponseEntity<ProfessorFeedback> getProfessorFeedbackForGraphTask(@RequestParam Long graphTaskId)
            throws EntityNotFoundException {
        return ResponseEntity.ok().body(feedbackService.getProfessorFeedbackForGraphTask(graphTaskId));
    }

    @GetMapping("/task/file")
    public ResponseEntity<ProfessorFeedback> getProfessorFeedbackForFileTask(@RequestParam Long fileTaskId)
            throws EntityNotFoundException {
        return ResponseEntity.ok().body(feedbackService.getProfessorFeedbackForFileTask(fileTaskId));
    }
}
