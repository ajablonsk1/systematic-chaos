package com.example.api.service.user;

import com.example.api.dto.request.user.UpdateHeroForm;
import com.example.api.model.user.hero.Hero;
import com.example.api.repo.user.HeroRepo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class HeroService {
    private final HeroRepo heroRepo;

    public void updateHero(UpdateHeroForm form) {
        Hero hero = heroRepo.findHeroByType(form.getType());
        Long coolDown = form.getCoolDownMillis();
        if (coolDown != null) {
            hero.setCoolDownTimeMillis(coolDown);
        }
        Double value = form.getValue();
        if (value != null) {
            hero.changeValue(value);
        }
    }
}
