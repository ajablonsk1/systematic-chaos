package com.example.api.dto.request.activity.feedback;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SaveProfessorFeedbackForm {
    @Schema(required = true) private String content;
    @Schema(required = true) private Double points;
    @Schema(required = true) private Long fileTaskResultId;
    @Schema(required = false) private MultipartFile file;
    @Schema(required = false) private String fileName;
}
