package com.example.api.controller.activity;

import com.example.api.error.exception.EntityNotFoundException;
import com.example.api.error.exception.WrongAnswerTypeException;
import com.example.api.form.GraphTaskResultSaveForm;
import com.example.api.form.SetPointsForm;
import com.example.api.model.activity.result.GraphTaskResult;
import com.example.api.service.activity.result.GraphTaskResultService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/task/graph")
public class GraphTaskResultController {
    private final GraphTaskResultService graphTaskResultService;

    @PostMapping("/result/save")
    public ResponseEntity<GraphTaskResult> saveGraphTaskResult(@RequestBody GraphTaskResultSaveForm form)
            throws EntityNotFoundException {
        return ResponseEntity.ok().body(graphTaskResultService.saveGraphTaskResult(form));
    }

    @GetMapping("/points/closed")
    public ResponseEntity<Double> getPointsFromClosedQuestions(@RequestParam Long id)
            throws WrongAnswerTypeException, EntityNotFoundException {
        return ResponseEntity.ok().body(graphTaskResultService.getPointsFromClosedQuestions(id));
    }

    @GetMapping("/points/opened")
    public ResponseEntity<Double> getPointsFromOpenedQuestions(@RequestParam Long id)
            throws WrongAnswerTypeException, EntityNotFoundException {
        return ResponseEntity.ok().body(graphTaskResultService.getPointsFromOpenedQuestions(id));
    }

    @GetMapping("/points/all")
    public ResponseEntity<Double> saveGraphTaskResult(@RequestParam Long id)
            throws WrongAnswerTypeException, EntityNotFoundException {
        return ResponseEntity.ok().body(graphTaskResultService.getPointsFromClosedQuestions(id) +
                graphTaskResultService.getPointsFromOpenedQuestions(id));
    }

    @PostMapping("/points/add")
    public ResponseEntity<Double> addPointsManually(@RequestBody SetPointsForm form)
            throws EntityNotFoundException {
        return ResponseEntity.ok().body(graphTaskResultService.addPointsManually(form));
    }

    @PostMapping("/points/set")
    public ResponseEntity<Double> setPointsManually(@RequestBody SetPointsForm form)
            throws EntityNotFoundException {
        return ResponseEntity.ok().body(graphTaskResultService.setPointsManually(form));
    }
}
