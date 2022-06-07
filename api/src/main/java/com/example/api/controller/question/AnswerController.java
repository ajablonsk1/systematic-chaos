package com.example.api.controller.question;

import com.example.api.error.exception.EntityNotFoundException;
import com.example.api.form.AnswerGraphTaskForm;
import com.example.api.model.question.Answer;
import com.example.api.service.question.AnswerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class AnswerController {
    private final AnswerService answerService;

    @PostMapping("/answer")
    public ResponseEntity<Answer> saveAnswer(@RequestBody AnswerGraphTaskForm form) throws EntityNotFoundException {
        return ResponseEntity.ok().body(answerService.saveAnswer(form));
    }
}
