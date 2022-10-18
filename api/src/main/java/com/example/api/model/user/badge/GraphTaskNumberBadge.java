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
public class GraphTaskNumberBadge extends Badge{
    private Integer graphTaskNumber;

    public GraphTaskNumberBadge(Long id, String title, String description, Image image, Integer graphTaskNumber) {
        super(id, title, description, image);
        this.graphTaskNumber = graphTaskNumber;
    }

    @Override
    public boolean isGranted(BadgeVisitor visitor) {
        return visitor.visitGraphTaskNumberBadge(this);
    }
}
