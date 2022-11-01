package com.example.api.dto.request.user.badge;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class BadgeAddForm extends BadgeForm{
    @Schema(required = true) private BadgeType type;
}
