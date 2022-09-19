package com.example.api.controller.question;

import com.example.api.dto.request.activity.result.SetStatusForm;
import com.example.api.dto.response.activity.task.result.question.QuestionInfoResponse;
import com.example.api.error.exception.EntityNotFoundException;
import com.example.api.error.exception.RequestValidationException;
import com.example.api.model.question.Question;
import com.example.api.service.question.QuestionService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/question")
@SecurityRequirement(name = "JWT_AUTH")
public class QuestionController {
    private final QuestionService questionService;

    @GetMapping
    public ResponseEntity<Question> getQuestion(@RequestParam Long questionId)
            throws EntityNotFoundException {
        return ResponseEntity.ok().body(questionService.getQuestion(questionId));
    }

    @GetMapping("/get-info")
    public ResponseEntity<QuestionInfoResponse> getQuestionInfo(@RequestParam Long graphTaskId)
            throws RequestValidationException {
        return ResponseEntity.ok().body(questionService.getQuestionInfo(graphTaskId));
    }

    @PostMapping("/set-status")
    public ResponseEntity<Long> getInfoAboutCurrentResultState(@RequestBody SetStatusForm form)
            throws RequestValidationException {
        return ResponseEntity.ok().body(questionService.setStatus(form));
    }
}
