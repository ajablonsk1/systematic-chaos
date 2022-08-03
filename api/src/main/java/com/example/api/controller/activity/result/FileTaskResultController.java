package com.example.api.controller.activity.result;

import com.example.api.dto.request.activity.task.SaveFileToFileTaskResultForm;
import com.example.api.error.exception.EntityNotFoundException;
import com.example.api.error.exception.WrongUserTypeException;
import com.example.api.service.activity.result.FileTaskResultService;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequiredArgsConstructor
@RequestMapping("/task/file/result")
public class FileTaskResultController {
    private final FileTaskResultService fileTaskResultService;

    @PostMapping(path="/file/add", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<Long> saveFileToFileTaskResult(@ModelAttribute SaveFileToFileTaskResultForm form)
            throws EntityNotFoundException, WrongUserTypeException, IOException {
        return ResponseEntity.ok().body(fileTaskResultService.saveFileToFileTaskResult(form));
    }

    @DeleteMapping("/file/delete")
    public ResponseEntity<Long> deleteFileFromFileTask(@RequestParam Long fileTaskId, @RequestParam int index)
            throws EntityNotFoundException, WrongUserTypeException {
        return ResponseEntity.ok().body(fileTaskResultService.deleteFileFromFileTask(fileTaskId, index));
    }

    @GetMapping("/file")
    ResponseEntity<ByteArrayResource> getFileById(@RequestParam Long fileId) throws EntityNotFoundException {
        return ResponseEntity.ok().body(fileTaskResultService.getFileById(fileId));
    }
}
