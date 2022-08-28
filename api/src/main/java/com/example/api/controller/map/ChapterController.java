package com.example.api.controller.map;

import com.example.api.dto.response.map.ChapterInfoResponse;
import com.example.api.dto.response.map.ChapterResponse;
import com.example.api.service.map.ChapterService;
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
@RequestMapping("/chapter")
@SecurityRequirement(name = "JWT_AUTH")
public class ChapterController {
    private final ChapterService chapterService;

    @GetMapping
    public ResponseEntity<List<ChapterResponse>> getAllChapters() {
        return ResponseEntity.ok().body(chapterService.getAllChapters());
    }

    @GetMapping("/info")
    public ResponseEntity<ChapterInfoResponse> getChapterInfo(@RequestParam Long id) {
        return ResponseEntity.ok().body(chapterService.getChapterInfo(id));
    }
}
