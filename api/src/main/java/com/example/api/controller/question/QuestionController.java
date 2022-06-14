package com.example.api.controller.question;

import com.example.api.error.exception.EntityNotFoundException;
import com.example.api.model.question.Question;
import com.example.api.service.question.QuestionService;
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
public class QuestionController {
    private final QuestionService questionService;

    @GetMapping("")
    public ResponseEntity<Question> getQuestion(@RequestParam Long questionId)
            throws EntityNotFoundException {
        return ResponseEntity.ok().body(questionService.getQuestion(questionId));
    }

    @GetMapping("/next")
    public ResponseEntity<List<Question>> getNextQuestions(@RequestParam Long questionId)
            throws EntityNotFoundException {
        return ResponseEntity.ok().body(questionService.getNextQuestions(questionId));
    }
}
