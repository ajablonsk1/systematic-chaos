package com.example.api.controller.activity.task;

import com.example.api.dto.response.activity.task.FileTaskInfoResponse;
import com.example.api.error.exception.EntityNotFoundException;
import com.example.api.error.exception.WrongUserTypeException;
import com.example.api.service.activity.task.FileTaskService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/task/file")
@SecurityRequirement(name = "JWT_AUTH")
public class FileTaskController {
    private final FileTaskService fileTaskService;

    @GetMapping
    ResponseEntity<FileTaskInfoResponse> getFileTaskById(@RequestParam Long fileTaskId)
            throws EntityNotFoundException, WrongUserTypeException {
        return ResponseEntity.ok().body(fileTaskService.getFileTaskInfo(fileTaskId));
    }
}
