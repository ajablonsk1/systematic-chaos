package com.example.api.service.user;

import com.example.api.dto.request.user.badge.BadgeAddForm;
import com.example.api.dto.request.user.badge.BadgeType;
import com.example.api.dto.request.user.badge.BadgeUpdateForm;
import com.example.api.dto.response.user.badge.BadgeResponse;
import com.example.api.dto.response.user.badge.UnlockedBadgeResponse;
import com.example.api.error.exception.EntityNotFoundException;
import com.example.api.error.exception.MissingAttributeException;
import com.example.api.error.exception.RequestValidationException;
import com.example.api.error.exception.WrongUserTypeException;
import com.example.api.model.user.User;
import com.example.api.model.user.badge.*;
import com.example.api.model.util.Image;
import com.example.api.model.util.ImageType;
import com.example.api.repo.user.BadgeRepo;
import com.example.api.repo.user.UnlockedBadgeRepo;
import com.example.api.repo.util.FileRepo;
import com.example.api.service.validator.BadgeValidator;
import com.example.api.util.visitor.BadgeVisitor;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.io.IOException;
import java.util.Comparator;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class BadgeService {
    private final BadgeRepo badgeRepo;
    private final UnlockedBadgeRepo unlockedBadgeRepo;
    private final FileRepo fileRepo;
    private final UserService userService;
    private final BadgeValidator badgeValidator;
    private final BadgeVisitor badgeVisitor;

    public List<? extends BadgeResponse<?>> getAllBadges() {
        return badgeRepo.findAll()
                .stream()
                .sorted(Comparator.comparingLong(Badge::getId))
                .map(Badge::getResponse)
                .toList();
    }

    public List<UnlockedBadgeResponse> getAllUnlockedBadges() throws WrongUserTypeException, EntityNotFoundException, MissingAttributeException {
        checkAllBadges();
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

    public void updateBadge(BadgeUpdateForm form) throws RequestValidationException, IOException {
        Long id = form.getId();
        Badge badge = badgeRepo.findBadgeById(id);
        badgeValidator.validateBadgeIsNotNull(badge, id);

        badge.update(form, badgeValidator);
        checkAllBadges();
        badgeRepo.save(badge);
    }

    public void addBadge(BadgeAddForm form) throws IOException, RequestValidationException {
        badgeValidator.validateBadgeForm(form);
        Badge badge = getBadgeFromForm(form);
        badgeRepo.save(badge);
    }

    private Badge getBadgeFromForm(BadgeAddForm form) throws RequestValidationException, IOException {
        BadgeType type = form.getType();
        String title = form.getTitle();
        String description = form.getDescription();
        Image image = new Image("badge", form.getImage().getBytes(), ImageType.BADGE);
        fileRepo.save(image);
        String value = form.getValue();
        Boolean forValue = form.getForValue();
        Badge badge = null;
        switch (type) {
            case ACTIVITY_NUMBER ->
                    badge = new ActivityNumberBadge(null, title, description, image, badgeValidator.validateAndGetIntegerValue(value));
            case ACTIVITY_SCORE ->
                    badge = new ActivityScoreBadge(null, title, description, image, badgeValidator.validateAndGetDoubleValue(value), forValue);
            case CONSISTENCY ->
                    badge = new ConsistencyBadge(null, title, description, image, badgeValidator.validateAndGetIntegerValue(value));
            case FILE_TASK_NUMBER ->
                    badge = new FileTaskNumberBadge(null, title, description, image, badgeValidator.validateAndGetIntegerValue(value));
            case GRAPH_TASK_NUMBER ->
                    badge = new GraphTaskNumberBadge(null, title, description, image, badgeValidator.validateAndGetIntegerValue(value));
            case TOP_SCORE ->
                    badge = new TopScoreBadge(null, title, description, image, badgeValidator.validateAndGetDoubleValue(value), forValue);
        }
        return badge;
    }
}
