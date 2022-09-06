package com.example.api.controller.activity.task;

import com.example.api.dto.request.activity.task.ActivityRequirementForm;
import com.example.api.dto.response.activity.task.ActivitiesResponse;
import com.example.api.dto.response.activity.task.ActivityToEvaluateResponse;
import com.example.api.dto.response.activity.task.TaskToEvaluateResponse;
import com.example.api.dto.response.map.RequirementResponse;
import com.example.api.error.exception.EntityNotFoundException;
import com.example.api.error.exception.MissingAttributeException;
import com.example.api.error.exception.RequestValidationException;
import com.example.api.error.exception.WrongUserTypeException;
import com.example.api.service.activity.task.TaskService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
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
    ResponseEntity<TaskToEvaluateResponse> getFirstAnswerToEvaluate(@RequestParam Long fileTaskId)
            throws EntityNotFoundException {
        return ResponseEntity.ok().body(taskService.getFirstAnswerToEvaluate(fileTaskId));
    }

    @GetMapping("/activities")
    ResponseEntity<List<ActivitiesResponse>> getAllActivities() {
        return ResponseEntity.ok().body(taskService.getAllActivities());
    }

    @GetMapping("/requirements")
    ResponseEntity<List<RequirementResponse<?>>> getRequirementsForActivity(@RequestParam Long activityId)
            throws EntityNotFoundException, MissingAttributeException {
        return ResponseEntity.ok().body(taskService.getRequirementForActivity(activityId));
    }

    @PostMapping("/requirements/add")
    ResponseEntity<?> addRequirementToActivity(@RequestBody ActivityRequirementForm form) throws RequestValidationException {
        taskService.addRequirementToActivity(form);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
