package com.example.api.controller.activity.task;

import com.example.api.error.exception.EntityNotFoundException;
import com.example.api.model.activity.task.GraphTask;
import com.example.api.service.activity.task.GraphTaskService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/task/graph")
public class GraphTaskController {
    private final GraphTaskService graphTaskService;

    @GetMapping
    ResponseEntity<GraphTask> getGraphTaskById(@RequestParam Long id) throws EntityNotFoundException {
        return ResponseEntity.ok().body(graphTaskService.getGraphTaskById(id));
    }
}
