package com.example.api.controller.user;

import com.example.api.dto.response.user.badge.BadgeResponse;
import com.example.api.service.user.BadgeService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/badge")
@SecurityRequirement(name = "JWT_AUTH")
public class BadgeController {
    private final BadgeService badgeService;

    @GetMapping("/all")
    public ResponseEntity<List<BadgeResponse>> getAllBadges(){
        return ResponseEntity.ok().body(badgeService.getAllBadges());
    }
}
