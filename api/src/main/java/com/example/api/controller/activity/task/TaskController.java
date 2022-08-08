package com.example.api.controller.activity.task;

import com.example.api.dto.response.task.ActivityToEvaluateResponse;
import com.example.api.dto.response.task.TaskToEvaluateResponse;
import com.example.api.error.exception.EntityNotFoundException;
import com.example.api.error.exception.WrongUserTypeException;
import com.example.api.service.activity.task.TaskService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/task")
@SecurityRequirement(name = "JWT_AUTH")
public class TaskController {
    private final TaskService taskService;

    @GetMapping("/evaluate/all")
    ResponseEntity<List<ActivityToEvaluateResponse>> getAllActivitiesToEvaluate()
            throws WrongUserTypeException {
        return ResponseEntity.ok().body(taskService.getAllActivitiesToEvaluate());
    }

    @GetMapping("/evaluate/first")
    ResponseEntity<TaskToEvaluateResponse> getFirstAnswerToEvaluate(@RequestParam Long fileTaskId) throws EntityNotFoundException {
        return ResponseEntity.ok().body(taskService.getFirstAnswerToEvaluate(fileTaskId));
    }

    // @PostMapping("/evaluate")

}
