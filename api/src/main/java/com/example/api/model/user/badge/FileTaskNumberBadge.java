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
}
