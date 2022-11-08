package com.example.api.model.user.badge;

import com.example.api.dto.request.user.badge.BadgeUpdateForm;
import com.example.api.dto.response.user.badge.BadgeResponse;
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
public class ActivityScoreBadge extends Badge{
    private Double activityScore;
    private boolean forOneActivity;

    public ActivityScoreBadge(Long id,
                              String title,
                              String description,
                              Image image, Double activityScore,
                              boolean forOneActivity) {
        super(id, title, description, image);
        this.activityScore = activityScore;
        this.forOneActivity = forOneActivity;
    }

    @Override
    public boolean isGranted(BadgeVisitor visitor) {
        return visitor.visitActivityScoreBadge(this);
    }

    @Override
    public BadgeResponse<?> getResponse() {
        BadgeResponse<Double> response = new BadgeResponse<>(this);
        response.setValue(activityScore);
        return response;
    }

    public void update(BadgeUpdateForm form, BadgeValidator validator) throws IOException, RequestValidationException {
        super.update(form, validator);
        this.activityScore = validator.validateAndGetDoubleValue(form.getValue());
        Boolean forValue = form.getForValue();
        if(forValue != null) {
            this.forOneActivity = forValue;
        }
    }
}
