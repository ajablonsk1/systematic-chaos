package com.example.api.dto.request.activity.task;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

@Data
public class SaveFileToFileTaskResultForm {
    @Schema(required = true) private Long fileTaskId;
    @Schema(required = true) private String studentEmail;
    @Schema(required = false) private String openAnswer;
    @Schema(required = false) private String fileString;
    @Schema(required = false) private String fileName;
}
