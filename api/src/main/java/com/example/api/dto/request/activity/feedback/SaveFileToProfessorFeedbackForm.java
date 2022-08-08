package com.example.api.dto.request.activity.feedback;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SaveFileToProfessorFeedbackForm {
    @Schema(required = true) private Long fileTaskId;
    @Schema(required = false) private String studentEmail;
    @Schema(required = false) private MultipartFile file;
    @Schema(required = false) private String fileName;
}
