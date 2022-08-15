package com.example.api.controller.activity.task;

import com.example.api.dto.response.activity.task.InfoResponse;
import com.example.api.error.exception.EntityNotFoundException;
import com.example.api.service.activity.task.InfoService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/info")
@SecurityRequirement(name = "JWT_AUTH")
public class InfoController {
    private final InfoService infoService;

    @GetMapping
    ResponseEntity<InfoResponse> getInfo(@RequestParam Long infoId)
            throws EntityNotFoundException {
        return ResponseEntity.ok().body(infoService.getInfo(infoId));
    }
}
