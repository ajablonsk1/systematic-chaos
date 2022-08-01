package com.example.api.controller.activity.result;

import com.example.api.service.activity.result.TaskResultService;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/task/result")
public class TaskResultController {
    private final TaskResultService resultService;

    @PostMapping("/csv")
    public ResponseEntity<ByteArrayResource> getCSVFile(@RequestBody List<Long> ids) throws IOException {
        return ResponseEntity.ok().body(resultService.getCSVFile(ids));
    }
}
