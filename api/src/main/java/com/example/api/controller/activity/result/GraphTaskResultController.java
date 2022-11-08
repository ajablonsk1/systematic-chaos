package com.example.api.controller.activity.result;

import com.example.api.dto.request.activity.result.SaveGraphTaskResultForm;
import com.example.api.dto.response.activity.result.SuperPowerResponse;
import com.example.api.dto.response.activity.result.SuperPowerUsageResponse;
import com.example.api.error.exception.*;
import com.example.api.service.activity.result.GraphTaskResultService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.Nullable;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/task/graph/result")
@SecurityRequirement(name = "JWT_AUTH")
public class GraphTaskResultController {
    private final GraphTaskResultService graphTaskResultService;

    @GetMapping
    public ResponseEntity<Long> getGraphTaskResultId(@RequestParam Long graphTaskId)
            throws EntityNotFoundException, WrongUserTypeException {
        return ResponseEntity.ok().body(graphTaskResultService.getGraphTaskResultId(graphTaskId));
    }

    @PostMapping("/start")
    public ResponseEntity<?> startGraphTaskResult(@RequestBody SaveGraphTaskResultForm form)
            throws EntityNotFoundException, WrongUserTypeException, EntityAlreadyInDatabaseException {
        graphTaskResultService.startGraphTaskResult(form.getGraphTaskId());
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/points/closed")
    public ResponseEntity<Double> getPointsFromClosedQuestions(@RequestParam Long graphTaskResultId)
            throws EntityNotFoundException {
        return ResponseEntity.ok().body(graphTaskResultService.getPointsFromClosedQuestions(graphTaskResultId));
    }

    @GetMapping("/points/opened")
    public ResponseEntity<Double> getPointsFromOpenedQuestions(@RequestParam Long graphTaskResultId)
            throws EntityNotFoundException {
        return ResponseEntity.ok().body(graphTaskResultService.getPointsFromOpenedQuestions(graphTaskResultId));
    }

    @GetMapping("/points/all")
    public ResponseEntity<Double> getAllPoints(@RequestParam Long graphTaskResultId)
            throws EntityNotFoundException {
        return ResponseEntity.ok().body(graphTaskResultService.getAllPoints(graphTaskResultId));
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

    @GetMapping("/time-remaining")
    public ResponseEntity<Long> getTimeLeftAfterEnd(@RequestParam Long resultId)
            throws EntityNotFoundException, EntityRequiredAttributeNullException {
        return ResponseEntity.ok().body(graphTaskResultService.getTimeLeftAfterEnd(resultId));
    }

    @GetMapping("/super-power")
    public ResponseEntity<SuperPowerResponse<?>> useSuperPower(
            @RequestParam Long graphTaskId,
            @Nullable @RequestParam Long questionId
    ) throws RequestValidationException {
        return ResponseEntity.ok().body(graphTaskResultService.useSuperPower(graphTaskId, questionId));
    }

    @GetMapping("/super-power/can-use")
    public ResponseEntity<SuperPowerUsageResponse> canSuperPowerBeUsed(@RequestParam Long graphTaskId)
            throws RequestValidationException {
        return ResponseEntity.ok().body(graphTaskResultService.canSuperPowerBeUsed(graphTaskId));
    }
}
