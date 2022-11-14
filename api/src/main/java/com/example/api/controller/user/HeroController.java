package com.example.api.controller.user;

import com.example.api.dto.request.user.UpdateHeroForm;
import com.example.api.service.user.HeroService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/hero")
@SecurityRequirement(name = "JWT_AUTH")
public class HeroController {
    private final HeroService heroService;

    @PutMapping
    public ResponseEntity<?> updateHero(@RequestBody UpdateHeroForm form) {
        heroService.updateHero(form);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
