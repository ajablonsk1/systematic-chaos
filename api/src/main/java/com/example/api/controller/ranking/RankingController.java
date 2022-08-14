package com.example.api.controller.ranking;

import com.example.api.dto.response.ranking.RankingEntry;
import com.example.api.error.exception.EntityNotFoundException;
import com.example.api.service.ranking.RankingService;
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
@RequestMapping("/ranking")
@SecurityRequirement(name = "JWT_AUTH")
public class RankingController {
    private final RankingService rankingService;

    @GetMapping
    public ResponseEntity<List<RankingEntry>> getRanking()
            throws EntityNotFoundException {
        return ResponseEntity.ok().body(rankingService.getRanking());
    }

    @GetMapping("/group")
    public ResponseEntity<List<RankingEntry>> getRankingForGroup(@RequestParam String groupName)
            throws EntityNotFoundException {
        return ResponseEntity.ok().body(rankingService.getRankingForGroup(groupName));
    }
}