package com.example.api.dto.request.user.badge;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BadgeForm {
    @Schema(required = true) private String title;
    @Schema(required = true) private String description;
    @Schema(required = false) private MultipartFile image;
    @Schema(required = true) private String value;
    @Schema(required = false) private Boolean forGroup;
}
