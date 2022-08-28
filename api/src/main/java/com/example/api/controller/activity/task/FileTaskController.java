package com.example.api.controller.activity.task;

import com.example.api.dto.request.activity.task.create.CreateFileTaskForm;
import com.example.api.dto.response.activity.task.FileTaskInfoResponse;
import com.example.api.error.exception.EntityNotFoundException;
import com.example.api.error.exception.WrongUserTypeException;
import com.example.api.service.activity.task.FileTaskService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;

@RestController
@RequiredArgsConstructor
@RequestMapping("/task/file")
@SecurityRequirement(name = "JWT_AUTH")
public class FileTaskController {
    private final FileTaskService fileTaskService;

    @GetMapping
    public ResponseEntity<FileTaskInfoResponse> getFileTaskById(@RequestParam Long fileTaskId)
            throws EntityNotFoundException, WrongUserTypeException {
        return ResponseEntity.ok().body(fileTaskService.getFileTaskInfo(fileTaskId));
    }

    @GetMapping("/create")
    public ResponseEntity<CreateFileTaskForm> getExampleFileTaskForm() {
        CreateFileTaskForm form = new CreateFileTaskForm(
                "Tytuł zadania",
                "Opis zadania",
                3,
                4,
                "Wymagane wiadomości",
                30.0,
                "28/04/2022 10:00:00"
        );
        return ResponseEntity.ok().body(form);
    }

    @PostMapping("/create")
    public ResponseEntity<?> createFileTask(@RequestBody CreateFileTaskForm form)
            throws WrongUserTypeException, ParseException {
        fileTaskService.createFileTask(form);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
