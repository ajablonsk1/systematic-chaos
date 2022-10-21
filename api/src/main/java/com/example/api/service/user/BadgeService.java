package com.example.api.service.user;

import com.example.api.dto.request.user.BadgeForm;
import com.example.api.dto.response.user.badge.BadgeResponse;
import com.example.api.dto.response.user.badge.UnlockedBadgeResponse;
import com.example.api.error.exception.EntityNotFoundException;
import com.example.api.error.exception.MissingAttributeException;
import com.example.api.error.exception.RequestValidationException;
import com.example.api.error.exception.WrongUserTypeException;
import com.example.api.model.user.User;
import com.example.api.model.user.badge.Badge;
import com.example.api.model.user.badge.UnlockedBadge;
import com.example.api.repo.user.BadgeRepo;
import com.example.api.repo.user.UnlockedBadgeRepo;
import com.example.api.service.validator.BadgeValidator;
import com.example.api.util.visitor.BadgeVisitor;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.io.IOException;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class BadgeService {
    private final BadgeRepo badgeRepo;
    private final UnlockedBadgeRepo unlockedBadgeRepo;
    private final UserService userService;
    private final BadgeValidator badgeValidator;
    private final BadgeVisitor badgeVisitor;

    public List<BadgeResponse> getAllBadges() {
        return badgeRepo.findAll()
                .stream()
                .map(BadgeResponse::new)
                .toList();
    }

    public List<UnlockedBadgeResponse> getAllUnlockedBadges() {
        User student = userService.getCurrentUser();
        return student.getUnlockedBadges()
                .stream()
                .map(UnlockedBadgeResponse::new)
                .toList();
    }

    public void checkAllBadges() throws WrongUserTypeException, EntityNotFoundException, MissingAttributeException {
        User student = userService.getCurrentUser();
        List<Badge> studentBadges = student.getUnlockedBadges()
                .stream()
                .map(UnlockedBadge::getBadge)
                .toList();
        List<Badge> badges = badgeRepo.findAll()
                .stream()
                .filter(badge -> !studentBadges.contains(badge))
                .toList();
        for (Badge badge: badges) {
            if (badge.isGranted(badgeVisitor)) {
                UnlockedBadge unlockedBadge = new UnlockedBadge(badge, System.currentTimeMillis(), student);
                unlockedBadgeRepo.save(unlockedBadge);
                student.getUnlockedBadges().add(unlockedBadge);
            }
        }
    }

    public void deleteBadge(Long badgeId) {
        badgeRepo.deleteById(badgeId);
    }

    public void updateBadge(BadgeForm form) throws RequestValidationException, IOException {
        Long id = form.getId();
        Badge badge = badgeRepo.findBadgeById(id);
        badgeValidator.validateBadgeIsNotNull(badge, id);

        badge.update(form, badgeValidator);
        badgeRepo.save(badge);
    }
}
