package com.example.api.repo.user;

import com.example.api.model.user.badge.Badge;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BadgeRepo extends JpaRepository<Badge, Long> {
}
