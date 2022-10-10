package com.example.api.model.user.badge;

import com.example.api.model.util.Image;
import com.example.api.util.visitor.BadgeVisitor;
import lombok.*;

import javax.persistence.Entity;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class ActivityNumberBadge extends Badge{
    private Integer activityNumber;

    public ActivityNumberBadge(Long id, String title, String description, Image image, Integer activityNumber) {
        super(id, title, description, image);
        this.activityNumber = activityNumber;
    }

    @Override
    public boolean isGranted(BadgeVisitor visitor) {
        return visitor.visitActivityNumberBadge(this);
    }
}
