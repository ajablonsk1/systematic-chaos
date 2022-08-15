package com.example.api.dto.response.activity.feedback;

import com.example.api.dto.response.activity.task.util.FileResponse;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;

import java.util.List;

@Slf4j
@Data
@AllArgsConstructor
@NoArgsConstructor
@Setter
public class ProfessorFeedbackInfoResponse {
    private Long feedbackId;
    private Long fileTaskResultId;
    private String studentEmail;
    private Long fileTaskId;
    private String taskName;
    private String description;
    private List<FileResponse> taskFiles;
    private Double points;
    private String remarks;
    private List<FileResponse> feedbackFiles;
}

