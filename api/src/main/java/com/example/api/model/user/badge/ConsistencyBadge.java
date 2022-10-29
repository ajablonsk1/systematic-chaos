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

    @Override
    public BadgeResponse<?> getResponse() {
        BadgeResponse<Integer> response = new BadgeResponse<>(this);
        response.setValue(weeksInRow);
        return response;
    }

    public void update(BadgeUpdateForm form, BadgeValidator validator) throws IOException, RequestValidationException {
        super.update(form, validator);
        this.weeksInRow = validator.validateAndGetIntegerValue(form.getValue());
    }
}
