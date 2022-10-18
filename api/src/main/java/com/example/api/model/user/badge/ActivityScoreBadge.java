package com.example.api.model.user.badge;

import com.example.api.model.util.Image;
import com.example.api.util.visitor.BadgeVisitor;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Entity;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class ActivityScoreBadge extends Badge{
    private Double activityScore;

    public ActivityScoreBadge(Long id, String title, String description, Image image, Double activityScore) {
        super(id, title, description, image);
        this.activityScore = activityScore;
    }

    @Override
    public boolean isGranted(BadgeVisitor visitor) {
        return visitor.visitActivityScoreBadge(this);
    }
}
