package com.example.api.controller.user;

import com.example.api.dto.request.user.BadgeForm;
import com.example.api.dto.response.user.badge.BadgeResponse;
import com.example.api.dto.response.user.badge.UnlockedBadgeResponse;
import com.example.api.error.exception.RequestValidationException;
import com.example.api.service.user.BadgeService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
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

    @GetMapping("/unlocked/all")
    public ResponseEntity<List<UnlockedBadgeResponse>> getAllUnlockedBadges(){
        return ResponseEntity.ok().body(badgeService.getAllUnlockedBadges());
    }

    @DeleteMapping("/delete")
    public ResponseEntity<?> deleteBadge(@RequestParam Long badgeId){
        badgeService.deleteBadge(badgeId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PutMapping(path = "/update", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<?> updateBadge(@ModelAttribute BadgeForm form) throws IOException, RequestValidationException {
        badgeService.updateBadge(form);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
