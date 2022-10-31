package com.example.api.dto.response.user.badge;

import com.example.api.model.user.badge.TopScoreBadge;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BadgeResponseTopScore extends BadgeResponse<Double>{
    private Boolean forGroup;

    public BadgeResponseTopScore(TopScoreBadge badge) {
        super(badge);
        this.forGroup = badge.getForGroup();
    }
}
