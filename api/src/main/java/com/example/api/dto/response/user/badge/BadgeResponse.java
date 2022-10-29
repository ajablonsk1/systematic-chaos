package com.example.api.dto.response.user.badge;

import com.example.api.dto.response.util.ByteFileResponse;
import com.example.api.model.user.badge.Badge;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class BadgeResponse<T> {
    private String title;
    private String description;
    private ByteFileResponse file;
    private T value;
    private Boolean forGroup;

    public BadgeResponse(Badge badge) {
        this.title = badge.getTitle();
        this.description = badge.getDescription();
        this.file = new ByteFileResponse(badge.getImage());
    }
}
