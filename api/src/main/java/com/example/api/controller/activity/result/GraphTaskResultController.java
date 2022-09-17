package com.example.api.controller.activity.result;

import com.example.api.dto.request.activity.result.AddAnswerToGraphTaskForm;
import com.example.api.dto.request.activity.result.SaveGraphTaskResultForm;
import com.example.api.dto.request.activity.result.SetSendDateMillisForm;
import com.example.api.dto.request.activity.result.SetStartDateMillisForm;
import com.example.api.error.exception.*;
import com.example.api.model.activity.result.GraphTaskResult;
import com.example.api.service.activity.result.GraphTaskResultService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/task/graph/result")
@SecurityRequirement(name = "JWT_AUTH")
public class GraphTaskResultController {
    private final GraphTaskResultService graphTaskResultService;

    @GetMapping
    public ResponseEntity<GraphTaskResult> getGraphTaskResult(@RequestParam Long graphTaskId)
            throws EntityNotFoundException, WrongUserTypeException {
        return ResponseEntity.ok().body(graphTaskResultService.getGraphTaskResult(graphTaskId));
    }

    @PostMapping("/start")
    public ResponseEntity<?> startGraphTaskResult(@RequestBody SaveGraphTaskResultForm form)
            throws EntityNotFoundException, WrongUserTypeException, EntityAlreadyInDatabaseException {
        graphTaskResultService.startGraphTaskResult(form.getGraphTaskId());
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/points/closed")
    public ResponseEntity<Double> getPointsFromClosedQuestions(@RequestParam Long graphTaskResultId)
            throws WrongAnswerTypeException, EntityNotFoundException {
        return ResponseEntity.ok().body(graphTaskResultService.getPointsFromClosedQuestions(graphTaskResultId));
    }

    @GetMapping("/points/opened")
    public ResponseEntity<Double> getPointsFromOpenedQuestions(@RequestParam Long graphTaskResultId)
            throws WrongAnswerTypeException, EntityNotFoundException {
        return ResponseEntity.ok().body(graphTaskResultService.getPointsFromOpenedQuestions(graphTaskResultId));
    }

    @GetMapping("/points/all")
    public ResponseEntity<Double> getAndSetAllPoints(@RequestParam Long graphTaskResultId)
            throws EntityNotFoundException {
        return ResponseEntity.ok().body(graphTaskResultService.getAndSetAllPoints(graphTaskResultId));
    }

    @GetMapping("/points/available/opened")
    public ResponseEntity<Double> getMaxOpenedPoints(@RequestParam Long graphTaskResultId)
            throws EntityNotFoundException {
        return ResponseEntity.ok().body(graphTaskResultService.getMaxOpenedPoints(graphTaskResultId));
    }

    @GetMapping("/points/available/closed")
    public ResponseEntity<Double> getMaxClosedPoints(@RequestParam Long graphTaskResultId)
            throws EntityNotFoundException {
        return ResponseEntity.ok().body(graphTaskResultService.getMaxClosedPoints(graphTaskResultId));
    }

    @GetMapping("/points/available/all")
    public ResponseEntity<Double> getMaxAvailablePoints(@RequestParam Long graphTaskResultId)
            throws EntityNotFoundException {
        return ResponseEntity.ok().body(graphTaskResultService.getMaxAvailablePoints(graphTaskResultId));
    }

    @PostMapping("/answer/add")
    public ResponseEntity<Long> addAnswerToGraphTaskResult(@RequestBody AddAnswerToGraphTaskForm form)
            throws RequestValidationException {
        return ResponseEntity.ok().body(graphTaskResultService.addAnswerToGraphTaskResult(form));
    }

    @PostMapping("/start-date/set")
    public ResponseEntity<Long> setStartDateMillis(@RequestBody SetStartDateMillisForm form)
            throws EntityNotFoundException {
        return ResponseEntity.ok().body(graphTaskResultService.setStartDateMillis(form));
    }

    @GetMapping("/time-remaining")
    public ResponseEntity<Long> getTimeRemaining(@RequestParam Long resultId)
            throws EntityNotFoundException, EntityRequiredAttributeNullException {
        return ResponseEntity.ok().body(graphTaskResultService.getTimeRemaining(resultId));
    }

    @PostMapping("/send-date/set")
    public ResponseEntity<Long> setSendDateMillis(@RequestBody SetSendDateMillisForm form) throws EntityNotFoundException {
        return ResponseEntity.ok().body(graphTaskResultService.setSendDateMillis(form));
    }
}
