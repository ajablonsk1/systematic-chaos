package com.example.api.controller.activity.result;

import com.example.api.dto.response.activity.task.result.summary.SummaryResponse;
import com.example.api.error.exception.WrongUserTypeException;
import com.example.api.service.activity.result.SummaryService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequiredArgsConstructor
@RequestMapping("/summary")
@SecurityRequirement(name = "JWT_AUTH")
public class SummaryController {
    private final SummaryService summaryService;
    @GetMapping("")
    public ResponseEntity<SummaryResponse> getUserPointsStatistics() throws WrongUserTypeException {
        return ResponseEntity.ok().body(summaryService.getSummary());
    }
}
