package com.example.api.dto.request.activity.result;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

@Data
public class SaveGraphTaskResultForm {
    @Schema(required = true) private Long graphTaskId;
    @Schema(required = true) private String userEmail;
}
