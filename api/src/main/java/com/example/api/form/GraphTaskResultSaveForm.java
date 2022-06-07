package com.example.api.form;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

@Data
public class GraphTaskResultSaveForm {
    @Schema(required = true) private Long graphTaskId;
    @Schema(required = true) private String userEmail;
}
