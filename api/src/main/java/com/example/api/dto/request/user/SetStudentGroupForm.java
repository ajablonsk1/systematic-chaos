package com.example.api.dto.request.user;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

@Data
public class SetStudentGroupForm {
    @Schema(required = true) private Long studentId;
    @Schema(required = true) private Long newGroupId;
}
