package com.example.api.model.user.badge;

import com.example.api.dto.request.user.badge.BadgeUpdateForm;
import com.example.api.dto.response.user.badge.BadgeResponse;
import com.example.api.dto.response.user.badge.BadgeResponseTopScore;
import com.example.api.error.exception.EntityNotFoundException;
import com.example.api.error.exception.MissingAttributeException;
import com.example.api.error.exception.RequestValidationException;
import com.example.api.error.exception.WrongUserTypeException;
import com.example.api.model.util.Image;
import com.example.api.service.validator.BadgeValidator;
import com.example.api.util.visitor.BadgeVisitor;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Entity;
import java.io.IOException;
import java.util.Objects;

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

    @Override
    public BadgeResponse<?> getResponse() {
        BadgeResponse<Double> response = new BadgeResponseTopScore(this);
        response.setValue(topScore);
        return response;
    }

    public void update(BadgeUpdateForm form, BadgeValidator validator) throws IOException, RequestValidationException {
        super.update(form, validator);
        this.topScore = validator.validateAndGetDoubleValue(form.getValue());

        Boolean forGroup = form.getForValue();
        this.forGroup = Objects.requireNonNullElse(forGroup, false);
    }
}
