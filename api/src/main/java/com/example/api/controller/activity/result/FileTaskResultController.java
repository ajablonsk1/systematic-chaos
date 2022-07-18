package com.example.api.controller.activity.result;

import com.example.api.dto.request.activity.task.SaveFileToFileTaskResultForm;
import com.example.api.error.exception.EntityNotFoundException;
import com.example.api.error.exception.WrongUserTypeException;
import com.example.api.model.util.File;
import com.example.api.service.activity.result.FileTaskResultService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/task/file/result")
public class FileTaskResultController {
    private final FileTaskResultService fileTaskResultService;

    @PostMapping("/file/add")
    public ResponseEntity<Long> saveFileToFileTaskResult(@RequestBody SaveFileToFileTaskResultForm form)
            throws EntityNotFoundException, WrongUserTypeException {
        return ResponseEntity.ok().body(fileTaskResultService.saveFileToFileTaskResult(form));
    }

    @DeleteMapping("/file/delete")
    public ResponseEntity<Long> deleteFileFromFileTask(@RequestParam Long fileTaskId, @RequestParam String studentEmail, @RequestParam int index)
            throws EntityNotFoundException, WrongUserTypeException {
        return ResponseEntity.ok().body(fileTaskResultService.deleteFileFromFileTask(fileTaskId, studentEmail, index));
    }

    @GetMapping("/file")
    ResponseEntity<File> getFileById(@RequestParam Long fileId) throws EntityNotFoundException {
        return ResponseEntity.ok().body(fileTaskResultService.getFileById(fileId));
    }
}
