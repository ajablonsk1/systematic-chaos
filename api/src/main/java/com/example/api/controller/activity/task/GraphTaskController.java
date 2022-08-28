package com.example.api.controller.activity.task;

import com.example.api.dto.request.activity.task.create.CreateFileTaskForm;
import com.example.api.dto.request.activity.task.create.CreateGraphTaskForm;
import com.example.api.error.exception.EntityNotFoundException;
import com.example.api.error.exception.WrongUserTypeException;
import com.example.api.model.activity.task.GraphTask;
import com.example.api.service.activity.task.GraphTaskService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/task/graph")
@SecurityRequirement(name = "JWT_AUTH")
public class GraphTaskController {
    private final GraphTaskService graphTaskService;

    @GetMapping
    ResponseEntity<GraphTask> getGraphTaskById(@RequestParam Long id) throws EntityNotFoundException {
        return ResponseEntity.ok().body(graphTaskService.getGraphTaskById(id));
    }

    @GetMapping("/create")
    public ResponseEntity<CreateGraphTaskForm> getExampleGraphTaskForm() {
        CreateGraphTaskForm form = new CreateGraphTaskForm(
                "Tytuł zadania",
                "Opis zadania",
                3,
                4,
                "Wymagane wiadomości",
                "28/04/2022 10:00:00",
                List.of(),
                "00:30:00"
        );
        return ResponseEntity.ok().body(form);
    }

    @PostMapping("/create")
    public ResponseEntity<?> createGraphTask(@RequestBody CreateGraphTaskForm form)
            throws WrongUserTypeException, ParseException {
        graphTaskService.createGraphTask(form);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
