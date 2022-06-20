package com.example.api.controller.activity.task;

import com.example.api.dto.response.task.FileTaskInfoResponse;
import com.example.api.error.exception.EntityNotFoundException;
import com.example.api.error.exception.WrongUserTypeException;
import com.example.api.model.util.File;
import com.example.api.service.activity.task.FileTaskService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/task/file")
public class FileTaskController {
    private final FileTaskService fileTaskService;

    @GetMapping
    ResponseEntity<FileTaskInfoResponse> getGraphTaskById(@RequestParam Long fileTaskId, @RequestParam String studentEmail)
            throws EntityNotFoundException, WrongUserTypeException {
        return ResponseEntity.ok().body(fileTaskService.getFileTaskInfo(fileTaskId, studentEmail));
    }

    //TODO: Move to file-task-result-controller later
    @GetMapping("/getById")
    ResponseEntity<File> getFileById(@RequestParam Long fileId, @RequestParam String studentEmail){
        return ResponseEntity.ok().body(fileTaskService.getFileById(fileId, studentEmail));
    }
}
