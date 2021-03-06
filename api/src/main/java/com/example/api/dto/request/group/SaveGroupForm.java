package com.example.api.dto.request.group;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class SaveGroupForm {
    @Schema(required = true) private String name;
    @Schema(required = true) private String invitationCode;
}
