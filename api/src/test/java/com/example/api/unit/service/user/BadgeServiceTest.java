package com.example.api.unit.service.user;

import com.example.api.error.exception.EntityNotFoundException;
import com.example.api.error.exception.MissingAttributeException;
import com.example.api.error.exception.WrongUserTypeException;
import com.example.api.model.user.AccountType;
import com.example.api.model.user.User;
import com.example.api.model.user.badge.ActivityNumberBadge;
import com.example.api.model.user.badge.Badge;
import com.example.api.model.user.badge.TopScoreBadge;
import com.example.api.model.user.badge.UnlockedBadge;
import com.example.api.repo.user.BadgeRepo;
import com.example.api.repo.user.UnlockedBadgeRepo;
import com.example.api.service.user.BadgeService;
import com.example.api.service.user.UserService;
import com.example.api.util.visitor.BadgeVisitor;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.LinkedList;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.doReturn;
import static org.mockito.Mockito.when;

public class BadgeServiceTest {
    private BadgeService badgeService;
    @Mock private BadgeRepo badgeRepo;
    @Mock private UnlockedBadgeRepo unlockedBadgeRepo;
    @Mock private UserService userService;
    @Mock private BadgeVisitor badgeVisitor;

    private User user;
    List<Badge> badges = new LinkedList<>();
    TopScoreBadge topScoreBadge;
    ActivityNumberBadge activityNumberBadge;

    @BeforeEach
    public void init() {
        MockitoAnnotations.openMocks(this);
        badgeService = new BadgeService(
                badgeRepo,
                unlockedBadgeRepo,
                userService,
                badgeVisitor
        );

        user = new User();
        user.setId(1L);
        user.setEmail("user@gmail.com");
        user.setPassword("password");
        user.setAccountType(AccountType.STUDENT);
        user.setPoints(10d);

        topScoreBadge = new TopScoreBadge();
        activityNumberBadge = new ActivityNumberBadge();
        badges.add(topScoreBadge);
        badges.add(activityNumberBadge);
    }

    @Test
    public void checkAllBadgesWhenNoUnlockedBadges() throws WrongUserTypeException, EntityNotFoundException, MissingAttributeException {
        //given
        when(userService.getCurrentUser()).thenReturn(user);
        when(badgeVisitor.visitTopScoreBadge(topScoreBadge)).thenReturn(true);
        when(badgeVisitor.visitActivityNumberBadge(activityNumberBadge)).thenReturn(false);
        when(userService.getCurrentUser()).thenReturn(user);
        doReturn(badges).when(badgeRepo).findAll();

        //when
        badgeService.checkAllBadges();

        //then
        List<UnlockedBadge> unlockedBadges = user.getUnlockedBadges();
        List<Badge> badgesInUnlockedBadges = unlockedBadges.stream()
                .map(UnlockedBadge::getBadge)
                .toList();
        assertThat(unlockedBadges).hasSize(1);
        assertThat(badgesInUnlockedBadges).contains(topScoreBadge);
    }

    @Test
    public void checkAllBadgesWhenHasUnlockedBadges() throws WrongUserTypeException, EntityNotFoundException, MissingAttributeException {
        //given
        UnlockedBadge unlockedBadge = new UnlockedBadge();
        unlockedBadge.setBadge(topScoreBadge);
        user.getUnlockedBadges().add(unlockedBadge);
        when(userService.getCurrentUser()).thenReturn(user);
        when(badgeVisitor.visitTopScoreBadge(topScoreBadge)).thenReturn(true);
        when(badgeVisitor.visitActivityNumberBadge(activityNumberBadge)).thenReturn(true);
        when(userService.getCurrentUser()).thenReturn(user);
        doReturn(badges).when(badgeRepo).findAll();

        //when
        badgeService.checkAllBadges();

        //then
        List<UnlockedBadge> unlockedBadges = user.getUnlockedBadges();
        List<Badge> badgesInUnlockedBadges = unlockedBadges.stream()
                .map(UnlockedBadge::getBadge)
                .toList();
        assertThat(unlockedBadges).hasSize(2);
        assertThat(badgesInUnlockedBadges).contains(activityNumberBadge, topScoreBadge);
    }
}
