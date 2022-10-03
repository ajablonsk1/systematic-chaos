package com.example.api.controller.user;

import com.example.api.dto.response.user.rank.RanksForHeroTypeResponse;
import com.example.api.service.user.RankService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/rank")
@SecurityRequirement(name = "JWT_AUTH")
public class RankController {
    private final RankService rankService;

    @GetMapping("/all")
    public ResponseEntity<List<RanksForHeroTypeResponse>> getAllRanks() {
        return ResponseEntity.ok().body(rankService.getAllRanks());
    }
}
