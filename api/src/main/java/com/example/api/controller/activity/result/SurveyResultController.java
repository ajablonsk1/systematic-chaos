package com.example.api.controller.activity.result;

import com.example.api.dto.request.activity.result.SurveyResultForm;
import com.example.api.dto.response.activity.result.SurveyResultInfoResponse;
import com.example.api.error.exception.EntityNotFoundException;
import com.example.api.error.exception.MissingAttributeException;
import com.example.api.error.exception.RequestValidationException;
import com.example.api.error.exception.WrongUserTypeException;
import com.example.api.service.activity.feedback.SurveyResultService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/survey/result")
@SecurityRequirement(name = "JWT_AUTH")
public class SurveyResultController {
    private final SurveyResultService surveyResultService;

    @PostMapping
    public ResponseEntity<SurveyResultInfoResponse> saveSurveyResult(@RequestBody SurveyResultForm form)
            throws RequestValidationException {
        return ResponseEntity.ok().body(surveyResultService.saveSurveyResult(form));
    }

    @GetMapping
    public ResponseEntity<SurveyResultInfoResponse> getSurveyResult(@RequestParam Long surveyId) throws WrongUserTypeException, EntityNotFoundException, MissingAttributeException {
        return ResponseEntity.ok().body(surveyResultService.getSurveyResult(surveyId));
    }
}
