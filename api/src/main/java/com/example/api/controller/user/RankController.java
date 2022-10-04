package com.example.api.controller.user;

import com.example.api.dto.request.user.AddRankForm;
import com.example.api.dto.response.user.rank.RanksForHeroTypeResponse;
import com.example.api.error.exception.RequestValidationException;
import com.example.api.service.user.RankService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
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

    @PostMapping("/add")
    public ResponseEntity<?> addNewRank(@RequestBody AddRankForm form) throws RequestValidationException, IOException {
        rankService.addRank(form);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
