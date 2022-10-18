package com.example.api.repo.user;

import com.example.api.model.user.badge.UnlockedBadge;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UnlockedBadgeRepo extends JpaRepository<UnlockedBadge, Long> {
}
