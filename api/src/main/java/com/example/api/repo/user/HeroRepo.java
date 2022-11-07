package com.example.api.repo.user;

import com.example.api.model.user.HeroType;
import com.example.api.model.user.hero.Hero;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HeroRepo extends JpaRepository<Hero, Long> {
    Hero findHeroByType(HeroType type);
}
