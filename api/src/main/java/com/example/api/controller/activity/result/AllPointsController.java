package com.example.api.controller.activity.result;

import com.example.api.error.exception.WrongUserTypeException;
import com.example.api.service.activity.result.AllPointsService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
}