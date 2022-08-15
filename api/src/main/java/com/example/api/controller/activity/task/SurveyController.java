package com.example.api.controller.activity.task;

import com.example.api.dto.response.activity.task.SurveyInfoResponse;
import com.example.api.error.exception.EntityNotFoundException;
import com.example.api.service.activity.task.SurveyService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/survey")
@SecurityRequirement(name = "JWT_AUTH")
public class SurveyController {
    private final SurveyService surveyService;

    @GetMapping
    ResponseEntity<SurveyInfoResponse> getSurveyInfo(@RequestParam Long surveyId)
            throws EntityNotFoundException {
        return ResponseEntity.ok().body(surveyService.getSurveyInfo(surveyId));
    }
}
