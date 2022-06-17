package com.example.api.controller.activity.result;

import com.example.api.dto.request.activity.result.AddAnswerToGraphTaskForm;
import com.example.api.dto.request.activity.result.SaveGraphTaskResultForm;
import com.example.api.dto.request.activity.result.SetPointsForm;
import com.example.api.dto.request.activity.result.SetTimeSpentForm;
import com.example.api.error.exception.EntityNotFoundException;
import com.example.api.error.exception.WrongAnswerTypeException;
import com.example.api.error.exception.WrongBodyParametersNumberException;
import com.example.api.error.exception.WrongUserTypeException;
import com.example.api.model.activity.result.GraphTaskResult;
import com.example.api.model.question.Answer;
import com.example.api.service.activity.result.GraphTaskResultService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/task/graph/result")
public class GraphTaskResultController {
    private final GraphTaskResultService graphTaskResultService;

    @GetMapping
    public ResponseEntity<GraphTaskResult> getGraphTaskResult(@RequestParam Long graphTaskId, @RequestParam String studentEmail)
            throws EntityNotFoundException, WrongUserTypeException {
        return ResponseEntity.ok().body(graphTaskResultService.getGraphTaskResult(graphTaskId, studentEmail));
    }

    @PostMapping("/save")
    public ResponseEntity<GraphTaskResult> saveGraphTaskResult(@RequestBody SaveGraphTaskResultForm form)
            throws EntityNotFoundException {
        return ResponseEntity.ok().body(graphTaskResultService.saveGraphTaskResult(form));
    }

    @PostMapping("/add")
    public ResponseEntity<GraphTaskResult> addAnswerToResult(@RequestBody SaveGraphTaskResultForm form)
            throws EntityNotFoundException {
        return ResponseEntity.ok().body(graphTaskResultService.saveGraphTaskResult(form));
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
            throws WrongAnswerTypeException, EntityNotFoundException {
        return ResponseEntity.ok().body(graphTaskResultService.getAndSetAllPoints(graphTaskResultId));
    }

    @GetMapping("/points/available/opened")
    public ResponseEntity<Double> getMaxOpenedPoints(@RequestParam Long graphTaskResultId)
            throws EntityNotFoundException {
        return ResponseEntity.ok().body(graphTaskResultService.getMaxAvailablePoints(graphTaskResultId));
    }

    @GetMapping("/points/available/closed")
    public ResponseEntity<Double> getMaxClosedPoints(@RequestParam Long graphTaskResultId)
            throws EntityNotFoundException {
        return ResponseEntity.ok().body(graphTaskResultService.getMaxClosedPoints(graphTaskResultId));
    }

    @GetMapping("/points/available/all")
    public ResponseEntity<Double> getMaxAvailablePoints(@RequestParam Long graphTaskResultId)
            throws EntityNotFoundException {
        return ResponseEntity.ok().body(graphTaskResultService.getMaxOpenedPoints(graphTaskResultId));
    }

    @PostMapping("/answer/add")
    public ResponseEntity<Answer> addAnswerToGraphTaskResult(@RequestBody AddAnswerToGraphTaskForm form)
            throws EntityNotFoundException, WrongBodyParametersNumberException {
        return ResponseEntity.ok().body(graphTaskResultService.addAnswerToGraphTaskResult(form));
    }

    @PostMapping("/time/set")
    public ResponseEntity<Integer> addAnswerToGraphTaskResult(@RequestBody SetTimeSpentForm form)
            throws EntityNotFoundException {
        return ResponseEntity.ok().body(graphTaskResultService.setTimeSpent(form));
    }
}
