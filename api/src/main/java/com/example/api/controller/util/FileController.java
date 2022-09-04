package com.example.api.controller.util;

import com.example.api.dto.response.util.ChapterImageResponse;
import com.example.api.error.exception.EntityNotFoundException;
import com.example.api.model.util.File;
import com.example.api.model.util.Image;
import com.example.api.service.util.FileService;
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
@RequestMapping("/file")
@SecurityRequirement(name = "JWT_AUTH")
public class FileController {
    private final FileService fileService;

    @GetMapping("/chapter/images")
    public ResponseEntity<List<ChapterImageResponse>> getImagesForChapter() {
        return ResponseEntity.ok().body(fileService.getImagesForChapter());
    }

    @GetMapping
    public ResponseEntity<Image> getImage(@RequestParam Long id) throws EntityNotFoundException {
        return ResponseEntity.ok().body(fileService.getImage(id));
    }
}