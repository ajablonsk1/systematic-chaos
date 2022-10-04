package com.example.api.dto.request.user;

import com.example.api.model.user.HeroType;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AddRankForm {
    @Schema(required = true) private String name;
    @Schema(required = true) private Double minPoints;
    @Schema(required = true) private Double maxPoints;
    @Schema(required = true) private MultipartFile image;
    @Schema(required = true) private HeroType type;
}
