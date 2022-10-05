package com.example.api.controller.user;

import com.example.api.dto.request.user.rank.AddRankForm;
import com.example.api.dto.request.user.rank.EditRankForm;
import com.example.api.dto.response.user.rank.CurrentRankResponse;
import com.example.api.dto.response.user.rank.RanksForHeroTypeResponse;
import com.example.api.error.exception.EntityNotFoundException;
import com.example.api.error.exception.RequestValidationException;
import com.example.api.service.user.RankService;
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
@RequestMapping("/rank")
@SecurityRequirement(name = "JWT_AUTH")
public class RankController {
    private final RankService rankService;

    @GetMapping("/all")
    public ResponseEntity<List<RanksForHeroTypeResponse>> getAllRanks() {
        return ResponseEntity.ok().body(rankService.getAllRanks());
    }

    @PostMapping(path = "/add", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<?> addNewRank(@ModelAttribute AddRankForm form) throws RequestValidationException, IOException {
        rankService.addRank(form);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PutMapping(path = "/edit", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<?> editRank(@ModelAttribute EditRankForm form) throws RequestValidationException, IOException {
        rankService.editRank(form);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/current")
    public ResponseEntity<CurrentRankResponse> getCurrentRankInfo() throws RequestValidationException, IOException {
        return ResponseEntity.ok().body(rankService.getCurrentRank());
    }

    @DeleteMapping("/delete")
    public ResponseEntity<?> deleteRank(@RequestParam Long rankId) throws EntityNotFoundException {
        rankService.deleteRank(rankId);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
