package com.example.api.controller.activity.result;

import com.example.api.dto.response.activity.task.result.TotalPointsResponse;
import com.example.api.error.exception.WrongUserTypeException;
import com.example.api.service.activity.result.AllPointsService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/points/all")
@SecurityRequirement(name = "JWT_AUTH")
public class AllPointsController {
    private final AllPointsService allPointsService;

    @GetMapping("/list")
    public ResponseEntity<List<?>> getAllPointsList(@RequestParam String studentEmail) throws WrongUserTypeException {
        return ResponseEntity.ok().body(allPointsService.getAllPointsList(studentEmail));
    }

    @GetMapping("/total")
    public ResponseEntity<TotalPointsResponse> getAllPointsTotal() throws WrongUserTypeException {
        return ResponseEntity.ok().body(allPointsService.getAllPointsTotal());
    }
}