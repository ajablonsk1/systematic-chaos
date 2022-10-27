package com.example.api.model.user.badge;
import com.example.api.dto.request.user.badge.BadgeUpdateForm;
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

import javax.persistence.*;
import java.io.IOException;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public abstract class Badge {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private String description;

    @OneToOne(cascade = CascadeType.REMOVE)
    private Image image;

    @OneToMany(mappedBy = "badge", cascade = CascadeType.REMOVE)
    private List<UnlockedBadge> unlockedBadges;

    public Badge(Long id, String title, String description, Image image) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.image = image;
    }

    public abstract boolean isGranted(BadgeVisitor visitor)
            throws WrongUserTypeException, EntityNotFoundException, MissingAttributeException;

    public void update(BadgeUpdateForm form, BadgeValidator validator) throws IOException, RequestValidationException {
        validator.validateBadgeForm(form);
        this.title = form.getTitle();
        this.description = form.getDescription();
        this.image.setFile(form.getImage().getBytes());
    }
}
