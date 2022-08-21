package com.example.api.controller.activity.result.ranking;

import com.example.api.dto.response.ranking.RankingResponse;
import com.example.api.error.exception.EntityNotFoundException;
import com.example.api.error.exception.MissingAttributeException;
import com.example.api.error.exception.WrongUserTypeException;
import com.example.api.service.activity.result.ranking.RankingService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
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
    public ResponseEntity<List<RankingResponse>> getRanking() {
        return ResponseEntity.ok().body(rankingService.getRanking());
    }

    @GetMapping("/group")
    public ResponseEntity<List<RankingResponse>> getRankingForGroup()
            throws EntityNotFoundException {
        return ResponseEntity.ok().body(rankingService.getRankingForLoggedStudentGroup());
    }

    @GetMapping("/search")
    public ResponseEntity<List<RankingResponse>> getSearchedRanking(@RequestParam String search) {
        return ResponseEntity.ok().body(rankingService.getSearchedRanking(search));
    }

    @GetMapping("/position")
    public ResponseEntity<Integer> getRankingPosition()
            throws WrongUserTypeException {
        return ResponseEntity.ok().body(rankingService.getRankingPosition());
    }

    @GetMapping("/group/position")
    public ResponseEntity<Integer> getGroupRankingPosition()
            throws WrongUserTypeException, MissingAttributeException, UsernameNotFoundException, EntityNotFoundException {
        return ResponseEntity.ok().body(rankingService.getGroupRankingPosition());
    }
}