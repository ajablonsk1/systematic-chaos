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
public class FileTaskNumberBadge extends Badge{
    private Integer fileTaskNumber;

    public FileTaskNumberBadge(Long id, String title, String description, Image image, Integer fileTaskNumber) {
        super(id, title, description, image);
        this.fileTaskNumber = fileTaskNumber;
    }

    @Override
    public boolean isGranted(BadgeVisitor visitor) {
        return visitor.visitFileTaskNumberBadge(this);
    }

    @Override
    public BadgeResponse<?> getResponse() {
        BadgeResponse<Integer> response = new BadgeResponse<>(this);
        response.setValue(fileTaskNumber);
        return response;
    }

    public void update(BadgeUpdateForm form, BadgeValidator validator) throws IOException, RequestValidationException {
        super.update(form, validator);
        this.fileTaskNumber = validator.validateAndGetIntegerValue(form.getValue());
    }
}
