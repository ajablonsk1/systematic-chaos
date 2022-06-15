package com.example.api.controller.activity.result;

import com.example.api.error.exception.EntityNotFoundException;
import com.example.api.error.exception.WrongAnswerTypeException;
import com.example.api.error.exception.WrongBodyParametersNumberException;
import com.example.api.error.exception.WrongUserTypeException;
import com.example.api.model.activity.result.GraphTaskResult;
import com.example.api.model.question.Answer;
import com.example.api.service.activity.result.GraphTaskResultService;
import com.example.api.service.activity.result.form.AddAnswerToGraphTaskForm;
import com.example.api.service.activity.result.form.SaveGraphTaskResultForm;
import com.example.api.service.activity.result.form.SetPointsForm;
import com.example.api.service.activity.result.form.SetTimeSpentForm;
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
    public ResponseEntity<Double> getAllPoints(@RequestParam Long graphTaskResultId)
            throws WrongAnswerTypeException, EntityNotFoundException {
        return ResponseEntity.ok().body(graphTaskResultService.getPointsFromClosedQuestions(graphTaskResultId) +
                graphTaskResultService.getPointsFromOpenedQuestions(graphTaskResultId));
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

    @GetMapping("/points/available")
    public ResponseEntity<Double> getMaxAvailablePoints(@RequestParam Long graphTaskResultId)
            throws EntityNotFoundException {
        return ResponseEntity.ok().body(graphTaskResultService.getMaxAvailablePoints(graphTaskResultId));
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
