package com.example.api.service.user;

import com.example.api.dto.response.user.badge.BadgeResponse;
import com.example.api.repo.user.BadgeRepo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class BadgeService {
    private final BadgeRepo badgeRepo;

    public List<BadgeResponse> getAllBadges() {
        return badgeRepo.findAll()
                .stream()
                .map(BadgeResponse::new)
                .toList();
    }
}
