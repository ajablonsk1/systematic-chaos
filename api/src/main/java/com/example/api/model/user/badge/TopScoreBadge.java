package com.example.api.model.user.badge;

import com.example.api.error.exception.EntityNotFoundException;
import com.example.api.error.exception.MissingAttributeException;
import com.example.api.error.exception.WrongUserTypeException;
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
public class TopScoreBadge extends Badge{
    private Double topScore;
    private Boolean forGroup;

    public TopScoreBadge(Long id, String title, String description, Image image, Double topScore, Boolean forGroup) {
        super(id, title, description, image);
        this.topScore = topScore;
        this.forGroup = forGroup;
    }

    @Override
    public boolean isGranted(BadgeVisitor visitor) throws WrongUserTypeException, EntityNotFoundException, MissingAttributeException {
        return visitor.visitTopScoreBadge(this);
    }
}
