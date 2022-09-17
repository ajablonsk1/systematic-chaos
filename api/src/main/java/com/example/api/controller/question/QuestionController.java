package com.example.api.controller.question;

import com.example.api.dto.response.activity.task.result.question.QuestionInfo;
import com.example.api.dto.response.activity.task.result.question.QuestionResponse;
import com.example.api.error.exception.EntityNotFoundException;
import com.example.api.error.exception.RequestValidationException;
import com.example.api.model.question.Question;
import com.example.api.service.question.QuestionService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

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

    @GetMapping("/next")
    public ResponseEntity<List<QuestionResponse>> getNextQuestions(@RequestParam Long graphTaskId)
            throws RequestValidationException {
        return ResponseEntity.ok().body(questionService.getNextQuestions(graphTaskId));
    }

    @GetMapping("/info")
    public ResponseEntity<QuestionInfo> getQuestionInfo(@RequestParam Long questionId, @RequestParam Long graphTaskId)
            throws RequestValidationException {
        return ResponseEntity.ok().body(questionService.getQuestionInfo(questionId, graphTaskId));
    }
}
