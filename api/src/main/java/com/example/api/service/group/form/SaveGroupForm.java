package com.example.api.service.group.form;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class SaveGroupForm {
    @Schema(required = true) private String name;
    @Schema(required = true) private LocalDateTime dateFrom;
    @Schema(required = false) private LocalDateTime dateTo;
    @Schema(required = true) private String invitationCode;
}
