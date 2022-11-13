package com.example.api.controller.user;

import com.example.api.dto.response.user.dashboard.DashboardResponse;
import com.example.api.error.exception.EntityNotFoundException;
import com.example.api.error.exception.MissingAttributeException;
import com.example.api.error.exception.WrongUserTypeException;
import com.example.api.service.user.DashboardService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/dashboard")
@SecurityRequirement(name = "JWT_AUTH")
public class DashboardController {
    private final DashboardService dashboardService;

    @GetMapping
    public ResponseEntity<DashboardResponse> getStudentDashboard() throws WrongUserTypeException, EntityNotFoundException, MissingAttributeException {
        return ResponseEntity.ok().body(dashboardService.getStudentDashboard());
    }
}
