package com.example.api.dto.request.activity.task;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SaveFileToFileTaskResultForm {
    @Schema(required = true) private Long fileTaskId;
    @Schema(required = false) private String openAnswer;
    @Schema(required = false) private MultipartFile file;
    @Schema(required = false) private String fileName;
}
