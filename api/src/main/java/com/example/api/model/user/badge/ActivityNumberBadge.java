package com.example.api.model.user.badge;

import com.example.api.dto.request.user.badge.BadgeUpdateForm;
import com.example.api.error.exception.RequestValidationException;
import com.example.api.model.util.Image;
import com.example.api.service.validator.BadgeValidator;
import com.example.api.util.visitor.BadgeVisitor;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Entity;
import java.io.IOException;

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

    public void update(BadgeUpdateForm form, BadgeValidator validator) throws IOException, RequestValidationException {
        super.update(form, validator);
        this.activityNumber = validator.validateAndGetIntegerValue(form.getValue());
    }
}
