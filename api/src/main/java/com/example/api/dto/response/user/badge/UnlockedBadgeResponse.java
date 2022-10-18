package com.example.api.dto.response.user.badge;

import com.example.api.model.user.badge.UnlockedBadge;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UnlockedBadgeResponse {
    private BadgeResponse badge;
    private Long unlockedDateMillis;

    public UnlockedBadgeResponse(UnlockedBadge unlockedBadge) {
        this.badge = new BadgeResponse(unlockedBadge.getBadge());
        this.unlockedDateMillis = unlockedBadge.getUnlockedDateMillis();
    }
}
