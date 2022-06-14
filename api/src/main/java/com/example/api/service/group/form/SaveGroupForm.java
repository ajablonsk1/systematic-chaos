package com.example.api.service.group.form;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import java.time.LocalDate;

@Data
public class SaveGroupForm {
    @Schema(required = true) private String name;
    @Schema(required = true) private LocalDate dateFrom;
    @Schema(required = false) private LocalDate dateTo;
    @Schema(required = true) private String invitationCode;
}
