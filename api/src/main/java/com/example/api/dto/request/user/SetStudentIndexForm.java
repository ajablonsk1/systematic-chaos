package com.example.api.dto.request.user;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SetStudentIndexForm {
    @Schema(required = true) private Integer newIndexNumber;
}
