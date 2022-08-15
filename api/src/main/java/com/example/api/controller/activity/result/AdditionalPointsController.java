package com.example.api.controller.activity.result;

import com.example.api.dto.request.activity.result.AddAdditionalPointsForm;
import com.example.api.error.exception.WrongUserTypeException;
import com.example.api.service.activity.result.AdditionalPointsService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/additional/points")
@SecurityRequirement(name = "JWT_AUTH")
public class AdditionalPointsController {
    private final AdditionalPointsService additionalPointsService;

    @PostMapping("/add")
    public ResponseEntity<?> addAdditionalPoints(@RequestBody AddAdditionalPointsForm form) throws WrongUserTypeException {
        additionalPointsService.saveAdditionalPoints(form);
        return ResponseEntity.ok().body(null);
    }

    @GetMapping
    public ResponseEntity<?> getAdditionalPoints() {
        return ResponseEntity.ok().body(additionalPointsService.getAdditionalPoints());
    }
}
