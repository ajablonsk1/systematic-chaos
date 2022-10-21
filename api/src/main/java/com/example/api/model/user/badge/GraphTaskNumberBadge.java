package com.example.api.model.user.badge;

import com.example.api.dto.request.user.BadgeForm;
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

    public void update(BadgeForm form, BadgeValidator validator) throws IOException, RequestValidationException {
        super.update(form, validator);
        this.graphTaskNumber = validator.validateAndGetIntegerValue(form.getValue());
    }
}
