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
public class ConsistencyBadge extends Badge{
    private Integer weeksInRow;

    public ConsistencyBadge(Long id, String title, String description, Image image, Integer weeksInRow) {
        super(id, title, description, image);
        this.weeksInRow = weeksInRow;
    }

    @Override
    public boolean isGranted(BadgeVisitor visitor) {
        return visitor.visitConsistencyBadge(this);
    }
}
