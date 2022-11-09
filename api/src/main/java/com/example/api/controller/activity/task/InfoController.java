package com.example.api.controller.activity.task;

import com.example.api.dto.request.activity.task.create.CreateInfoChapterForm;
import com.example.api.dto.request.activity.task.create.CreateInfoForm;
import com.example.api.dto.response.activity.task.InfoResponse;
import com.example.api.error.exception.EntityNotFoundException;
import com.example.api.error.exception.RequestValidationException;
import com.example.api.service.activity.task.InfoService;
import com.example.api.util.message.MessageManager;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/info")
@SecurityRequirement(name = "JWT_AUTH")
public class InfoController {
    private final InfoService infoService;

    @GetMapping
    public ResponseEntity<InfoResponse> getInfo(@RequestParam Long infoId)
            throws EntityNotFoundException {
        return ResponseEntity.ok().body(infoService.getInfo(infoId));
    }

    @GetMapping("/create")
    public ResponseEntity<CreateInfoForm> getExampleCreateInfoForm() {
        CreateInfoForm form = new CreateInfoForm(
                MessageManager.TITLE,
                MessageManager.DESC,
                1,
                2,
                List.of(MessageManager.LINK),
                MessageManager.LOREM_IPSUM
        );
        return ResponseEntity.ok().body(form);
    }

    @PostMapping("/create")
    public ResponseEntity<?> createInfo(@RequestBody CreateInfoChapterForm form)
            throws RequestValidationException {
        infoService.createInfo(form);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
